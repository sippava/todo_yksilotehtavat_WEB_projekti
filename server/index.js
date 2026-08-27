// import express from 'express'
// import cors from 'cors'
// import pg from 'pg'
// import 'dotenv/config'

// const environment = process.env.NODE_ENV || 'development'
// const port = process.env.PORT || 3001
// const { Pool } = pg

// const app = express()

// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

// const openDb = () => {
//   const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: environment === 'development'
//       ? process.env.DB_NAME
//       : process.env.TEST_DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
//   })

//   return pool
// }

// app.get('/tasks', (req, res) => {
//   const pool = openDb()
//   pool.query('SELECT * FROM task', (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Internal server error' })
//     }
//     res.status(200).json(result.rows)
//   })
// })

// app.post('/tasks', (req, res) => {
//   const pool = openDb()
//   const { task } = req.body

//   if (!task) {
//     return res.status(400).json({error: 'Task is required'})
//   }

//   pool.query(
//     'insert into task (description) values ($1) returning *',
//     [task.description],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: 'Internal server error' })
//       }
//       res.status(201).json({
//         id: result.rows[0].id,
//         description: task.description
//       })
//     }
//   )
// })

// app.delete('/tasks/:id', (req, res) => {
//   const pool = openDb()
//   const { id } = req.params

//   console.log(`Deleting task with id: ${id}`)

//   pool.query(
//     'delete from task WHERE id = $1',
//     [id],
//     (err, result) => {
//       if (err) {
//         console.error(err.message)
//         return res.status(500).json({ error: 'Internal server error' })
//       }

//       if (result.rowCount === 0) {
//         return res.status(404).json({error: 'Task not found'})
//       }

//       return res.status(200).json({id:id})
//     }
//   )
// })

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`)
// })

// import express from 'express'
// import cors from 'cors'
// import { pool } from './helper/db.js'
// import 'dotenv/config'

// const port = process.env.PORT || 3001

// const app = express()

// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

// app.get('/tasks', (req, res) => {
//   pool.query('SELECT * FROM task', (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Internal server error' })
//     }

//     res.status(200).json(result.rows)
//   })
// })

// app.post('/tasks', (req, res) => {
//   const { task } = req.body

//   if (!task) {
//     return res.status(400).json({error: 'Task is required'})
//   }

//   pool.query(
//     'insert into task (description) values ($1) returning *',
//     [task.description],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: 'Internal server error' })
//       }

//       res.status(201).json({
//         id: result.rows[0].id,
//         description: task.description
//       })
//     }
//   )
// })

// app.delete('/tasks/:id', (req, res) => {
//   const { id } = req.params

//   pool.query(
//     'delete from task WHERE id = $1',
//     [id],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: 'Internal server error' })
//       }

//       if (result.rowCount === 0) {
//         return res.status(404).json({error: 'Task not found'})
//       }

//       return res.status(200).json({id:id})
//     }
//   )
// })

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`)
// })

// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import todoRouter from './routes/todoRouter.js'

// const port = process.env.PORT || 3001

// const app = express()

// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.use('/tasks', todoRouter)

// app.use((err, req, res, next) => {
//   const statusCode = err.status || 500

//   res.status(statusCode).json({
//     error: {
//       message: err.message,
//       status: statusCode
//     }
//   })
// })

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`)
// })

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import todoRouter from './routes/todoRouter.js'
import userRouter from './routes/userRouter.js'

const port = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/tasks', todoRouter)
app.use('/users', userRouter)

app.use((err, req, res, next) => {
  const statusCode = err.status || 500

  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode
    }
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})