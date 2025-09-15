import { NextFunction, Request, Response } from "express"
import { CatchError, TryError } from "../utils/error"
import AuthModel from "../model/auth.model"
import moment from "moment"
import { SessionInterface } from "./auth.middleware"

const RefreshToken = async (req: SessionInterface, res: Response, next: NextFunction) => {
    try {

        const refreshToken = await req.cookies.refreshToken

        if(!refreshToken)
            throw TryError("failed to refresh token", 401)

        const user = await AuthModel.findOne({refreshToken})

        if(!user)
            throw TryError("failed to refresh token user", 400)

        const today = moment()
        const expiry = moment(user.expiry)

        const isExpired = today.isAfter(expiry)

        if(isExpired)
            throw TryError("failed to refresh token", 401)

        req.session = {
            id: user.id,
            email: user.email,
            mobile: user.mobile,
            fullname: user.fullname,
            image: user.image
        }
        
        next()
    
    } catch (err) {
        CatchError(err, res, "Failed to refresh token")
    }
}

export default RefreshToken