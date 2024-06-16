import express from "express";
import { login, register, logout, Signin, Signup, Signout } from "../controllers/auth.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/signin", Signin)
router.post("/signup", Signup)
router.post("/signout", Signout)


export default router