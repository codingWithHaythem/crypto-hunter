import React, { useState, useEffect } from 'react'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../cryptoContext'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

const Carousel = () => {
    const [trending, setTrending]= useState([])
    const carousel = {
        height: "50%",
        display: "flex",
        alignItems: "center",
    }
    const carouselItem={
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        cursor: "pointer",
        textTransform:"uppercase",
        color:"white",
        fontSize: "1.2rem"
    }

    const numberWithComas = (price)=>{
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const { currency, symbol }= CryptoState();


    const fetchTrendingCoins =async ()=>{
        const { data }= await axios.get(TrendingCoins(currency))
        setTrending(data)
    }
    console.log(trending)
        useEffect(()=>{
            fetchTrendingCoins();
        },[currency]
        );
    const items = trending.map((coin)=>{
        const profit = coin.price_change_percentage_24h >= 0;
        return(
            <Link style={carouselItem} to= {`/coins/${coin.id}`}>
                <img 
                src={coin.image}
                alt={coin.name}
                height="80"
                style={{marginTop:60}}
                />
                <span style={{marginTop:10}}>
                    {coin.symbol}
                    &nbsp;
                    <span style={{color: profit>0 ? "rgb(14, 203, 129)": "red", fontWeight: 500}}>

                    {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}
                    </span>
                </span>
                <span style={{fontSize:22,fontWeight:500}}>
                    {symbol} {numberWithComas(coin.current_price.toFixed(2))}

                </span>



            </Link>
        )
    })
    const responsive={
        0:{
            items :2,
        },
        512:{
            items: 4,
        }
    }
  return (
    <div style={carousel}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsive}
        autoPlay
        disableDotsControls
        disableButtonsControls
        items={items}
        />

    </div>
  )
}

export default Carousel