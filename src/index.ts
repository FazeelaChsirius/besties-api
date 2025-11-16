import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
mongoose.connect(process.env.DB!)

import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRouter from './router/auth.router'
import StorageRouter from './router/storage.router'
import AuthMiddleware from './middleware/auth.middleware'
import FriendRouter from './router/friend.router'
import SwaggerConfig from './utils/swagger'
import { serve, setup } from 'swagger-ui-express'
import StatusSocket from './socket/status.socket'
import corsConfig from './utils/cors'
import ChatSocket from './socket/chat.socket'
import ChatRouter from './router/chat.router'
import VideoSocket from './socket/video.socket'
import PaymentRouter from './router/payment.router'
import PostRouter from './router/post.router'
import TwilioRouter from './router/twilio.router'

const app = express()
const server = createServer(app)
server.listen(
  process.env.PORT || 8080, 
  () => console.log(`Server is running on ${process.env.PORT}`)
)

// Socket connection
const io = new Server(server, {cors: corsConfig})
StatusSocket(io)
ChatSocket(io)
VideoSocket(io)
 
// Middleware
app.use(cors(corsConfig))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Endpoint
app.use('/api-docs', serve, setup(SwaggerConfig))
app.use('/auth', AuthRouter)
app.use('/storage', AuthMiddleware, StorageRouter)
app.use('/friend', AuthMiddleware, FriendRouter)
app.use('/chat', ChatRouter)
app.use("/payment", PaymentRouter)
app.use("/post", AuthMiddleware, PostRouter)
app.use("/twilio", TwilioRouter)
