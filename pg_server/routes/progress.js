    import express from 'express'
    import { add, show_percent, update, show, courses_progress } from '../controller/progress.js'

    const router = express.Router()

    //router.get()
    router.get("/add", add)
    router.get("/show_percent", show_percent)
    router.put("/update", update)
    router.get("/show", show)
    router.get("/courses_prog/:id", courses_progress)

    export default router;
