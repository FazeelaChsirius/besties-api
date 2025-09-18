import { Router } from "express";
import { getSession, login, refreshToken, signup, updateProfilePicture } from "../controller/user.controller";
import AuthMiddleware from "../middleware/auth.middleware";
import RefreshToken from "../middleware/refresh.middleware";
const AuthRouter = Router()

AuthRouter.post('/signup', signup)
AuthRouter.post('/login', login)
AuthRouter.get('/refresh-token', RefreshToken, refreshToken)
AuthRouter.put('/profile-picture', AuthMiddleware, updateProfilePicture)
AuthRouter.get('/session', getSession)

export default AuthRouter
