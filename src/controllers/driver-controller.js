import { getNewConnection } from '../config/mysql.js'
import ApiError from '../errors/api-error.js'

/**
 *
 */
class DriverController {
  /**
   *
   * @param req
   * @param res
   * @param next
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
        return next(new ApiError(404, 'No data'))
      }
      res.json(results)
    } catch (error) {
      res.status(500).json({ message: error.message })
    } finally {
      await pool.release()
    }
  }
}

export default new DriverController()
