import React from 'react'
import Carousel from './carousel'


function Banner() {
    const myStyle = {
        backgroundImage:"url(./banner2.jpg)",
         height:400,
         display:"flex",
         flexDirection: "column",
         paddingTop: 25,
         justifyContent: "space-around",
    }
    const tagline = {
        color: "white",
        marginBottom: 15,
        fontFamily: "Montserrat",
        textAlign: "center",
        fontSize: "3rem",
    }
  return (
    <div style={myStyle}>
        <div style={tagline}>
           <h2> Crypto Hunter</h2>
           <p style={{fontSize:"1rem",fontWeight:"100",opacity:"0.8"}}>Get All The Info Regarging Your Favorite Crypto Currency</p>
           <Carousel/>
          
        </div>
    </div> 
  )
}

export default Banner