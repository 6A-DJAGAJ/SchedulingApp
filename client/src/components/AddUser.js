import React, {Component} from 'react';
import axios from 'axios';
import './addUser.css';

class addUser extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var ObjectID = require('mongodb').ObjectID;
    var objectId = new ObjectID();
    // Send data to the server or update your stores and such.
  axios.post('http://localhost:3000/Users/', {
    _id: objectId,
    name: this.name,
    email: this.email,
    position: "CEO",//this.position,
    salary: this.salary
  });
  alert("User created");
}


    render() {
        return (
            <div class="add-user-component">
                <form class="text-center" onSubmit={this.handleSubmit}>
                <h1 class="h3 mb-3">New User</h1>
                    <label for="inputName" class="sr-only">Name</label>
                    <input type="text" id="inputName" class="form-control" placeholder="Name" v-model="user.name"/>
                    <label for="inputEmail" class="sr-only">Email</label>
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email@domain" v-model="user.email"/>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="user.password"/>
                    <label for="inputPosition" class="sr-only">Position</label>
                    <select v-model="selected" for="inputPosition" class="sr-only">
                      <option disabled value="">Please select one</option>
                      <option>"Director of Communications"</option>
                      <option>"CEO"</option>
                      <option>"Director of Sales"</option>
                    </select>
                    <label for="inputSalary" class="sr-only">Salary</label>
                    <input type="text" id="inputSalary" class="form-control" placeholder="Salary" v-model="user.salary"/>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default addUser;
/*{
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
  */
