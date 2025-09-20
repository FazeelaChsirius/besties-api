import mongoose, { model, Schema } from "mongoose";

const friendSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth'
    },
    friend: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth'
    },
    status: {
        type: String,
        enum: ['requested', 'rejected', 'accepted'],
        default: 'requested'
    },
    type: {
        type: String,
        enum: ['sent', 'received'],
        default: 'sent'
    }

}, {timestamps: true})

const FriendModel = model('Friend', friendSchema)
export default FriendModel