import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { createNewExercise, deleteExercises, getExercises, updateExercises } from './exercise.controller.js';

const router = express.Router()

router.route('/').post(protect, createNewExercise).get(protect, getExercises)
router.route('/:id').put(protect, updateExercises).delete(protect, deleteExercises)


export default router