import asyncHandler from "express-async-handler"
import { prisma } from "../../prisma.js"

// descr    create exercise
// route    POST /api/exercises
// acccess  private

export const createNewExercise = asyncHandler(async (req, res) => {

   const { name, times, iconPath } = req.body
   const exercise = await prisma.exercise.create({
      data: {
         name, times, iconPath
      }
   })
   res.json(exercise)
})

// descr    update exercise
// route    up /api/exercises/:id
// acccess  private

export const updateExercises = asyncHandler(async (req, res) => {
   const { name, times, iconPath } = req.body

   try {
      const exercise = await prisma.exercise.update({
         where: {
            id: +req.params.id
         },
         data: {
            name, times, iconPath
         }
      })
      res.json(exercise)
   }
   catch (error) {
      res.status(404)
      throw new Error('Exercise not found ')
   }
})

// descr    delete exercise
// route    DELETE /api/exercises/:id
// acccess  private

export const deleteExercises = asyncHandler(async (req, res) => {
   try {
      const exercise = await prisma.exercise.delete({
         where: {
            id: +req.params.id
         },
      })
      res.json({ message: 'Exercise delete' })
   }
   catch (error) {
      res.status(404)
      throw new Error('Exercise not found ')
   }
})


// descr    Get exercises
// route    GET /api/exercises
// acccess  private

export const getExercises = asyncHandler(async (req, res) => {
   const exercises = await prisma.exercise.findMany({
      orderBy: {
         createdAt: 'desc'
      }
   })

   res.json(exercises)
})
