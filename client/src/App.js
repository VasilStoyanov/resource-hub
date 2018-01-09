import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Navigation from './components/navigation/Navbar.js';
import Router from './routes/Router';

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
         <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
         <Navigation />
         <Router />
       </div>
    );
  }
}

export default App;
