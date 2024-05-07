      SELECT d.driverId, d.forename, d.surname, r.year, SUM(rs.points) AS total_points, 
        COUNT(DISTINCT CASE WHEN rs.position = 1 THEN r.raceId END) AS wins, 
        COUNT(DISTINCT CASE WHEN rs.position <= 3 THEN r.raceId END) AS podiums
        FROM drivers d
        JOIN race_results rs ON rs.driverId = d.driverId
        JOIN races r ON r.raceId = rs.raceId
        GROUP BY d.driverId, r.year
        ORDER BY r.year;