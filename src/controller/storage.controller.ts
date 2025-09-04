import { GetObjectCommand, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { Request, Response } from "express"
import { CatchError, TryError } from "../utils/error"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const connection = new S3Client({
    region: process.env.REGION,
    endpoint: `https://s3-${process.env.REGION}.amazonaws.com`,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

const isFileExist = async (path: string) => {
    try {
        const command = new HeadObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: path
        })
        await connection.send(command) 
        return true
        
    } catch (err) {
        return false
    }
}

export const downloadFile = async (req: Request, res: Response) => {
    try {
        const path = req.body?.path
        if(!path)
            throw TryError('Failed to generate download url because path is missing', 400)

        const isExist = await isFileExist(path)

        if(!isExist)
            throw TryError('File does not  exist', 404) 

        const option = {
            Bucket: process.env.S3_BUCKET,
            Key: path
        }

        const command = new GetObjectCommand(option)

        const url = await getSignedUrl(connection, command, {expiresIn: 60})
        res.json({url}) 

    } catch (err) {
        CatchError(err, res, "Failed to generate download url")
        
    }
}