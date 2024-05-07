# F1 Data

## Project Description

F1 Data is a web app for visualizing the performance of Formula 1 drivers across the seasons. Users can view the total points drivers accummulated in each year, compare different drivers, and analyze trends in their racing careers. 

A technicality perhaps worth pointing out is that the points system has been inflated over the years so comparing drivers from different time periods is largely meaningless. Ideally I'd provide an option for a standardized points system. The source data also cuts off in the middle of the '23 season. Anyway, that's not really relevant to the assignment.

## Core Technologies

React.js: Chosen for the frontend to manage the application’s state and render the UI dynamically based on user interactions.

Node.js and Express: Used for the backend to handle API requests and serve data to the frontend.

Chart.js: Used on the front end for its charting capabilities. I was impressed how well it works with little setup.

MySQL: Utilized for database management to handle the large datasets. I like its reliability and ease of use.

## How to Use

1. Searching for Drivers: Enter a driver's name in the search bar and check their name too see their points history.
2. Comparing Drivers: Check multiple drivers from the side bar to compare their points accumulation graphically over the years. You can also select / deselect all at once.
4. More data: Hover over a graph plot to see the driver's name, year and total points. 

## Link to the Deployed Application

[https://cscloud7-245.lnu.se/wt2-web/](https://cscloud7-245.lnu.se/wt2-web/)


## Acknowledgements

[Source data](https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020)