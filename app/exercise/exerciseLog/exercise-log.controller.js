
import asyncHandler from "express-async-handler"
import { prisma } from "../../../prisma.js"
// descr    create new exerciselog
// route    POST /api/exercises/log/:exerciseId
// acccess  private

export const createNewExerciseLog = asyncHandler(async (req, res) => {

   const exerciseId = +req.params.exerciseId
   const exercise = await prisma.exercise.findUnique({
      where: {
         id: exerciseId
      }
   })

   if (!exercise) {
      res.status(404)
      throw new Error('Exercise not found')
   }

   let timesDefult = []

   for (let i = 0; i < exercise.times; i++) {
      timesDefult.push({
         weight: 0,
         repeat: 0
      })
   }

   const exerciseLog = await prisma.exerciseLog.create({
      data: {
         user: {
            connect: {
               id: req.user.id
            }
         },
         exercise: {
            connect: {
               id: exerciseId
            }
         },
         times: {
            createMany: {
               data: timesDefult
            }
         }
      },
      include: {
         times: true,
      }
   })
   res.json(exerciseLog)
})