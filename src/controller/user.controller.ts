import { Request, Response } from "express"
import AuthModel from "../model/auth.model"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CatchError, TryError } from "../utils/error"
import { PayloadInterface, SessionInterface } from "../middleware/auth.middleware"
import mongoose from "mongoose"
import { downloadObject } from "../utils/s3"

const accessTokenExpiry = '10m'

// Here we will import PayloadInterface from auth.middleware

const generateToken = (payload: PayloadInterface) => {
    const accessToken = jwt.sign(payload, process.env.AUTH_SECRET!, {expiresIn: accessTokenExpiry})
    return accessToken
}

export const signup = async (req: Request, res: Response) => {
    try {
        await AuthModel.create(req.body)
        res.status(200).json({message: 'Signup success'})
        
    } catch (err: unknown) {
        if(err instanceof Error)
            res.status(500).json({message: err.message})
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await AuthModel.findOne({email})

        if(!user)
            throw TryError("User not found, please signup!", 401)
        
        const isLogin = await bcrypt.compare(password, user.password)
        
        if(!isLogin)
            throw TryError("Invalid credentials email or password is incorrect", 404)

        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
            image: user.image ? await downloadObject(user.image) : null
        }
        const options = {
            httpOnly: true,
            maxAge: (10*60)*1000,
            secure: false,
            domain: 'localhost'
        }
        const accessToken = generateToken(payload)
        res.cookie('accessToken', accessToken, options)
        res.json({message: 'Login Successfully'})
        
    } catch (err: unknown) {
        CatchError(err, res)
    }
}

export const getSession = async (req: Request, res: Response) => {
    try {
        const accessToken = req.cookies.accessToken
        if(!accessToken)
            throw TryError('Invalid session, please try again', 401)

        const session = await jwt.verify(accessToken, process.env.AUTH_SECRET!)
        res.json(session)
        
    } catch (err: unknown) {
        CatchError(err, res, "Invalid Session")
    } 
}

export const updateProfilePicture = async (req: SessionInterface, res: Response) => {
    try {
        const path = req.body.path
    
        if(!path || !req.session)
            throw TryError("Failed to update profile picture", 400)

        await AuthModel.updateOne({ _id: req.session.id}, {$set: {image: path}})
        const url = await downloadObject(path)
        res.json({image: url})
        
    } catch (err) {
        CatchError(err, res, "Failed to update profile picture")
    }
}

export const forgotPassword = (req: Request, res: Response) => {
    res.send('hello from forgot password')
}