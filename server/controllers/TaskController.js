//Ensin luotiin server kansion alle controller ja models kansiot.

//Seuraavaksi tein controllers/TaskController.js-tiedoston ja liitin sinne tämän koodin:





import {
  selectAllTasks,
  insertTask,
  deleteTask
} from '../models/Task.js'

import { ApiError } from '../helper/ApiError.js'

const getTasks = async (req, res, next) => { //Käsitellään HTTP pyyntö eli GET. Haetaan kaikki tehtävät ja palautetaan JSON-muodossa.
  try {
    const result = await selectAllTasks()
    return res.status(200).json(result.rows || [])
  } catch (error) {
    return next(error)
  }
}

const createTask = async (req, res, next) => { // POST pyyntö. Tarkistetaan, että tehtävällä on kuvaus ja sen jälkeen lisätään uusi insertTask-funktiolla.
  try {
    const description = req.body.task?.description?.trim()

    if (!description) {
      return next(
        new ApiError('Task description is required', 400)
      )
    }

    const result = await insertTask(description)
    return res.status(201).json(result.rows[0])
  } catch (error) {
    return next(error)
  }
}

const removeTask = async (req, res, next) => { //Sitten DELETE-toiminto. Poistamiselle tein samalla tavalla oman controller-funktion. Jos kyseistä ID:tä ei löydy, palautetaan 404.
  try {
    const { id } = req.params

    const result = await deleteTask(id)

    if (result.rowCount === 0) {
      return next(
        new ApiError('Task not found', 404)
      )
    }

    return res.status(200).json({ id: result.rows[0].id })
  } catch (error) {
    return next(error)
  }
}

export { getTasks, createTask, removeTask }