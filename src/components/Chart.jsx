import React, { useState } from 'react'

import styles from "./Chart.module.css"
import { convertData } from '../helpers/convertData';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

function Chart({ chart, setChart }) {
  
  const [type, setType] = useState("prices")


  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={() => setChart(null)}>X</span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} alt="" />
          <p>{chart.coin.name}</p>
        </div>
        <div className={styles.graph}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
      </div>
    </div>
  )
}

export default Chart

const ChartComponent = ({ data, type }) => {
  return <>
    <ResponsiveContainer width="100%" height="100%" >
      <LineChart width={400} height={400} data={data} >
        <Line type="monotone" dataKey={type} stroke='#3874ff' strokeWidth="2px" />
        <CartesianGrid stroke='#404042' />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey="date" hide />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  </>
}