import './App.css';
import { Route, Routes } from 'react-router';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='*' element={<h1>No route found</h1>} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
