use formula1;

CREATE TABLE drivers (
    driverId INT PRIMARY KEY,
    driverRef VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL,
    code VARCHAR(10) NOT NULL,
    forename VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    nationality VARCHAR(255) NOT NULL,
    url VARCHAR(255)
);


create table constructors (
	constructorId int primary key,
    constructorRef varchar(255) not null,
    name varchar(255) not null,
	nationality VARCHAR(255) NOT NULL,
    url varchar(255)
);

CREATE TABLE circuits (
    circuitId INT PRIMARY KEY,
    circuitRef VARCHAR(255) not null,
    name VARCHAR(255) not null,
    location VARCHAR(255) not null,
    country VARCHAR(255) not null,
    lat FLOAT not null,
    lng FLOAT not null,
    alt INT,
    url VARCHAR(255)
);

CREATE TABLE races (
    raceId INT PRIMARY KEY,
    year YEAR not null,
    round INT not null,
    circuitId INT,
    name VARCHAR(255) not null,
    date DATE not null,
    time TIME,
    url VARCHAR(255),
    foreign key (circuitId) references circuits(circuitId)
);

CREATE TABLE qualifying (
    qualifyId INT PRIMARY KEY,
    raceId INT,
    driverId INT,
    constructorId INT,
    number INT not null,
    position INT not null,
    FOREIGN KEY (raceId) REFERENCES races(raceId),
    FOREIGN KEY (driverId) REFERENCES drivers(driverId),
    FOREIGN KEY (constructorId) REFERENCES constructors(constructorId)
);

CREATE TABLE constructor_results (
    constructorResultsId INT PRIMARY KEY,
    raceId INT,
    constructorId INT,
    points DECIMAL(5,2),
    FOREIGN KEY (raceId) REFERENCES races(raceId),
    FOREIGN KEY (constructorId) REFERENCES constructors(constructorId)
);

CREATE TABLE constructor_standings (
    constructorStandingsId INT PRIMARY KEY,
    raceId INT,
    constructorId INT,
    points DECIMAL(5,2) not null,
    position INT not null,
    wins INT not null,
    FOREIGN KEY (raceId) REFERENCES races(raceId),
    FOREIGN KEY (constructorId) REFERENCES constructors(constructorId)
);

CREATE TABLE driver_standings (
    driverStandingsId INT PRIMARY KEY,
    raceId INT,
    driverId INT,
    points DECIMAL(5,2) not null,
    position INT not null,
    wins INT not null,
    FOREIGN KEY (raceId) REFERENCES races(raceId),
    FOREIGN KEY (driverId) REFERENCES drivers(driverId)
);

create table status (
	statusId int primary key,
    status varchar(255) not null
);

CREATE TABLE race_results (
    resultId INT PRIMARY KEY,
    raceId INT,
    driverId INT,
    constructorId INT,
    number INT,
    grid INT,
    position INT,
    positionText VARCHAR(10),
    positionOrder INT,
    points DECIMAL(5,2),
    laps INT,
    time VARCHAR(50),  
    milliseconds BIGINT,
    fastestLap INT,
    ranking INT,
    fastestLapTime VARCHAR(50),
    fastestLapSpeed DECIMAL(10,3),
    statusId INT,
    FOREIGN KEY (raceId) REFERENCES races(raceId),
    FOREIGN KEY (driverId) REFERENCES drivers(driverId),
    FOREIGN KEY (constructorId) REFERENCES constructors(constructorId),
    FOREIGN KEY (statusId) REFERENCES status(statusId)
);

CREATE TABLE sprint_results (
    resultId INT PRIMARY KEY,
    raceId INT,
    driverId INT,
    constructorId INT,
    number INT,
    grid INT,
    position INT,
    positionText VARCHAR(10),
    positionOrder INT,
    points DECIMAL(5,2),
    laps INT,
    time VARCHAR(50),  
    milliseconds BIGINT,
    fastestLap INT,
    ranking INT,
    fastestLapTime VARCHAR(50),
    fastestLapSpeed DECIMAL(10,3),
    statusId INT,
    FOREIGN KEY (raceId) REFERENCES races(raceId),
    FOREIGN KEY (driverId) REFERENCES drivers(driverId),
    FOREIGN KEY (constructorId) REFERENCES constructors(constructorId),
    FOREIGN KEY (statusId) REFERENCES status(statusId)
);

