import { Request, Response } from "express"
import { CatchError, TryError } from "../utils/error"
// import Razorpay from "razorpay"
// import crypto from "crypto"
// import fs from "fs"

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID!,
//     key_secret: process.env.RAZORPAY_KEY_SECRET!
// })

export const createOrder = async (req: Request, res: Response) => {
    try {
        console.log("payments")

        // const amount = req.body?.amount
        // if(!amount)
        //     throw TryError("Amount is required", 400)

        // const payload = {
        //     amount: (amount*100),
        //     currency: process.env.CURRENCY!,
        //     receipt: `ORD_${Date.now()}`
        // }
        // const order = await razorpay.orders.create(payload)
        // res.json(order)
        
    } catch (err) {
        CatchError(err, res, "Failed to create order")
    }
}

export const webhook = (req: Request, res: Response) => {
    try {
        console.log("payments")

        // const body = req.body
        // const signature = req.headers['x-razorpay-signature']
        // if(!signature)
        //     throw TryError("Invalid request", 400)

        // const payload = JSON.stringify(body)
        // const generateSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET!).update(payload).digest('hex')

        // if(signature !== generateSignature)
        //     throw TryError("Invalid request", 400)

        // fs.writeFileSync("payment.json", JSON.stringify(body, null, 2))

        // if(body.event === "payment.authorized" && process.env.NODE_ENV === "dev") {
        //     console.log("Payment success for dev server")
        // }

        // if(body.event === "payment.captured" && process.env.NODE_ENV === "prod") {
        //     console.log("Payment success for prod server")
        // }

        // if(body.event === "payment.failed") {
        //     console.log("Payment failed")
        // }

        // res.json({message: "Payment success"})
        
    } catch (err) {
        CatchError(err, res, "Failed to process webhook")
    }

}