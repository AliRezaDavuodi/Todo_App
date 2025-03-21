import express, { Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import "reflect-metadata"
import { errorHandler } from './middleware/error.middleware'

dotenv.config()

const app: Application = express()

app.use(morgan('combined'))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(errorHandler)

export default app
