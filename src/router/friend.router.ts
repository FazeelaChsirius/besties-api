import { Router } from "express";
import { addFriend, deleteFriend, fetchFriends, suggestedFriends } from "../controller/friend.controller";

const FriendRouter = Router()

FriendRouter.post('/', addFriend)
FriendRouter.get('/', fetchFriends)
FriendRouter.get('/suggestion', suggestedFriends)
FriendRouter.delete('/:id', deleteFriend)

export default FriendRouter