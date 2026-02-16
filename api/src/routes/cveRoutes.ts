import { Router } from "express"
import { getCVE } from "../controllers/cveController"

const router = Router()

router.route("/:page").get(getCVE)

export default router
