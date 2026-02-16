import { Router } from "express"
import { getNistData } from "../controllers/nistController"

const router = Router()

router.route("/").get(getNistData)

export default router
