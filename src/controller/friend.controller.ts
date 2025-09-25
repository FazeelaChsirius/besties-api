import { Response } from "express"
import { CatchError, TryError } from "../utils/error"
import FriendModel from "../model/friend.model"
import { SessionInterface } from "../middleware/auth.middleware"
import AuthModel from "../model/auth.model"
import mongoose from "mongoose"

export const addFriend = async (req: SessionInterface, res: Response) => {
    try {
        req.body.user = req.session?.id 
        const friend = await FriendModel.create(req.body)
        res.json(friend)
        
    } catch (err) {
        CatchError(err, res, "Failed to send friend request")
    }
}

export const fetchFriends = async (req: SessionInterface, res: Response) => {
    try {
        const user = req.session?.id
        const friends = await FriendModel.find({user})
        res.json(friends)
        
    } catch (err) { 
        CatchError(err, res, "Failed to fetch friends")
    }
}

export const suggestedFriends = async (req: SessionInterface, res: Response) => {
    try {
        if(!req.session)
            throw TryError("Fail to suggest friend", 401)
            
        const friends = await AuthModel.aggregate([
            {
                $match: {
                    _id: {$ne: new mongoose.Types.ObjectId(req.session.id)}
                }
            },
            {$sample: {size: 5}},
            {$project: {fullname: 1, image: 1, createdAt: 1}}
        ])

        const modified = await Promise.all(
            friends.map(async (item) => {
                const count = await FriendModel.countDocuments({friend: item._id})
                return count === 0 ? item : null
            })
        )
        const filtered = modified.filter((item) => item !== null)
        res.json(filtered)
       
    } catch (err) { 
        CatchError(err, res, "Failed to fetch friends")
    }
}