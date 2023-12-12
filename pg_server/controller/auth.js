import { pool } from '../connect.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

//pass: 'assnqxmdmbureqil'

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASS,
	},
})

const maxAge = 60 * 60 * 24 * 3;

//Create JSON WEB TOKEN with header, payload, signature
const createToken = (u_id) => {
	return jwt.sign({ id: u_id }, process.env.SECRET_KEY, {
		expiresIn: maxAge
	})
}

export const register = async (req, res) => {
	try {
		//Check if username already exists
		const q = "SELECT * FROM users WHERE username = $1 AND email = $2"

		const userData = await pool.query(q, [req.body.username, req.body.email])
		if (userData.rows.length) return res.status(409).json("Username or Email already exists!")

		//Create a new user
		////Hash password
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(req.body.password, salt);

		const q1 = "INSERT INTO users (username, email, password_hash, full_name, average_rating, updated) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"

		const insertUser = await pool.query(q1, [req.body.username, req.body.email, hashedPassword, req.body.full_name, req.body.average_rating, req.body.updated])

		//After user has been created get the user_id
		const q2 = "SELECT user_id FROM users WHERE username = $1"
		const getId = await pool.query(q2, [req.body.username])

		//Generate a unique jsonwebtoken
		const token  = createToken(getId.rows[0].user_id)

		return res.cookie('accessToken', token, {
			maxAge: maxAge * 1000,
			httpOnly: true,
			sameSite: "none", secure: "true",
		}).status(200).json({text: "User has been created", name: insertUser });

	} catch(err) {
		if (err) return res.status(500).json(err);
	}	
}

export const login = async (req, res) => {
	try {
		const q = "SELECT * FROM users WHERE username = $1"

		const userData = await pool.query(q, [req.body.username])

		// If no user with typed in username exists
		if (userData.rows.length === 0) return res.status(404).json("User not found!");

		// Hash password from login page and compare with hashedPassword in database
		const checkPassword = bcrypt.compareSync(req.body.password, userData.rows[0].password_hash)

		if(!checkPassword) return res.status(400).json("Wrong password or username!")

		// Generate a jsonwebtoken
		const token  = createToken(userData.rows[0].user_id)

		const { password_hash, ...others } = userData.rows[0];

		res.cookie("accessToken", token, {
			maxAge: maxAge * 1000,
			httpOnly: true,
			sameSite: "none", secure: "true",
		}).status(200).json(others);
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}

export const logout = (req, res) => {
	res.clearCookie("accessToken", {
		sameSite: "none", secure: "true",
	}).status(200).json("User has been logged out")
		
}

export const forgot_pass = async (req, res) => {
	try {
		//CHECK USER IF EXIST
		const q = "SELECT email FROM users WHERE email = $1"

		const userEmail = await pool.query(q, [req.body.email])
		if (userEmail.rows.length === 0) return res.status(404).json("User not found!");

		if (req.body.email === userEmail.rows[0].email) {
			const resetToken = jwt.sign({ email: userEmail.rows[0].email }, process.env.SECRET_KEY, {expiresIn: 60 * 30 })
			const mailOptions = {
				from: process.env.NODEMAILER_USER,
				to: req.body.email,
				subject: 'Password Reset',
				text: `Hello,\nYou have requested to reset your password. To reset your password, please click the link below:\n[Reset Password](https://academyis.netlify.app/reset-password?token=${resetToken})\nIf you did not request a password reset, please ignore this email. This link expires in the next 30minutes.\nSincerely\nAcademyis Team`,
			};

			transporter.sendMail(mailOptions, (err, info) => {
				if(err) console.log('Error sending email: ', err)
				console.log('Email sent: ', info.response)
			})

			res.status(200).json({message: 'Password reset email sent.'})
		}
	} catch(err) {
	if (err) return res.status(500).json(err);
	}
}

export const reset_pass = (req, res) => {
	try {
		const resetToken = req.query.token;
		if (!token) return res.status(401).json("Missing Token");

		jwt.verify(resetToken, process.env.SECRET_KEY, async (err, userInfo) => {
			if (err) return res.status(403).json("Token is not valid Or is Expired!")

			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(req.body.password, salt);

			const q = "UPDATE users SET password_hash = $1 WHERE email = $2"

			const pass = await pool.query(q, [hashedPassword, userInfo.email])
			return res.status(200).json("Successfully Reset Password")
		})
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}
