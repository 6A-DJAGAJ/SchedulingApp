import React, {Component} from 'react';
import '../Login.css';
import axios from 'axios';

class addUser extends Component {

    render() {
        return (
            <div class="add-user-component text-center">
                <form class="text-center" onsubmit="event.preventDefault(); handleSubmit();">
                    <label>
                        Name:
                <       input type="text" v-model="user.name"/>
                    </label>
                    <label>
                        Email:
                        <input type="email" v-model="user.email"/>
                    </label>
                    <label>
                    Password:
                    <input type="password" v-model="user.password"/>
                    </label>
                    <label>
                        Position:
                        <select v-model="selected">
                            <option disabled value="">Please select one</option>
                            <option>"Director of Communications"</option>
                            <option>"CEO"</option>
                            <option>"Director of Sales"</option>
                        </select>
                    </label>
                    <label>
                        Salary:
                        <input type="text" v-model="user.salary"/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        position: '',
        salary: ''
      }
    }
  },

  methods: {
    handleSubmit() {
      // Send data to the server or update your stores and such.
      axios.post('http://localhost:3000/Users/', {
        name: this.name,
        email: this.email,
        position: this.position,
        salary: this.salary
      });
    alert("User created");
    }
  }
}