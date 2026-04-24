import React, { useEffect } from 'react'
import { useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({chartdata}) => {
    const [data,setData] = useState([["Dates","Prices"]])

    useEffect(() =>{
        let datacopy = [["Dates","Prices"]];
        if(chartdata.prices){
            chartdata.prices.map((item) =>{
                datacopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
            })
            setData(datacopy);
        }


    },[chartdata])



  return (
    <div>
      <Chart
      chartType='LineChart'
      data={data}
      height='100%'
      legendToggle
      />
    </div>
  )
}

export default LineChart
