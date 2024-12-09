import { useState } from 'react';
import './App.css';
import Login from './components/account/login';
import Header from './components/header/Header';
import Home from './components/home/home';
import DataProvider from './context/DataProvider';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, ...props}) => {
  return isAuthenticated ?
  <>
    <Header />
    <Outlet />
  </>
  : <Navigate replace to='/login' />
}

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
       
        <div style={{margin: 64}}>  
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/' element={<Home />} />
            </Route>            
          </Routes>                
        </div>
      </BrowserRouter>      
    </DataProvider>
  );
}

export default App;
