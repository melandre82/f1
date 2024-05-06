import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
)

/**
 *
 */
const DriverDataComponent = () => {
  const [chartData, setChartData] = useState({
    datasets: []
  })
  const [chartOptions, setChartOptions] = useState({})
  const [checkedDrivers, setCheckedDrivers] = useState({})

  useEffect(() => {
    /**
     *
     */
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/driver-performance')
      const data = await response.json()
      processChartData(data)
    }

    /**
     *
     * @param data
     */
    const processChartData = (data) => {
      const driversData = {}
      data.forEach(item => {
        if (!driversData[item.driverId]) {
          driversData[item.driverId] = {
            label: `${item.forename} ${item.surname}`,
            data: [],
            borderColor: getRandomColor(),
            fill: false,
            checked: true
          }
        }
        driversData[item.driverId].data.push({
          x: item.year,
          y: item.total_points
        })
      })

      setChartData({ datasets: Object.values(driversData) })
      setCheckedDrivers(Object.fromEntries(Object.values(driversData).map(driver => [driver.label, true])))
      setChartOptions({
        responsive: true,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
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
          }
        }
      })
    }

    fetchData()
  }, [])

  /**
   *
   */
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  /**
   *
   * @param driverId
   * @param driverLabel
   */
  const toggleDriverChecked = (driverLabel) => {
    setCheckedDrivers(prevState => ({
      ...prevState,
      [driverLabel]: !prevState[driverLabel]
    }))
  }

  /**
   *
   * @param isChecked
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
    <div className="sidebar">
      {chartData.datasets.map((dataset, index) => (
        <div key={index} className="legend-item" style={{ color: dataset.borderColor }}>
          <input
              type="checkbox"
              checked={checkedDrivers[dataset.label]}
              onChange={() => toggleDriverChecked(dataset.label)}
            />
          <span className="color-box" style={{ backgroundColor: dataset.borderColor }}></span>
          {dataset.label}
        </div>
      ))}
      <button onClick={() => handleCheckUncheckAll(true)}>Check All</button>
        <button onClick={() => handleCheckUncheckAll(false)}>Uncheck All</button>
    </div>
    {chartData.datasets.length > 0 && (
      <div className="chart-container">
        <h1>Driver Performance Over Years</h1>
        <Line options={chartOptions} data={chartData} />
      </div>
    )}
  </div>
  )
}

export default DriverDataComponent
