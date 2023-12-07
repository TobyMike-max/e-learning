import { pool } from '../connect.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const add = (req, res) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in");

		jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
			if (err) return res.status(403).json("Token is not valid!");

			const q = "INSERT INTO lessons (lesson_name, course_id, content, lesson_duration) VALUES ($1, $2, $3, $4)"
			const addLesson = await pool.query(q, [req.body.lesson_name, req.body.course_id, req.body.content, req.body.lesson_duration])
			return res.status(200).json("Lesson successfully created")
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
			const q = "UPDATE lessons SET lesson_name=$1, content=$2, lesson_duration=$3 WHERE lesson_id=$4"

			const lesUpdate = await pool.query(q, [req.body.lesson_name, req.body.content, req.body.lesson_duration, req.body.id])
			return res.status(200).json("Lesson successfully updated")
		})
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}


export const show = async (req, res) => {
	try {
		const q = "SELECT l.*, c.course_name, c.instructor_id FROM lessons AS l JOIN courses AS c ON (l.course_id = c.course_id) WHERE l.course_id = $1 ORDER BY l.created DESC"

		const showLesson = await pool.query(q, [req.query.c_id])
		return res.status(200).json(showLesson.rows)
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}

export const count = async (req, res) => {
	try {
		const q = "SELECT COUNT(*) FROM lessons WHERE course_id = $1"

		const lesCount = await pool.query(q, [req.query.c_id])
		return res.status(200).json(lesCount.rows[0])
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}

export const deleteLesson = (req, res) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in");

		jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
			if (err) return res.status(403).json("Token is not valid!");

			const q = "DELETE FROM lessons WHERE lesson_id = $1"

			const delLesson = await pool.query(q, [req.query.l_id])
			return res.status(200).json("Successfully deleted lesson")
		})
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}

export const content = (req, res) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in");

		jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
			if (err) return res.status(403).json("Token is not valid!");

			const q = "SELECT lesson_name, content, course_id FROM lessons WHERE lesson_id = $1"
			const content = await pool.query(q, [req.params.lessonId])
			return res.status(200).json(content.rows)
		})
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}
