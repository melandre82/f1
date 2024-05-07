CREATE INDEX idx_race_results_driverId_raceId_position ON race_results(driverId, raceId, position);

CREATE INDEX idx_races_raceId_year ON races(raceId, year);

CREATE INDEX idx_drivers_driverId_surname ON drivers(driverId, surname);
