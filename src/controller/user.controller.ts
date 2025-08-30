import { Request, Response } from "express"
import AuthModel from "../model/auth.model"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CatchError, TryError } from "../utils/error"

const accessTokenExpiry = '10m'

interface PayloadInterface {
    fullname: string
    email: string
    mobile: string
}


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
            mobile: user.mobile
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

export const forgotPassword = (req: Request, res: Response) => {
    res.send('hello from forgot password')
}