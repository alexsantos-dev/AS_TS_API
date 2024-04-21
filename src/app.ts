import express from 'express'
import UserRoutes from './routes/user/User.routes'
import { configDotenv } from 'dotenv'

const app = express()

configDotenv()

app.use(express.json())
app.use('/user', UserRoutes.router)

export default app

