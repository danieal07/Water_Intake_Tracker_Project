import Dashboard from './components/Dashboard.jsx'
import Signup from './components/Signup'
import Main from './components/Main.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx'

function App() {
   
    
  return (
    <>
     <BrowserRouter>
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
