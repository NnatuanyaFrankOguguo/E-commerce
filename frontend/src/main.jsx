import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './Context/Storecontext.jsx'

// our main main frontend APP.jsx that contains all the component will be placed in the main.jsx file here we will put he browserRouter here
// while in the APP.jsx where all the components will be place we will put the routes
createRoot(document.getElementById('root')).render(
    
  <BrowserRouter>
    <StoreContextProvider>
        <App />
    </StoreContextProvider> 
  </BrowserRouter>,
)
