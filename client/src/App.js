import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navbar.js';
import Router from './routes/Router';

class App extends Component {
  render() {
    return (
      <div>
         <Navigation />
         <Router />
       </div>
    );
  }
}

export default App;
