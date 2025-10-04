import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
mongoose.connect(process.env.DB!)

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRouter from './router/auth.router'
import StorageRouter from './router/storage.router'
import AuthMiddleware from './middleware/auth.middleware'
import FriendRouter from './router/friend.router'
import SwaggerConfig from './utils/swagger'
import { serve, setup } from 'swagger-ui-express'
const app = express()
app.listen(
    process.env.PORT || 8080, 
    () => console.log(`Server is running on ${process.env.PORT}`)
)

app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api-docs', serve, setup(SwaggerConfig))
app.use('/auth', AuthRouter)
app.use('/storage', AuthMiddleware, StorageRouter)
app.use('/friend', AuthMiddleware, FriendRouter)
