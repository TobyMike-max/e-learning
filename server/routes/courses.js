import express from 'express'
import { add, show, deleteCourse, getUserId } from '../controller/course.js'

const router = express.Router()

router.post("/add", add);
router.get("/show", show);
router.delete("/delete", deleteCourse);
router.get("/course", getUserId);
   

export default router;
