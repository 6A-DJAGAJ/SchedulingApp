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
import DeleteUsers from './components/DeleteUser';
import EditUsers from './components/EditUser';
import axios from 'axios';
import { isPromiseAlike } from 'q';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      appShow:<Login/>,
      show:'dash',
      user:'',
      admin:''
    }
  }

  update(show) {
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
      break;
      case 'deleteUsers':
      this.setState({
        appShow: <DeleteUsers/>,
        show: show
      })
      break;
      case 'editUsers':
      this.setState({
        appShow: <EditUsers/>,
        show: show
      })
      break;
    }
  }

  checkUser(callback) {
    console.log('checking user');
    axios({
      method: 'get',
      url: '/Users/checkUser',
    })
    .then(res => {
        //console.log('user: ', res.data.user);
        this.setState({
          user: res.data.user,
          admin: res.data.admin
        })
    })
    callback();
  };

  updatePage(show) {
    this.checkUser(() => this.update(show))
  };


  render(){
    return (
      <div>
        <Header
          show={this.state.show}
          updatePage={this.updatePage.bind(this)}
          admin={this.state.admin}
        />

        {this.state.appShow}
      </div>
    );
  }
}

export default App;
