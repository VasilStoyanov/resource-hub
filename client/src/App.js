import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar.js';
import Router from './routes/Router';

class App extends Component {
  render() {
    return (
      <div>
         <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
         <Navbar />
         <Router />
       </div>
    );
  }
}

export default App;
