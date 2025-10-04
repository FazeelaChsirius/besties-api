import { Router } from "express";
import { addFriend, deleteFriend, fetchFriends, friendRequest, suggestedFriends, updateFriendStatus } from "../controller/friend.controller";

const FriendRouter = Router()

FriendRouter.post('/', addFriend)
FriendRouter.get('/', fetchFriends)
FriendRouter.get('/suggestion', suggestedFriends)
FriendRouter.get('/request', friendRequest)
FriendRouter.delete('/:id', deleteFriend)
FriendRouter.put('/:id', updateFriendStatus)

export default FriendRouter