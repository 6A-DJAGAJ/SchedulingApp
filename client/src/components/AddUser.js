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
    //var ObjectID = require('mongodb').ObjectID;
    //var objectId = new ObjectID();
    // Send data to the server or update your stores and such.
    /*
  axios.post('http://localhost:3000/Users/', {
    _id: 'ObjectId("5dc9dd891c9d440000f92743")',
    name: "John Doe",//this.name,
    email: "JD@test.com",//this.email,
    position: "CEO",//this.position,
    salary: "100"//this.salary
  });
  alert("User created");
  */


 
 axios({
  method:'post',
  url:'http://localhost:3000/Users/create',
  data:{
    'name': document.getElementById("inputName").value,
    'email': document.getElementById("inputEmail").value,
    'position': document.getElementById("inputPosition").value,
    'salary': document.getElementById("inputSalary").value
  }
})
.then(res => {
  console.log(res.data);
})
.catch(function (error) {
  console.log(error);
});
}


    render() {
        return (
            <div class="add-user-component">
                <form class="text-center" name="user" onSubmit={this.handleSubmit}>
                <h1 class="h3 mb-3">New User</h1>
                    <label for="inputName" class="sr-only">Name</label>
                    <input type="text" id="inputName" class="form-control" placeholder="Name" />
                    <label for="inputEmail" class="sr-only">Email</label>
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email@domain" />
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" />
                    <label for="inputPosition" class="sr-only">Position</label>
                    <select id="inputPosition">
                      <option value="Director of Communications">Director of Communications</option>
                      <option value="CEO">CEO</option>
                      <option value="Director of Sales">Director of Sales</option>
                    </select>
                    <label for="inputSalary" class="sr-only">Salary</label>
                    <input type="text" id="inputSalary" class="form-control" placeholder="Salary" />
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
