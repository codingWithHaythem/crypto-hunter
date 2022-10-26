import React,{useEffect, useState} from 'react'
import { CryptoState } from '../cryptoContext';
import { HistoricalChart } from '../config/api';
import { createTheme, ThemeProvider } from '@mui/system';
import "../Pages/coinPage.css"
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {chartDays} from "../config/data.js"
import SelectButton from './SelectButton';

const CoinInfo = ({coin}) => {

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const {currency} = CryptoState();

  const fetchHistoricData = ()=>{
    const url = HistoricalChart(coin.id, days, currency)
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>setHistoricData(data.prices))
  }
  useEffect(()=>{
    fetchHistoricData()
  },[currency, days])

  console.log(historicData)

  const darkTheme = createTheme({
    palette:{
      primary:{
        main:"#fff"
      }
    },
    type:"dark"
  })

  return (
    <ThemeProvider theme={darkTheme}> 
    <div className='chartContainer'>
      {!historicData?(<CircularProgress style={{color:"gold"}} size={250} thickness={1}/>):(
        <>
        <Line
        data={{
          labels : historicData.map((coin)=>{
            let date = new Date(coin[0])
            let time =
            date.getHours()>12
            ? `${date.getHours()-12} : ${date.getMinutes()}`
            : `${date.getHours()} : ${date.getMinutes()} AM`

            return days ===1 ?time : date.toLocaleDateString()
          }),

          datasets:[
            {data: historicData.map((coin)=>coin[1]),
              label:`Price (past ${days} days) in ${currency}`,
              borderColor:"#EEBC1D"
            
            }
          ]
        }}
        options={{
          elements:{
            point:{
              radius:1,
            }
          }
        }}
        />
        <div className='buttonContainer'>
        {chartDays.map(day=>(
           <SelectButton 
           key={day.value}
           onClick={()=>setDays(day.value)}
          //  selected = {day.value === days}
           >
            
           <button>{day.label}</button> 
            </SelectButton>
        )
          
        )}
        </div>
        </>
      )}
    </div>
    </ThemeProvider>
  )
}

export default CoinInfo