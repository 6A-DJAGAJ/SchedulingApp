import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import './App.css';
import Scheduler from "./components/Scheduler";
import Login from "./components/Login"

const App = () => {
  return (
    <div>
      <Scheduler />
    </div>
  );
}

export default App;
