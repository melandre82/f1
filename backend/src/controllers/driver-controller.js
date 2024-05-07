import { getNewConnection } from '../config/mysql.js'
import ApiError from '../errors/api-error.js'

/**
 *
 */
class DriverController {
  /**
   * Returns all drivers.
   *
   * @param {object} req The incoming request.
   * @param {object} res The outgoing response.
   * @param {object} next The next middleware in the chain.
   * @returns {Promise<void>}
   */
  async getDriverPerformance (req, res, next) {
    const pool = await getNewConnection()
    try {
      console.log('executing query')
      const [results] = await pool.query(`
        SELECT d.driverId, d.forename, d.surname, r.year, SUM(rs.points) AS total_points, 
        COUNT(DISTINCT CASE WHEN rs.position = 1 THEN r.raceId END) AS wins, 
        COUNT(DISTINCT CASE WHEN rs.position <= 3 THEN r.raceId END) AS podiums
        FROM drivers d
        JOIN race_results rs ON rs.driverId = d.driverId
        JOIN races r ON r.raceId = rs.raceId
        GROUP BY d.driverId, r.year
        ORDER BY d.surname, r.year;
    `)
      console.log('query executed')
      if (results.length === 0) {
        return next(new ApiError(404))
      }
      res.json(results)
    } catch (error) {
      return next(new ApiError(500))
    } finally {
      await pool.release()
    }
  }
}

export default new DriverController()
