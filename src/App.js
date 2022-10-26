import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Header from './Components/Header';
import { makeStyles } from '@mui/material/styles';
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'


function App() {
  const useStyles = {
      backgroundColor:"#14161a",
      color:"white",
      minHeight:"100vh",
    }


  return (
   <BrowserRouter>
   <div style={useStyles}>
    <Header />
    <Routes>
    <Route path="/" element={<HomePage />}/>
    <Route path="/coins/:id" element={<CoinPage />}/>
    </Routes>
    </div> 
  </BrowserRouter>
  );
}

export default App;
