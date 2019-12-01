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
    this.pos = [];
    this.options = "";
    axios({
      method:'get',
      url:'http://localhost:3000/positions/list'
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        this.pos[i] = res.data[i].Position;
        console.log(this.pos[i]);
    }
      var select = document.getElementById("inputPosition"); 

      for(var i = 0; i < this.pos.length; i++) {
          var opt = this.pos[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          select.appendChild(el);
    }
    })
    .catch(function (error) {
      console.log(error);
    })

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
  document.getElementById("inputPassword").value === "" ||
  document.getElementById("inputPin").value === "") {
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
    'password': document.getElementById("inputPassword").value,
    'position': document.getElementById("inputPosition").value,
    'salary': document.getElementById("inputSalary").value
  }
})
.then(res => {
  console.log(res.data);

  axios({
    method:'get',
    url:'http://localhost:3000/Users/list'
  })
  .then(res => {
    var id = "";
    for (var i = 0; i < res.data.length; i++) {
      if(res.data[i].name === document.getElementById("inputName").value) {
        id = res.data[i]._id;
      }
  }
  //shouldn't happen ever
  if(id === "") {
    this.setState({
      display: true,
      modalText:"Error: User Not Deleted! Name Not Found"
  });
document.getElementById("inputName").value = "";
document.getElementById("inputEmail").value = "";
document.getElementById("inputPosition").value = "";
document.getElementById("inputSalary").value = "";
document.getElementById("inputPassword").value = "";
document.getElementById("inputPin").value = "";
  } else {
    console.log(id);
    axios({
      method:'post',
      url:'http://localhost:3000/uPins/create',
      data:{
        '_id': id,//'ObjectId("'+id+'")',
        'pinNum': document.getElementById("inputPin").value
      }
    })
    .then(res => {
      console.log(res.data);
      this.setState({
        display: true,
        modalText:"New User Successfully Created!"
    });
    })
    .catch(function (error) {
      console.log(error);
      this.setState({
        display: true,
        modalText:"Error: User Could Not Be Created (Pin Issue)!"
  });
    })
  }
document.getElementById("inputName").value = "";
document.getElementById("inputEmail").value = "";
document.getElementById("inputPosition").value = "";
document.getElementById("inputSalary").value = "";
document.getElementById("inputPassword").value = "";
document.getElementById("inputPin").value = "";
  })
  .catch(function (error) {
    console.log(error);
    this.setState({
      display: true,
      modalText:"Error: User Could Not Be Created (error listing users)!"
  });
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
                    <label for="inputPin" class="sr-only">Pin</label>
                    <input type="password" id="inputPin" class="form-control" placeholder="Pin" />
                    <label for="inputPosition" class="sr-only">Position</label>
                    <select id="inputPosition">
                      <option value="">Please select one</option>
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