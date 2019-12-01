import React, {Component} from 'react';
import './addUser.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class deleteUser extends Component {

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

if (document.getElementById("inputName").value === "") {
    this.setState({
      display: true,
      modalText:"Error: User Not Deleted! Name Cannot be Empty!"
  });
  } else {

 axios({
  method:'get',
  url:'http://localhost:3000/Users/list'
})
.then(res => {
  console.log(res.data);
 
})
.catch(function (error) {
  console.log(error);
  this.setState({
    display: true,
    modalText:"Error: User Could Not Be Deleted!"
});
});

}

document.getElementById("inputName").value = "";

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
              <h1 class="h3 mb-3">Delete User</h1>
                  <label for="inputName" class="sr-only">Name</label>
                  <input type="text" id="inputName" class="form-control" placeholder="Name" />
                  <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
              </form>
            </div>
        );
    }
}

export default deleteUser;