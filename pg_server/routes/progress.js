    import express from 'express'
    import { add } from '../controller/progress.js'

    const router = express.Router()

    //router.get()
    router.get("/add", add)

    export default router;
