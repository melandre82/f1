import { createReadStream } from 'fs'
import { parse } from 'csv-parse'
import { closePool, getNewConnection } from '../config/mysql.js'

// reused code from previous assignments

/**
 * Inserts data into a database table in batches.
 *
 * @param {string} tableName - The name of the table to insert data into.
 * @param {string[]} columns - An array of column names in the table.
 * @param {Array<Array<any>>} data - The data to be inserted into the table.
 * @param {number} [batchSize=500] - The number of rows to insert in each batch.
 * @returns {Promise<void>} - A promise that resolves when the data is inserted.
 */
async function insertData (tableName, columns, data, batchSize = 500) {
  let conn = null
  try {
    conn = await getNewConnection()
    for (let i = 0; i < data.length; i += batchSize) {
      /// no modification
      // const batchData = data.slice(i, i + batchSize).map(row => columns.map(col => row[col]))
      /// remove \n and replace with null
      const batchData = data.slice(i, i + batchSize).map(row =>
        columns.map(col => {
          let cellData = row[col]
          if (typeof cellData === 'string') {
            cellData = cellData.replace(/\\N/g, '')

            if (cellData === '') cellData = null
          }
          return cellData
        }))

      const query = `INSERT INTO ${tableName} (${columns.join(',')}) VALUES ?`
      await conn.query(query, [batchData])
    }
  } catch (err) {
    console.error(`Failed to insert data: ${err.message}`)
  } finally {
    if (conn) {
      conn.release()
    }
  }
}

/**
 *
 * @param filePath
 * @param tableName
 * @param columns
 */
/**
 * Populates a database table from a CSV file.
 *
 * @param {string} filePath - The path to the CSV file.
 * @param {string} tableName - The name of the table to populate.
 * @param {string[]} columns - An array of column names in the table.
 * @returns {Promise<void>} - A promise that resolves when the table is populated.
 */
async function populateTableFromCSV (filePath, tableName, columns) {
  const results = []
  console.log('File path being read:', filePath)
  createReadStream(filePath)
    .pipe(parse({ columns: true, trim: true }))
    .on('data', (data) => {
      results.push(data)
      if (results.length >= 500) {
        insertData(tableName, columns, results.splice(0, 500)).catch(console.error)
      }
    })
    .on('end', async () => {
      if (results.length > 0) {
        await insertData(tableName, columns, results).catch(console.error)
      }
      console.log('Finished processing:', filePath)
      closePool()
    })
    .on('error', (error) => console.error('Error reading CSV file:', error))
}

export default populateTableFromCSV
