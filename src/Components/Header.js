import React from 'react'
import { CryptoState } from '../cryptoContext';

const Header = () => {
  const {currency,symbol, setCurrency} = CryptoState()
  console.log(currency, "and", symbol)
  return (
    <div className='navbar'>
      <div className="nav-container">
        <a href="/" className='header-title'>Crypto Hunter</a>
        <div className='custom-select'>
          <select name="language" id="lang" value={currency} onChange={(e)=>{setCurrency(e.target.value)}}>
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="TND">TND</option>
          </select>
        </div>
     </div>

    </div>
  )
}

export default Header;