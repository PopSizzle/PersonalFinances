import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Expenses from './Pages/Expenses';
import Home from './Pages/Home';
import Exercise from './Pages/Exercise';

function App() {
  return (
    <div className="App">
      
      <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/expenses'>Expenses</Link>
        </li>
        <li>
          <Link to='/exercise'>Exercise</Link>
        </li>
      </ul>
      </nav>
      
  
      <Routes>
      <Route path = '/' exact element={<Home/>} />
      <Route path = '/expenses' exact element={<Expenses/>} />
      <Route path = '/exercise' exact element={<Exercise/>} />
      </Routes>
      
    </div>
  );
}

export default App;
