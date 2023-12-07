import express from 'express'
import { login, register, logout, forgot_pass, reset_pass } from '../controller/auth.js'

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.get("/logout", logout)
router.post("/forgot_password", forgot_pass)
router.post("/reset_password", reset_pass)

export default router;
