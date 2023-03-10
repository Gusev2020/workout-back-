import asyncHandler from "express-async-handler"
import { prisma } from "../../prisma.js"

// descr    Get workout
// route    GET /api/workout
// acccess  private

export const getWorkout = asyncHandler(async (req, res) => {
   const workout = await prisma.workout.findUnique({
      where: {
         id: +req.params.id
      },
      include: {
         exercises: true
      }
   })

   if (!workout) {
      res.status(404)
      throw new Error('Workout not found')
   }
   const minutes = Math.ceil(workout.exercises.length * 3.7)

   res.json({ ...workout, minutes })
})

// descr    Get workouts
// route    GET /api/workouts
// acccess  private

export const getWorkouts = asyncHandler(async (req, res) => {
   const workouts = await prisma.workout.findMany({
      orderBy: {
         createdAt: 'desc'
      },
      include: {
         exercises: true
      }
   })
   res.json(workouts)
})


// descr    create workout
// route    POST /api/ workout
// acccess  private

export const createNewWorkout = asyncHandler(async (req, res) => {

   const { name, exerciseIds } = req.body
   const workout = await prisma.workout.create({
      data: {
         name,
         exercises: {
            connect: exerciseIds.map((id) => ({ id: +id }))
         }
      }
   })
   res.json(workout)
})


// descr    update workout
// route    up /api/workout/:id
// acccess  private

export const updateWorkout = asyncHandler(async (req, res) => {
   const { name, exerciseIds } = req.body

   try {
      const workout = await prisma.workout.update({
         where: {
            id: +req.params.id
         },
         data: {
            name,
            exercises: {
               set: exerciseIds.map(id => ({ id: +id }))

            }
         }
      })
      res.json(workout)
   }
   catch (error) {
      res.status(404)
      throw new Error('workout not found ')
   }
})

// descr    delete workout
// route    DELETE /api/workouts/:id
// acccess  private

export const deleteWorkout = asyncHandler(async (req, res) => {
   try {
      const workout = await prisma.workout.delete({
         where: {
            id: +req.params.id
         },

      })
      res.json({ message: 'workout delete' })
   }
   catch (error) {
      res.status(404)
      throw new Error('workout not found ')
   }
})

