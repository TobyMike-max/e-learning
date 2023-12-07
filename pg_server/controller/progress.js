import { pool } from '../connect.js'
import jwt from 'jsonwebtoken'


export const add = (req, res) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in");

		jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
			if (err) return res.status(403).json("Token is not valid!");

			const q = "INSERT INTO progress (user_id, lesson_id, currentpage, percent_complete, totalpages) VALUES ($1, $2, $3, $4, $5)"

			const add_prog = await pool.query(q, [req.query.uId, req.query.lId, req.query.curPag, req.query.perCom, req.query.totPag])
			return res.status(200).json("Started lesson successfully")
		})
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}

export const show_percent = (req, res) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in");

		jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
			if (err) return res.status(403).json("Token is not valid!");

			const q = "SELECT ROUND(percent_complete) AS r_percent_complete FROM progress WHERE user_id = $1 AND lesson_id = $2"

			const show_prog = await pool.query(q, [req.query.uId, req.query.lId])
			return res.status(200).json(show_prog.rows)
		})
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}

export const update = (req, res) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in");

		jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
			if (err) return res.status(403).json("Token is not valid!");

			const comp = (req.body.percent === 100.0) ? true : false;
			const q = "UPDATE progress SET currentpage=$1, percent_complete=$2, completed=$3 WHERE lesson_id = $4"
			const upd_prog = await pool.query(q, [req.body.curPag, req.body.percent, comp, req.body.l_id])

			return res.status(200).json("Update Successful")
		})
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}


export const show = (req, res) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in");

		jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
			if (err) return res.status(403).json("Token is not valid!");

			const q = "SELECT p.* FROM progress AS p WHERE user_id = $1"
			const show_prog = await pool.query(q, [req.query.uId])
			return res.status(200).json(show_prog.rows)
		})
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}


export const courses_progress = (req, res) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in");

		jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
			if (err) return res.status(403).json("Token is not valid!");

			const q = "SELECT c.course_id, c.course_name, COUNT(DISTINCT l.lesson_id) AS total_lessons, COALESCE(SUM(p.percent_complete) / COUNT(DISTINCT l.lesson_id), 0) AS overall_progress FROM courses AS c LEFT JOIN lessons AS l ON c.course_id = l.course_id LEFT JOIN progress AS p ON l.lesson_id = p.lesson_id AND p.user_id = $1 GROUP BY c.course_id, c.course_name;"
			const courses_prog = await pool.query(q, [req.params.id])
			return res.status(200).json(courses_prog.rows)
		})
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}
