import { db } from '../connect.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const add = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("Not logged in");

	jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const q = "INSERT INTO lessons (`lesson_name`, `course_id`, `content`, `lesson_duration`) VALUES (?)"

		const values = [
			req.body.lesson_name,
			req.body.course_id,
			req.body.content,
			req.body.lesson_duration
		]

		db.query(q, [values], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json("Lesson successfully created")
		})
	})
}


export const update = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("Not logged in");

	jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const q = "UPDATE lessons SET lesson_name=?, content=?, lesson_duration=? WHERE lesson_id=?"

		db.query(q, [req.body.lesson_name, req.body.content, req.body.lesson_duration, req.body.id], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json("Lesson successfully updated")
		})
	})
}


export const show = (req, res) => {
	const q = "SELECT l.*, c.course_name, c.instructor_id FROM lessons AS l JOIN courses AS c ON (l.course_id = c.course_id) WHERE l.course_id = ? ORDER BY l.created DESC"

	db.query(q, [req.query.c_id], (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

export const count = (req, res) => {
	const q = "SELECT COUNT(*) FROM lessons WHERE course_id = ?"

	db.query(q, [req.query.c_id], (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

export const deleteLesson = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("Not logged in");

	jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const q = "DELETE FROM lessons WHERE lesson_id = ?"

		db.query(q, [req.query.l_id], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json("Successfully deleted lesson")
		})
	})
}
