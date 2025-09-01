
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import HomePage from './Components/Pages/HomePage'
import View from './Components/Pages/ViewPage'
import './App.css'

function App() {
   return(
      <BrowserRouter> 
        <Routes>
         <Route path='/'element={<HomePage/>}></Route>
         <Route path='/user/:username' element={<View/>}></Route>
        </Routes>
      </BrowserRouter>


   )
}

export default App
