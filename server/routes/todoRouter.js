// import { pool } from '../helper/db.js'
// import { Router } from 'express'

// const router = Router()

// router.get('/', (req, res) => {
//   pool.query('SELECT * FROM task', (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Internal server error' })
//     }

//     res.status(200).json(result.rows)
//   })
// })

// router.post('/', (req, res) => {
//   const { task } = req.body

//   if (!task) {
//     return res.status(400).json({ error: 'Task is required' })
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

// router.delete('/:id', (req, res) => {
//   const { id } = req.params

//   pool.query(
//     'delete from task WHERE id = $1',
//     [id],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: 'Internal server error' })
//       }

//       if (result.rowCount === 0) {
//         return res.status(404).json({ error: 'Task not found' })
//       }

//       return res.status(200).json({ id: id })
//     }
//   )
// })

// export default router

// import { pool } from '../helper/db.js'
// import { Router } from 'express'

// const router = Router()

// router.get('/', (req, res, next) => {
//   pool.query('SELECT * FROM task', (err, result) => {
//     if (err) {
//       return next(err)
//     }

//     res.status(200).json(result.rows || [])
//   })
// })

// router.post('/', (req, res, next) => {
//   const { task } = req.body

//   if (!task) {
//     const error = new Error('Task is required')
//     error.status = 400
//     return next(error)
//   }

//   pool.query(
//     'insert into task (description) values ($1) returning *',
//     [task.description],
//     (err, result) => {
//       if (err) {
//         return next(err)
//       }

//       res.status(201).json({
//         id: result.rows[0].id,
//         description: task.description
//       })
//     }
//   )
// })

// router.delete('/:id', (req, res, next) => {
//   const { id } = req.params

//   pool.query(
//     'delete from task WHERE id = $1',
//     [id],
//     (err, result) => {
//       if (err) {
//         return next(err)
//       }

//       if (result.rowCount === 0) {
//         const error = new Error('Task not found')
//         error.status = 404
//         return next(error)
//       }

//       return res.status(200).json({ id: id })
//     }
//   )
// })

// export default router
// import { pool } from '../helper/db.js'
// import { Router } from 'express'
// import { auth } from '../helper/auth.js'

// const router = Router()

// router.get('/', (req, res, next) => {
//   pool.query('SELECT * FROM task', (err, result) => {
//     if (err) {
//       return next(err)
//     }

//     res.status(200).json(result.rows || [])
//   })
// })

// router.post('/', auth, (req, res, next) => {
//   const description = req.body.task?.description

//   if (!description) {
//     const error = new Error('Task description is required')
//     error.status = 400
//     return next(error)
//   }

//   pool.query(
//     'INSERT INTO task (description) VALUES ($1) RETURNING *',
//     [description],
//     (err, result) => {
//       if (err) {
//         return next(err)
//       }

//       res.status(201).json(result.rows[0])
//     }
//   )
// })

// router.delete('/:id', auth, (req, res, next) => {
//   const { id } = req.params

//   pool.query(
//     'DELETE FROM task WHERE id = $1',
//     [id],
//     (err, result) => {
//       if (err) {
//         return next(err)
//       }

//       if (result.rowCount === 0) {
//         const error = new Error('Task not found')
//         error.status = 404
//         return next(error)
//       }

//       return res.status(200).json({ id: id })
//     }
//   )
// })

// // export default router

// import { Router } from 'express'
// import { auth } from '../helper/auth.js'
// import { getTasks } from '../controllers/TaskController.js'
// import { pool } from '../helper/db.js'

// const router = Router()

// router.get('/', getTasks)

// router.post('/', auth, (req, res, next) => {
//   const description = req.body.task?.description

//   if (!description) {
//     const error = new Error('Task description is required')
//     error.status = 400
//     return next(error)
//   }

//   pool.query(
//     'INSERT INTO task (description) VALUES ($1) RETURNING *',
//     [description],
//     (err, result) => {
//       if (err) {
//         return next(err)
//       }

//       res.status(201).json(result.rows[0])
//     }
//   )
// })

// router.delete('/:id', auth, (req, res, next) => {
//   const { id } = req.params

//   pool.query(
//     'DELETE FROM task WHERE id = $1',
//     [id],
//     (err, result) => {
//       if (err) {
//         return next(err)
//       }

//       if (result.rowCount === 0) {
//         const error = new Error('Task not found')
//         error.status = 404
//         return next(error)
//       }

//       return res.status(200).json({ id: id })
//     }
//   )
// })

// export default router

// import { Router } from 'express'
// import { auth } from '../helper/auth.js'
// import { getTasks, createTask } from '../controllers/TaskController.js'
// import { pool } from '../helper/db.js'

// const router = Router()

// router.get('/', getTasks)

// router.post('/', auth, createTask)

// router.delete('/:id', auth, (req, res, next) => {
//   const { id } = req.params

//   pool.query(
//     'DELETE FROM task WHERE id = $1',
//     [id],
//     (err, result) => {
//       if (err) {
//         return next(err)
//       }

//       if (result.rowCount === 0) {
//         const error = new Error('Task not found')
//         error.status = 404
//         return next(error)
//       }

//       return res.status(200).json({ id: id })
//     }
//   )
// })

// export default router

import { Router } from 'express'
import { auth } from '../helper/auth.js'
import {
  getTasks,
  createTask,
  removeTask
} from '../controllers/TaskController.js'

const router = Router()

router.get('/', getTasks)

router.post('/', auth, createTask)

router.delete('/:id', auth, removeTask)

export default router