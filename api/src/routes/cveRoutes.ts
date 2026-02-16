import { Router } from "express"
import { getCVE, getCVEById } from "../controllers/cveController"

const router = Router()

router.route("/:page").get(getCVE)
router.route("/cveById/:cveId").get(getCVEById)

export default router
