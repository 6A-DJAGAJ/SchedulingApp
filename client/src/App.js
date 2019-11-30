import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import './App.css';
import Scheduler from "./components/Scheduler";
import Login from "./components/Login/Login";
import { tsConstructorType } from '@babel/types';
import PinInput from './components/PinInput';
import AddUsers from './components/AddUser';





class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      appShow:<Login/>,
      show:'dash'
    }
  }
  updatePage(show) {
    console.log(show);
    switch(show){
        case 'dash':
          this.setState({
            appShow: <Login/>,
            show: show
          })
          break;
        case 'schedule':
          this.setState({
            appShow: <Scheduler/>,
            show: show
          })
          break;
        case 'tasks':
          break;
        case 'messages':
          break;
        case 'timedata':
          break;
        case 'timeclock':
            this.setState({
              appShow: <PinInput/>,
              show: show
            })
          break;
        case 'addUsers':
        this.setState({
          appShow: <AddUsers/>,
          show: show
        })
    }
  };
  render(){
    return (
      <div>
        <Header
          show={this.state.show}
          updatePage={this.updatePage.bind(this)}
        />

        {this.state.appShow}
      </div>
    );
  }
}

export default App;
