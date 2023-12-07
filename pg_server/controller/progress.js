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
