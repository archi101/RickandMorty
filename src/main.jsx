import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReactQueryDevtoolsPanel } from 'react-query-devtools'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ReactQueryDevtoolsPanel initialIsOpen={false}/> */}
    <App />
  </StrictMode>,
)
//<ReactQueryDevtoolsPanel initialIsOpen={false}/>