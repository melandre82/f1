use formula1;

CREATE TABLE drivers (
    driverId INT PRIMARY KEY,
    driverRef VARCHAR(255) NOT NULL,
    number INT NOT NULL,
    code VARCHAR(10) NOT NULL,
    forename VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    nationality VARCHAR(255) NOT NULL,
    url VARCHAR(255)
);

