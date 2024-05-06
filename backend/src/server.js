/**
 * Server setup.
 *
 * @author Mats Loock & Melker Andreasson
 * @version 1.0.0
 */

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { router } from './routes/router.js'
import { createServer } from 'node:http'
import dotenv from 'dotenv'
import express from 'express'
import logger from 'morgan'
// import { connectDB } from './config/mongoose.js'
import cors from 'cors'

import ApiError from '../src/errors/api-error.js'

try {
  dotenv.config()

  // Connect to MongoDB.
  //   await connectDB()

  // Creates an Express application.
  const app = express()

  app.use(express.json({ limit: '1000kb' }))

  // Create an HTTP server and pass it to Socket.IO.
  const httpServer = createServer(app)

  // Get the directory name of this module's path.
  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  // View engine setup.

  // Parse requests of the content type application/x-www-form-urlencoded.
  // Populates the request object with a body object (req.body).
  app.use(express.urlencoded({ extended: false }))

  // --------------------------------------------------------------------------
  //
  // Webhook: Parse incoming requests with JSON payloads (application/json).
  // Populates the request object with a body object (req.body).
  //
  app.use(express.json())
  // -------------------------------------------------------------------------

  app.use(cors({
    origin: process.env.CLIENT_URL // restrict calls to those origins
  }))

  // Serve static files.
  app.use(express.static(join(directoryFullName, '..', 'public')))

  // Setup and use session middleware (https://github.com/expressjs/session)
  const sessionOptions = {
    name: process.env.SESSION_NAME, // Don't use default session cookie name.
    secret: process.env.SESSION_SECRET, // Change it!!! The secret is used to hash the session with HMAC.
    resave: false, // Resave even if a request is not changing the session.
    saveUninitialized: false, // Don't save a created but not modified session.
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: 'strict'
    }
  }

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessionOptions.cookie.secure = true // serve secure cookies
  }

  app.use('/', router)

  app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
      return res.status(err.status).json({
        error: {
          status: err.status,
          message: err.message
        }
      })
    }

    // Fallback error handling for non-ApiError instances
    const status = err.status || 500
    res.status(status).json({
      error: {
        status,
        message: err.message || 'Internal server error'
      }
    })
  })

  // Register routes.

  // Starts the HTTP server listening for connections.
  httpServer.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
