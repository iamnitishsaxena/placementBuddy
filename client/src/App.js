import './App.css';
import Login from './components/account/login';
import Home from './components/home/home';
import DataProvider from './context/DataProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{margin: 64}}>  
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
          </Routes>                
        </div>
      </BrowserRouter>      
    </DataProvider>
  );
}

export default App;
