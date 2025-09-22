import { Request, Response } from "express"
import { CatchError, TryError } from "../utils/error"
import { downloadObject, isFileExist, uploadObject } from "../utils/s3"

export const downloadFile = async (req: Request, res: Response) => {
    try {
        const path = req.body?.path
        if(!path)
            throw TryError('Failed to generate download url because path is missing', 400)

        const isExist = await isFileExist(path)

        if(!isExist)
            throw TryError('File does not  exist', 404) 

        const url = await downloadObject(path)
        res.json({url})
       
    } catch (err) {
        CatchError(err, res, "Failed to generate download url")
    }
}

export const uploadFile = async (req: Request, res: Response) => {
    try {
        const path = req.body?.path
        const type = req.body?.type
        const status = req.body.status

        if(!path || !type || !status) 
            throw TryError("Invalid request path or type is required", 400)

        const url = await uploadObject(path, type, status)
        res.json({url})
        
    } catch (err) {
        CatchError(err, res, "Failed to generate upload url")
    }
}