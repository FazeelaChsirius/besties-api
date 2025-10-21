import ChatModel from "../model/chat.model"
import { Request, Response } from "express"
import { CatchError, TryError } from "../utils/error"
import { SessionInterface } from "../middleware/auth.middleware"

interface PayloadInterface {
    from: string
    to: string
    message: string
    file?: {
        path: string
        type: string
    }
}

export const createChat = (payload: PayloadInterface) => {
    ChatModel.create(payload)
    .catch((err) => {
        console.log(err.message)
    })
}

export const fetchChats = async (req: SessionInterface, res: Response) => {
    try {
        if(!req.session)
            throw TryError("Failed to fetch chats")

        const chats = await ChatModel.find({
            $or: [
                {from: req.session.id, to: req.params.to}, 
                {from: req.params.to, to: req.session.id}
            ]
        })
        .populate("from", "fullname email mobile")
        res.json(chats)
        
    } catch (err) {
        CatchError(err, res, "Failed to fetch chats")
    }
}