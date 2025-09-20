import { Router } from "express";
import { addFriend, fetchFriends, suggestedFriends } from "../controller/friend.controller";

const FriendRouter = Router()

FriendRouter.post('/', addFriend)
FriendRouter.get('/', fetchFriends)
FriendRouter.get('/suggestion', suggestedFriends)

export default FriendRouter