import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/Coinscontext.jsx'
import LineChart from '../../components/LineChart/LineChart.jsx'
import { getFromApi } from '../../lib/api.js'




const Coin = () => {




  const{coinId} = useParams();
  const [coinData, setCoinData] = useState();
  const [chartdata, setChartData] = useState();
  const {currency} = useContext(CoinContext);
  

  const fetchChartData = async () =>{
    try {
      const res = await getFromApi(`coins/${coinId}/market_chart`, {
        vs_currency: currency.name,
        days: "1",
      });
      setChartData(res);
    } catch (err) {
      console.error(err);
    }

  }

  const fetchCoinData = async () =>{
  try {
    const res = await getFromApi(`coins/${coinId}`);
    setCoinData(res);
  } catch (err) {
    console.error(err);
  }
  }

  useEffect(() =>{
    fetchCoinData();
    fetchChartData();
  },[])
  if(coinData && chartdata){
     return (
    <div className='coin'>
      <div className='coin-name'>
        <img src={coinData.image.large}/>
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>


      </div>
      <div className='coin-chart'>
        <LineChart chartdata={chartdata}/>
      </div>
    </div>
  )
  }else{
    return(
      <div className='spinner'>
        <div className='spin'>

        </div>

      </div>
    )
  }
 
}

export default Coin
