import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Page from './Page.jsx'
import Error_Page from './components/Error_Page.jsx'
//import router เชื่อมต่อหน้าอื่นๆ
import { createBrowserRouter, RouterProvider,} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "Page",
    element: <Page/>,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
