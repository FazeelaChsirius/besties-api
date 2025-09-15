import { Schema, model } from "mongoose"
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'
import moment from "moment"

const authSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    image: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String
    },
    expiry: {
        type: Date
    }

}, {timestamps: true})

authSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password.toString(), 12)
    next()
})

authSchema.pre('save', function(next) {
    this.refreshToken = uuid()
    this.expiry = moment().add(7, "days").toDate()
    next()
})

const AuthModel = model('Auth', authSchema)
export default AuthModel