import React, {Component} from 'react';
import axios from 'axios';
import './addUser.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

//Component used for admins to create new users on the web app

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
    //axios request to check list of positions at company
    axios({
      method:'get',
      url:'/positions/list'
    })
    //if axios request succeeds, take list of positions and create dropdown selects for form
    .then(res => {
      for (var i = 0; i < res.data.length; i++) {
        this.pos[i] = res.data[i].Position;
    }
      var select = document.getElementById("inputPosition"); 

      for(i = 0; i < this.pos.length; i++) {
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
//what happens when Modal popup closes
  handleClose = () => {
		var display = this.state.display
			display = false;
			this.setState({display});
	}
//handle submission of the form
  handleSubmit(event) {
    //prevent refresh of page
    event.preventDefault();
//if any parts of the form are empty, send error and don't do anything
if (document.getElementById("inputName").value === "" ||
  document.getElementById("inputEmail").value === "" ||
  document.getElementById("inputPosition").value === "" ||
  document.getElementById("inputSalary").value === "" ||
  document.getElementById("inputPassword").value === "" ||
  document.getElementById("inputPin").value === "" ||
  document.getElementById("inputAccess").value === "") {
    this.setState({
      display: true,
      modalText:"Error: New User Could Not Be Created! Values Cannot be Empty!"
  });
  //if no parts of form are empty, start working on request
  } else { 
    //get list of pins
    var pinCheck = "false";
    axios({
      method:'get',
      url:'/uPins/list'
    })
    //if request succeeds, continue
    .then(res => {
      //check if pin is already in use by another user
      for (var i = 0; i < res.data.length; i++) {
        if(document.getElementById("inputPin").value === res.data[i].pinNum) {
          pinCheck = "true";
        }
      }
      //if pin is in use, dont create new user
      if(pinCheck === "true") {
        this.setState({
          display: true,
          modalText:"Pin Already In Use! Please Enter Different Pin!"
      });
      }
      //if pin is not in use, continue
      else {
        //axios request to create new user with user input values
        axios({
          method:'post',
          url:'/Users/create',
          data:{
            'name': document.getElementById("inputName").value,
            'email': document.getElementById("inputEmail").value,
            'password': document.getElementById("inputPassword").value,
            'position': document.getElementById("inputPosition").value,
            'salary': document.getElementById("inputSalary").value,
            'admin': document.getElementById("inputAccess").value
          }
        })
        .then(res => {
          console.log(res.data);
        //pull list of users to get the id of the user just created
          axios({
            method:'get',
            url:'/Users/list'
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
          //clear form
        document.getElementById("inputName").value = "";
        document.getElementById("inputEmail").value = "";
        document.getElementById("inputPosition").value = "";
        document.getElementById("inputSalary").value = "";
        document.getElementById("inputPassword").value = "";
        document.getElementById("inputPin").value = "";
        document.getElementById("inputAccess").value = "";
          } else {
            //axios request to create a new pin based on user id
            axios({
              method:'post',
              url:'/uPins/create',
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
          //clear form
        document.getElementById("inputName").value = "";
        document.getElementById("inputEmail").value = "";
        document.getElementById("inputPosition").value = "";
        document.getElementById("inputSalary").value = "";
        document.getElementById("inputPassword").value = "";
        document.getElementById("inputPin").value = "";
        document.getElementById("inputAccess").value = "";
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
    })
    .catch(function (error) {
      console.log(error);
      this.setState({
        display: true,
        modalText:"Error: Could not check for pin duplicate!"
    });
    });

}


}

    render() {
        return (
          //Code for what Modal does
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
                //form to take user input
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
                      <option value="">Position: Please select one</option>
                    </select>
                    <label for="inputSalary" class="sr-only">Salary</label>
                    <input type="text" id="inputSalary" class="form-control" placeholder="Salary" />
                    <select id="inputAccess">
                      <option value="">Access: Is this User An Admin?</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    //button to submit form
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default addUser;
