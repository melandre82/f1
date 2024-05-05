import { getNewConnection } from '../config/mysql.js'

/**
 * Tests the connection to the database.
 *
 */
async function testConnection () {
  try {
    const conn = await getNewConnection()
    console.log('Connected successfully to the database!')
    conn.release()
  } catch (error) {
    console.error('Failed to connect to the database:', error)
  }
}

testConnection()
