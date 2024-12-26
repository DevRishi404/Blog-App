import './App.css';
import Login from './components/auth/Login/Login';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/Register/SignUp';
import Home from './components/Home/Home';
import Navbar from './components/Shared/Navbar';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
