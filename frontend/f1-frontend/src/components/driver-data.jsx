// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

/**
 * Component to display driver performance data.
 *
 * @returns {JSX.Element} - The driver data component.
 */
const DriverDataComponent = () => {
  const [chartData, setChartData] = useState({
    datasets: []
  })

  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 1950,
        max: 2023,
        ticks: {
          stepSize: 10,
          /**
           * Callback function for formatting the tick values.
           *
           * @param {number} value - The tick value.
           * @returns {string} - The formatted tick value.
           */
          callback: (value) => value.toFixed(0)
        },
        title: {
          display: true,
          text: 'Year'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Points'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Driver Performance Over Years'
      },
      tooltip: {
        callbacks: {
          /**
           * Custom tooltip label callback function that displays the driver's name and points for the year.
           *
           * @param {string} tooltipItem - The tooltip item.
           * @returns {string} - The formatted tooltip label.
           */
          label: function (tooltipItem) {
            let label = tooltipItem.dataset.label || ''
            if (label) {
              label += ': '
            }
            label += parseInt(tooltipItem.raw.y)
            return label
          },
          /**
           * Custom tooltip title callback function that displays the year.
           *
           * @param {string} tooltipItems - The tooltip items.
           * @returns {string} - The formatted tooltip title.
           */
          title: function (tooltipItems) {
            return `Year: ${tooltipItems[0].parsed.x}`
          }
        }
      }
    }
  })
  const [checkedDrivers, setCheckedDrivers] = useState({})
  const [filter, setFilter] = useState('')

  //   /**
  //    *
  //    * @param e
  //    */
  /**
   *
   * @param e
   */
  const handleSearchChange = (e) => {
    setFilter(e.target.value.toLowerCase())
  }

  const filteredDatasets = chartData.datasets.filter(dataset =>
    dataset.label.toLowerCase().includes(filter)
  )

  useEffect(() => {
    /**
     * Fetch driver points data from the server.
     *
     */
    const fetchData = async () => {
    //   const response = await fetch(`${import.meta.env.VITE_API_URL}/driver-performance`)
    // For some reason, neither REACT_APP_API_URL nor VITE_API_URL wants to work so I had to hardcode the URL
      const response = await fetch('http://localhost:3001/driver-performance')
      // const apiUrl = import.meta.env.REACT_APP_API_URL
      // console.log('API URL:', apiUrl)

      const data = await response.json()
      processChartData(data)
    }

    /**
     * Process the fetched data and create the chart data.
     *
     * @param {Array} data - The fetched data.
     */
    const processChartData = (data) => {
      const driversData = {}

      // Accumulate points for each driver to be able to sort them by total points
      data.forEach(item => {
        if (!driversData[item.driverId]) {
          driversData[item.driverId] = {
            label: `${item.forename} ${item.surname}`,
            data: [],
            borderColor: getRandomColor(),
            fill: false,
            totalPoints: 0
          }
        }
        const points = parseFloat(item.total_points)
        if (!isNaN(points)) {
          driversData[item.driverId].data.push({
            x: item.year,
            y: points
          })
          driversData[item.driverId].totalPoints += points
        }
      })

      // Sort drivers by total points in descending order
      const datasets = Object.values(driversData).sort((a, b) => b.totalPoints - a.totalPoints)

      const initialCheckedDrivers = Object.fromEntries(datasets.map(driver => [driver.label, true]))

      setChartData({ datasets })
      setCheckedDrivers(initialCheckedDrivers)
    }

    fetchData()
  }, [])

  /**
   * Generate a random color in HSL format.
   *
   * @returns {string} - The random color in HSL format.
   */
  const getRandomColor = () => {
    /**
     * Generate a random color in HSL format.
     */
    const h = Math.floor(Math.random() * 360)
    const s = 80 + Math.floor(Math.random() * 20)
    const l = 20 + Math.floor(Math.random() * 25)

    return `hsl(${h}, ${s}%, ${l}%)`
  }

  /**
   * Toggle the checked state of a driver.
   *
   * @param {string} driverLabel - The driver label.
   */
  const toggleDriverChecked = (driverLabel) => {
    setCheckedDrivers(prevState => ({
      ...prevState,
      [driverLabel]: !prevState[driverLabel]
    }))
  }

  /**
   * Check or uncheck all drivers.
   *
   * @param {boolean} isChecked - The state to set for all drivers.
   */
  const handleCheckUncheckAll = (isChecked) => {
    const updatedCheckedDrivers = {}
    chartData.datasets.forEach(dataset => {
      updatedCheckedDrivers[dataset.label] = isChecked
    })
    setCheckedDrivers(updatedCheckedDrivers)
  }

  return (
    <div className="container">
      <div className="sidebar-container">
        <input
          type="text"
          placeholder="Search Drivers"
          value={filter}
          onChange={handleSearchChange}
          className="search-field"
        />
        <div className="sidebar">
          <div className="driver-list">
            {filteredDatasets.map((dataset, index) => (
              <div key={index} className="legend-item" style={{ color: dataset.borderColor, cursor: 'pointer' }} onClick={() => toggleDriverChecked(dataset.label)}>
                <input
                  type="checkbox"
                  checked={checkedDrivers[dataset.label]}
                  onChange={() => toggleDriverChecked(dataset.label)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="color-box" style={{ backgroundColor: dataset.borderColor }}></span>
                {dataset.label}
              </div>
            ))}
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => handleCheckUncheckAll(true)}>Check All</button>
          <button onClick={() => handleCheckUncheckAll(false)}>Uncheck All</button>
        </div>
      </div>
      <div className="chart-container">
        <Line options={chartOptions} data={{ datasets: chartData.datasets.filter(dataset => checkedDrivers[dataset.label]) }} />
      </div>
    </div>
  )
}

export default DriverDataComponent
