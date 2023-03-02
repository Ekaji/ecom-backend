import express, {
    Application,
    Request,
    Response,
    NextFunction,
    Express
} from "express";

import log from "./utils/logger";

import { products, images, auth } from "./routes/routes";

const app: Express = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/products', products)
app.use('/images', images)
app.use('/', auth)

app.get("/", (req : Request, res : Response) => {
    res.send("TS App is running")
})

app.listen(PORT, () => {
   log.info(`app is listening on ${PORT}`)
})

