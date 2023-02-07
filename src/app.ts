import express, {
    Application,
    Request,
    Response,
    NextFunction,
    urlencoded
} from "express";
import * as dotenv from 'dotenv';

dotenv.config()

import { getImages, getProducts } from "./queries";

const app: Application = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req : Request, res : Response) => {
    res.send("TS App is running")
})

app.get('/images', getImages)
app.get('/products', getProducts)

app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`)
})

