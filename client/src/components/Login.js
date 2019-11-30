import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import Zoom from "./Zoom";
import '../Login.css';

class Login extends Component {

    render() {
        return (
            <div class="login-component text-center">
                <form class="text-center">
                    <img class="mb-4" src="https://imprintgenius.com/wp-content/uploads/2018/08/logo.png" alt="Imprint genius" data-height-percentage="65" data-actual-width="176" data-actual-height="113" />
                    <h1 class="h3 mb-3">Employee login</h1>
                    <label for="inputUsername" class="sr-only">Username</label>
                    <input type="text" id="inputUsername" class="form-control" placeholder="Username" />
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control mb-4" placeholder="Password" />
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        );
    }
}

export default Login;