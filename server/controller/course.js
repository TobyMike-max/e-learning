import { db } from '../connect.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const add = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("Not logged in");

	jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const q = "INSERT INTO courses (`course_name`, `course_desc`, `instructor_id`, `start_date`, `end_date`, `category`) VALUES (?)"
		const values = [
			req.body.course_name,
			req.body.course_desc,
			userInfo.id,
			req.body.start_date,
			req.body.end_date,
			req.body.category
		]

		db.query(q, [values], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json("Course successfully created")
		})
	})
}

export const show = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("Not logged in");

	jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");
		
		const q = "SELECT c.*, u.user_id, u.username, u.full_name FROM courses AS c JOIN users AS u ON (c.instructor_id = u.user_id) ORDER BY c.created DESC"

		db.query(q, (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json(data)
		})
	})
}

export const deleteCourse = (req, res) => {
	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json("Not logged in");

	jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
		if (err) return res.status(403).json("Token is not valid!");

		const q = "DELETE FROM courses WHERE course_id = ?"

		db.query(q, [req.query.c_id], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json("Successfully deleted course")
		})
	})
}

export const getUserId = (req, res) => {
	const q = "SELECT instructor_id FROM courses WHERE course_id = ?"

	db.query(q, [req.query.c_id], (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
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
