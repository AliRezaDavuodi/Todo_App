import express, { Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config()

const app: Application = express()

app.use(morgan('combined'))
app.use(helmet())
app.use(cors())

export default app
