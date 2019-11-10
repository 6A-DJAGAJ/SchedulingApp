import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import './App.css';
import Scheduler from "./components/Scheduler";
import 'bootstrap/dist/css/bootstrap.min.css';

//const express = require('../server/config/express.js')


const App = () => {
  return (
      <div>
        <Header/>
        <Scheduler/>
      </div>
    
  );
}

export default App;
