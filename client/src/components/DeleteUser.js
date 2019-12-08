import React, {Component} from 'react';
import './addUser.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

//Component used for admins to delete users on the web app

class deleteUser extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      display : false,
      modalText: ""
    };
  }
//handle close of Modal popup
  handleClose = () => {
		var display = this.state.display
			display = false;
			this.setState({display});
  }
  //handle submission of form
  handleSubmit(event) {
    //prevent page from refreshing on submit
    event.preventDefault();
//if name is empty error out and do nothing
if (document.getElementById("inputName").value === "") {
    this.setState({
      display: true,
      modalText:"Error: User Not Deleted! Name Cannot be Empty!"
  });
  } else {
//if name is entered, get list of users
 axios({
  method:'get',
  url:'/Users/list'
})
.then(res => {
  var id = "";
  //find input name in user list
  for (var i = 0; i < res.data.length; i++) {
    if(res.data[i].name === document.getElementById("inputName").value) {
      id = res.data[i]._id;
    }
}
//error out if user is not found
if(id === "") {
  this.setState({
    display: true,
    modalText:"Error: User Not Deleted! Name Not Found"
});
//clear form
document.getElementById("inputName").value = "";
} else {
  //axios request to delete user based on id
  axios({
    method:'delete',
    url:'/Users/delete',
    data:{
      '_id': id
    }
  })
  .then(res => {
    //axios request to delete user pin based on id
    axios({
      method:'delete',
      url:'/uPins/delete',
      data:{
        '_id': id
      }
    })
    .then(res => {
      this.setState({
        display: true,
        modalText:"User Successfully Deleted!"
  });
    })
    .catch(function (error) {
      console.log(error);
      this.setState({
        display: true,
        modalText:"Error: User Could Not Be Deleted!(Pin issue)"
  });
    })

  })
  .catch(function (error) {
    console.log(error);
    this.setState({
      display: true,
      modalText:"Error: User Could Not Be Deleted!(User issue)"
});
  })
  document.getElementById("inputName").value = "";
}
})
.catch(function (error) {
  console.log(error);
  this.setState({
    display: true,
    modalText:"Error: User Could Not Be Deleted!"
});
});

}

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
