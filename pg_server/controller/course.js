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

			const q = "INSERT INTO courses (course_name, course_desc, instructor_id, start_date, end_date, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ";

			const newCourse = await pool.query(q, [req.body.course_name, req.body.course_desc, userInfo.id, req.body.start_date, req.body.end_date, req.body.category])
			return res.status(200).json("Course successfully created")
		})
	} catch (err) {
		if (err) return res.status(500).json(err)
	}
}

export const show = (req, res) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in");

		jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
			if (err) return res.status(403).json("Token is not valid!");

			const q = "SELECT c.*, u.user_id, u.username, u.full_name FROM courses AS c JOIN users AS u ON (c.instructor_id = u.user_id) ORDER BY c.created DESC"

			const showCourses = await pool.query(q)
			return res.status(200).json(showCourses.rows)
		})
	} catch (err) {
		if (err) return res.status(500).json(err)
	}
}

export const deleteCourse = (req, res) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) return res.status(401).json("Not logged in");

		jwt.verify(token, process.env.SECRET_KEY, async (err, userInfo) => {
			if (err) return res.status(403).json("Token is not valid!");

			const q = "DELETE FROM courses WHERE course_id = $1"

			const delCourse = await pool.query(q, [req.query.c_id])
			return res.status(200).json("Successfully deleted course")
		})
	} catch(err) {
		if (err) return res.status(500).json(err)
	}
}

export const getUserId = async (req, res) => {
	try {
		const q = "SELECT instructor_id FROM courses WHERE course_id = $1"

		const userId = await pool.query(q, [req.query.c_id])
		return res.status(200).json(userId.rows)
	}catch (err) {
		if (err) return res.status(500).json(err)
	}
}

//How to delete a row from a table that is referenced in another table -Done
//Lesson table is referencing Courses table -Done
//Fetch courses in batches and not all courses at once using an arrow down icon
//Add createdAt moment date to courses and lessons to Order search by -Done
//Categorize all courses into separate categories to aid easier searching -Done
//Create a search bar to be able to search for courses like a global search query
//Fetch lessons 'content' also in batches with a next button, include a start, continue/next, finish button store users progress in database -50% Done
//Add a delete button for lessons -Done
//Transfer the delete confirmation in lessons to courses -Done
//Add and Handle update time for lessons table
//Dashboard backend integration
//Forgot password and reset link timeline - Done
//Create user page -Done
//Calender page implementation and backend integration/Handle onclick event to redirect to courses page -100% Done
//Animation in dashboard
