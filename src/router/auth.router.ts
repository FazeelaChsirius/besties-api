import { Router } from "express";
import { forgotPassword, login, signup } from "../controller/user.controller";
const AuthRouter = Router()

AuthRouter.post('/signup', signup)
AuthRouter.post('/login', login)
AuthRouter.post('/forgot-Password', forgotPassword)

export default AuthRouter
