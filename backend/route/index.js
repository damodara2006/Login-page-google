import { Router } from "express";
import {login, cookie} from "../controllers/login.js";
import findcookie from "../controllers/cookie.js";
const router = Router()

router.route("/login").post(login)
router.route("/cookie").get(cookie)
router.route("/findcookie").get(findcookie)



export default router