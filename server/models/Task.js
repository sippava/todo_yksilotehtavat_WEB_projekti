//Aluksi tein server kansioon models ja controllers kansiot. Tänne liitin lopulta tämän koodin.

//Eli Task.js toimii modelina. Siirsin tänne tietokantaan liittyvät SQL-kyselyt.

// Ensin tein selectAllTasks-funktion,
// joka hakee kaikki tehtävät task-taulusta.

// Seuraavaksi tein insertTask-funktion,
// joka lisää uuden tehtävän tietokantaan.

// Lopuksi tein deleteTask-funktion.
// Tehtävänannossa DELETE-toiminnon MVC-rakennetta ei annettu valmiina,
// vaan se tehtiin aikaisempien esimerkkien perusteella.
// Funktio poistaa tehtävän sen id:n perusteella.

import { pool } from '../helper/db.js'

const selectAllTasks = async () => {
  return await pool.query('SELECT * FROM task')
}

const insertTask = async (description) => {
  return await pool.query(
    'insert into task (description) values ($1) returning *',
    [description]
  )
}

const deleteTask = async (id) => {
  return await pool.query(
    'DELETE FROM task WHERE id = $1 RETURNING *',
    [id]
  )
}

export { selectAllTasks, insertTask, deleteTask }