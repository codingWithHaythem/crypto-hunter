import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { CoinList } from '../config/api'
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, LinearProgress, Pagination} from '@mui/material';
import { CryptoState } from '../cryptoContext'
import Typography from '@mui/material/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import  "./CoinsTable.css"
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';


const CoinsTable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    const {currency, symbol} = CryptoState()

    const fetchCoins = async ()=>{
        setLoading(true)
        const {data} = await axios.get(CoinList(currency))
        setCoins(data);
        setLoading(false);
    }

    useEffect ( ()=>{
        fetchCoins()
    },[currency])

    const handleSearch = ()=>{
      return(
        coins.filter((coin)=>{
          if(search ===""){
            return true
          }
          else{
           return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search) 
          }
        }
        )
      )
    }

    console.log("handle: ",handleSearch())

     const numberWithComas = (price)=>{
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

  
    console.log(coins)
    const theme= createTheme({
      palette:{
        primary:{
          main:"#fff",
        },
        type:"dark",
      }
    })
  return (
    <ThemeProvider theme={theme}>
 
      <Container style={{textAlign: "center"}}>
        <Typography variant='h4' style={{margin:18, fontFamily: "Montserrat"}}>
        Cryptocurrency Prices by Market Cap
        </Typography>
     <TextField className="textField" onChange={(e)=>setSearch(e.target.value)} label="Search For a Crypto Currency .." variant='outlined'/>
     <div>
      {/* <input style={{background:"none", color: "white", height: "30px", border: "1px solid white", width: "100%"}} type={search}/> */}
     </div>
    <TableContainer >
      {loading ? (
      <LinearProgress style={{backgroundColor: "gold"}}/>

      ):(
        
      <Table >
        <TableHead style={{backgroundColor:"#EEBC1D"}}>
          <TableRow>
            {["Coin", "Price", "24th Change", "Market Cap"].map((head)=>(
              <TableCell
              style={{
                color: "black",
                fontWeight: "700",
                fontFamily: "Montserrat"
              }}
              key= {head}
              align={head === "Coin" ? "" : "right"}
              >{head}</TableCell>
              
              ))}
           
          </TableRow>
        </TableHead>
        <TableBody>
          {handleSearch().slice((page-1)*10, (page-1)*10+10).map((row)=>{
            const profit = row.price_change_percentage_24h > 0;
          

              return(
            <TableRow onClick={()=>navigate(`/coins/${row.id}`)} className="rows" key={row.name}>
              <TableCell component="th" scope="row" style={{display:"flex", gap:15, color:"white"}} >
                 <img src={row.image} alt={row.name} height="50" style={{marginBottom: 10}}/>
                 <div style={{display:"flex", flexDirection:"column"}}>

                 <span style={{textTransform:"uppercase", fontSize:"1.3em" }}>{row.symbol}</span>
                 <span>{row.name}</span> 
                 </div>
                 
              </TableCell>
              <TableCell align='right' style={{color:"white"}}>
                {symbol} {numberWithComas(row.current_price.toFixed(2))}
              </TableCell>
          
              <TableCell align='right' style={{color: profit > 0 ? "green" : "red", fontWeight:600}}>
                {profit && "+"} {numberWithComas(row.price_change_percentage_24h.toFixed(2))}%
              </TableCell>
          
              <TableCell align='right' style={{color:"white"}}>
                {symbol} {numberWithComas(row.market_cap.toString().slice(0,-6))}M
              </TableCell>
          
            </TableRow>);
          })}
        </TableBody>
      </Table>
      )}
    </TableContainer>
    <Pagination
    className='pag'
    color='warning'
    onChange={(_,value)=>{setPage(value);window.scroll(0,450)}}
    count={(handleSearch()?.length/10).toFixed(0)}
    />
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable