import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const poolConfig = {
  host: '127.0.0.1',
  port: 27021,
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: 'formula1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

const pool = mysql.createPool(poolConfig)

/**
 * Get a new connection from the connection pool.
 *
 * @returns {Promise<mysql.Connection>} A promise that resolves to a new connection.
 */
export async function getNewConnection () {
  return await pool.getConnection()
}

/**
 * Close the connection pool.
 */
export async function closePool () {
  await pool.end()
}
