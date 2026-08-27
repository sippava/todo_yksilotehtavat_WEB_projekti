// Part 8:ssa todoRouter tehtiin hyvin yksinkertaiseksi.
// Routerissa ei enää tehdä SQL-kyselyitä,
// vaan pyynnöt ohjataan oikeille controller-funktioille.

// Eli nyt pyyntö kulkee routerilta controllerille,
// controllerilta modelille ja modelilta PostgreSQL-tietokantaan.

// GET-pyyntö ohjataan getTasks-controllerille.
// Tehtävien hakeminen ei vaadi kirjautumista.

// POST-pyyntö ohjataan createTask-controllerille.
// auth tarkistaa ensin, että käyttäjä on kirjautunut.

// DELETE-pyyntö ohjataan removeTask-controllerille.
// Myös poistaminen vaatii kirjautumisen.


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