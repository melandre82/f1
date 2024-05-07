import populateTableFromCSV from '../functions/populate.js'
// import { closePool } from '../config/mysql.js'

// reused code from previous assignments

/**
 * Populates the database with data from CSV files.
 *
 */
async function main () {
  try {
    // await populateTableFromCSV('./f1-data/drivers.csv', 'drivers',
    //   ['driverId', 'driverRef', 'number', 'code', 'forename', 'surname', 'dob', 'nationality', 'url'
    //   ])
    // await populateTableFromCSV('./f1-data/constructors.csv', 'constructors',
    //   ['constructorId', 'constructorRef', 'name', 'nationality', 'url'
    //   ])
    // await populateTableFromCSV('./f1-data/circuits.csv', 'circuits',
    //   ['circuitId', 'circuitRef', 'name', 'location', 'country', 'lat', 'lng', 'alt', 'url'
    //   ])
    // await populateTableFromCSV('./f1-data/races.csv', 'races',
    //   ['raceId', 'year', 'round', 'circuitId', 'name', 'date', 'time', 'url'
    //   ])
    // await populateTableFromCSV('./f1-data/qualifying.csv', 'qualifying',
    //   ['qualifyId', 'raceId', 'driverId', 'constructorId', 'number', 'position'
    //   ])
    // await populateTableFromCSV('./f1-data/constructor_results.csv', 'constructor_results',
    //   ['constructorResultsId', 'raceId', 'constructorId', 'points'
    //   ])
    // await populateTableFromCSV('./f1-data/driver_standings.csv', 'driver_standings',
    //   ['driverStandingsId', 'raceId', 'driverId', 'points', 'position', 'wins'
    //   ])
    // await populateTableFromCSV('./f1-data/status.csv', 'status',
    //   ['statusId', 'status'
    //   ])
    // await populateTableFromCSV('./f1-data/race_results.csv', 'race_results',
    //   ['resultId', 'raceId', 'driverId', 'constructorId', 'number', 'grid', 'position', 'positionText', 'positionOrder', 'points',
    //     'laps', 'time', 'milliseconds', 'fastestLap', 'ranking', 'fastestLapTime', 'fastestLapSpeed', 'statusId'
    //   ])
    await populateTableFromCSV('./f1-data/sprint_results.csv', 'sprint_results',
      ['resultId', 'raceId', 'driverId', 'constructorId', 'number', 'grid', 'position', 'positionText', 'positionOrder', 'points',
        'laps', 'time', 'milliseconds', 'fastestLap', 'ranking', 'fastestLapTime', 'fastestLapSpeed', 'statusId'
      ])
  } catch (error) {
    console.error('Failed to populate database:', error)
  } finally {
    // await closePool()
  }
}

main()
