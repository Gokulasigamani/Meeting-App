import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Error from './Pages/Error'
import AddMeeting from './Pages/AddMeeting'

function App() {
  

  return (
    <>
      







          <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='*' element={<Error/>} />
                <Route path='/meet' element={<AddMeeting/>} />
          </Routes>
      
    </>
  )
}

export default App
