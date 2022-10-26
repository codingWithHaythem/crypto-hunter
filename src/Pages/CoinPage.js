import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { CryptoState } from '../cryptoContext';
import "./coinPage.css"
import HTMLReactParser from 'html-react-parser';
import { LinearProgress} from '@mui/material';
import CoinInfo from '../Components/CoinInfo';


const CoinPage = () => {
  const {id} = useParams();

  const [coin, setCoin] = useState({});
  const [splite, setSplite] = useState([])
  const [market, setMaket] = useState({});
  const [image, setImage] = useState({})
  const [description, setDescription] = useState({})
  const {currency, symbol} = CryptoState();

  const fetchCoin = ()=>{
    const url = SingleCoin(id)
     fetch(url)
    .then((response)=>response.json())
    .then((data)=>{setCoin(data);setImage(data.image);setDescription(data.description);setSplite(data.description.en.split(". ")[0]);setMaket(data.market_data.current_price)})
  }

  useEffect(()=>{
    fetchCoin();
    
  },[currency])

   const numberWithComas = (price)=>{
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


 console.log(coin)
//  console.log(market.current_price[currency])
    if (!coin.image) return <LinearProgress style={{backgroundColor: "gold"}}/>;
    if (!coin.market_data) return <LinearProgress style={{backgroundColor: "gold"}}/>;
  return (
    <div className='container'>
      <div className='sidebar'>
       <img src={coin.image.large}
       alt={coin.name}
       height="200"
       style={{margin:"10px"}}
       />
       <h1 className='name'>{coin.name}</h1>
      {/* <span className='descrip'>{HTMLReactParser(`${description.en}`)}</span> */}
      <span className='descrip'>{HTMLReactParser(`${splite}`)}</span>
      <div className='marketData'>

      <h2>Rank: <span>{coin.market_cap_rank}</span></h2>
      <h2>Current Price: <span>{symbol} {numberWithComas(coin?.market_data.current_price[currency.toLowerCase()])}</span></h2>
      <h2>Market Cap: <span>{symbol} {numberWithComas(coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M</span></h2>
      </div>
      </div>
      <CoinInfo coin = {coin}/>
    </div>
  )
}

export default CoinPage