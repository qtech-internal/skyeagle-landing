import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/site.css'
import DeleteAccount from '../pages/DeleteAccount'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeleteAccount />
  </StrictMode>,
)
