import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPastes from './components/ViewPastes'
import { Analytics } from "@vercel/analytics/react"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },

    {
      path: "/pastes",
      element:
      <div>
        <Navbar />
        <Paste />
      </div>
    },

    {
      path: "/pastes/:id",
      element:
      <div>
        <Navbar />
        <ViewPastes />
      </div>
    },

  ]
)

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
