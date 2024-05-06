import express from 'express'
import driverController from '../controllers/driver-controller.js'

export const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello, World!')
})

router.get('/driver-performance', (req, res, next) => {
  driverController.getDriverPerformance(req, res, next)
})
