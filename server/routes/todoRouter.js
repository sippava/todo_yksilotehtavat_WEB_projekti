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

import { pool } from '../helper/db.js'
import { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM task', (err, result) => {
    if (err) {
      return next(err)
    }

    res.status(200).json(result.rows || [])
  })
})

router.post('/', (req, res, next) => {
  const { task } = req.body

  if (!task) {
    const error = new Error('Task is required')
    error.status = 400
    return next(error)
  }

  pool.query(
    'insert into task (description) values ($1) returning *',
    [task.description],
    (err, result) => {
      if (err) {
        return next(err)
      }

      res.status(201).json({
        id: result.rows[0].id,
        description: task.description
      })
    }
  )
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params

  pool.query(
    'delete from task WHERE id = $1',
    [id],
    (err, result) => {
      if (err) {
        return next(err)
      }

      if (result.rowCount === 0) {
        const error = new Error('Task not found')
        error.status = 404
        return next(error)
      }

      return res.status(200).json({ id: id })
    }
  )
})

export default router