import { prisma } from "../../prisma.js"
import asyncHandler from "express-async-handler"
import { faker } from "@faker-js/faker"
import { hash, verify } from "argon2"
import { generateToken } from "./generate-token.js"
import { UserFields } from "../utils/user.utils.js"


// descr    auth user
// route    POST /api/auth/login
// acccess  public

export const authUser = asyncHandler(async (req, res) => {

   const user = await prisma.user.findMany({
      where: {
         email
      }
   })

   const isValidPassword = await verify(user.password, password)

   if (user && isValidPassword) {
      const token = generateToken(user.id)
      res.json({ user, token })
   }
   else {
      res.status(401)
      throw new Error('Email or password are not correct')
   }

})

// descr    register user
// route    POST /api/auth/register
// acccess  public

export const registerUser = asyncHandler(async (req, res) => {

   const { email, password } = req.body
   const isHaveUser = await prisma.user.findUnique({
      where: {
         email
      }
   })

   if (isHaveUser) {
      res.status(400)
      throw new Error('User already exists')
   }

   const user = await prisma.user.create({
      data: {
         email,
         password: await hash(password),
         name: faker.name.fullName()
      },
      select: UserFields
   })

   const token = generateToken(user.id)

   res.json({ user, token })
})