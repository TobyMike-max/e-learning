import express from 'express'
import { add, show, count, update, deleteLesson, content } from '../controller/lesson.js'

const router = express.Router()

router.post("/add", add)
router.put("/update", update)
router.get("/show", show)
router.get("/count", count)
router.get("/:lessonId", content)
router.delete("/delete", deleteLesson)

export default router;
