import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import path from "path"

import 'colors'
import { prisma } from './prisma.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'

import authRoutes from './app/auth/auth.route.js'
import userRoutes from './app/user/user.route.js'
import exerciseRoutes from './app/exercise/exercise.route.js'


dotenv.config()

const app = express()

async function main() {
   if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
   app.use(express.json())

   const __dirname = path.resolve()

   app.use('/app/uploads', express.static(path.join(__dirname, '/app/uploads/')))

   app.use('/api/auth', authRoutes)
   app.use('/api/users', userRoutes)
   app.use('/api/exercises', exerciseRoutes)

   app.use(notFound)
   app.use(errorHandler)

   const PORT = process.env.PORT || 5000

   app.listen(
      PORT,
      console.log(
         `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
            .bold
      )
   )
}

main().then(async () => {
   await prisma.$disconnect()
})
   .catch(async e => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
   })