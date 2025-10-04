import AuthApiDoc from "../swagger/auth.swagger"
import FriendApiDoc from "../swagger/friend.swagger"
import ProductApiDoc from "../swagger/product.swagger"
import StorageApiDoc from "../swagger/storage.swagger"

const SwaggerConfig = {
    openapi: "3.0.0",
    info: {
        title: "Besties official api",
        desciption: "All the private and public apis are listed here",
        version: "1.0.0",
        contact: {
            name: "Fazila",
            email: "fazeela.mushtaq.sirius@gmail.com"
        }
    },
    servers: [
        {url: process.env.SERVER}
    ],   
    paths: {
        ...AuthApiDoc,
        ...StorageApiDoc,
        ...FriendApiDoc,
        ...ProductApiDoc
    }
}

export default SwaggerConfig