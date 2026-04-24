import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import CoinContextProvider from './context/Coinscontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <CoinContextProvider>
      <App />

    </CoinContextProvider>
   
  </BrowserRouter>
 
  
   
  
)
