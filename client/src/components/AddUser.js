import React, {Component} from 'react';
import axios from 'axios';
import './addUser.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class addUser extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      display : false,
      modalText: ""
    };
  }

  handleClose = () => {
		var display = this.state.display
			display = false;
			this.setState({display});
	}

  handleSubmit(event) {
    event.preventDefault();

if (document.getElementById("inputName").value === "" ||
  document.getElementById("inputEmail").value === "" ||
  document.getElementById("inputPosition").value === "" ||
  document.getElementById("inputSalary").value === "" ||
  document.getElementById("inputPassword").value === "") {
    this.setState({
      display: true,
      modalText:"Error: New User Could Not Be Created! Values Cannot be Empty!"
  });
  } else {

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
  this.setState({
    display: true,
    modalText:"New User Created!"
  });
})
.catch(function (error) {
  console.log(error);
  this.setState({
    display: true,
    modalText:"Error: New User Could Not Be Created!"
});
});

}



document.getElementById("inputName").value = "";
document.getElementById("inputEmail").value = "";
document.getElementById("inputPosition").value = "";
document.getElementById("inputSalary").value = "";
document.getElementById("inputPassword").value = "";

}

    render() {
        return (
            <div class="add-user-component">
              <Modal show={this.state.display} onHide={this.handleClose}>
				        <Modal.Header closeButton>
					        <Modal.Title>Hello</Modal.Title>
				        </Modal.Header>
				        <Modal.Body>{this.state.modalText}</Modal.Body>
				        <Modal.Footer>
					        <Button variant="secondary" onClick={this.handleClose}>
						        Close
					        </Button>
				        </Modal.Footer>
			          </Modal>
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
                      <option value="">Please select one</option>
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
