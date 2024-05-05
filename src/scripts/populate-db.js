import populateTableFromCSV from '../functions/populate.js'
import { closePool } from '../src/config/mysql.js'

// reused code from previous assignments

/**
 * Populates the database with data from CSV files.
 *
 */
async function main () {
  try {
    await populateTableFromCSV('../f1-data/drivers.csv', 'drivers',
      ['driverId', 'driverRef', 'number', 'code', 'forename', 'surname', 'dob', 'nationality', 'url'
      ])
  } catch (error) {
    console.error('Failed to populate database:', error)
  } finally {
    await closePool()
  }
}

main()
