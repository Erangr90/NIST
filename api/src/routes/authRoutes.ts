import express from "express"
import { register, login, logout, refresh } from "../controllers/authController"

const router = express.Router()

router.route("/").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/refresh").post(refresh)

export default router
