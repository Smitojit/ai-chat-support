import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Tickets from './components/Tickets';
import './App.css';

function App(){
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Chat/>}/>
        <Route path="/tickets" element={<Tickets/>}/>
      </Routes>
    </Router>
  );
}

export default App;