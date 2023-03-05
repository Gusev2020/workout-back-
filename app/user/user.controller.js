import asyncHandler from "express-async-handler"
import { prisma } from "../../prisma.js"
import { UserFields } from "../utils/user.utils.js"

// descr    get user profile
// route    GET /api/user/profile
// acccess  private


export const getUserProfile = asyncHandler(async (req, res) => {
   const user = await prisma.user.findUnique({
      where: {
         id: req.user.id
      },
      select: UserFields
   })

   res.json(user)
})