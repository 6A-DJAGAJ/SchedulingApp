import React, {Component} from 'react';
import './addUser.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

var bcrypt = require('bcryptjs');

//Component used for admins to edit users on the web app

class editUser extends Component {

    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        display : false,
        modalText: ""
      };
      this.users = [];
      this.ids = [];
      //get list of users
      axios({
        method:'get',
        url:'/Users/list'
      })
      .then(res => {
        //take in user names and ids
        for (var i = 0; i < res.data.length; i++) {
          this.users[i] = res.data[i].name;
          this.ids[i] = res.data[i]._id;
      }
      //create select options for names in form 
        var select = document.getElementById("inputName"); 
  
        for(i = 0; i < this.users.length; i++) {
            var tC = this.users[i];
            var val = this.ids[i];
            var el = document.createElement("option");
            el.textContent = tC;
            el.value = val;
            select.appendChild(el);
      }
      })
      .catch(function (error) {
        console.log(error);
      })
  
    this.pos = [];
    //get list of positons
    axios({
      method:'get',
      url:'/positions/list'
    })
    //take in positions
    .then(res => {
      for (var i = 0; i < res.data.length; i++) {
        this.pos[i] = res.data[i].Position;
    }
    //create select options for positons in form
      var select2 = document.getElementById("newPosition"); 

      for(i = 0; i < this.pos.length; i++) {
          var opt = this.pos[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          select2.appendChild(el);
    }
    })
    .catch(function (error) {
      console.log(error);
    })

    }
  //handle close of Modal popup
    handleClose = () => {
          var display = this.state.display
              display = false;
              this.setState({display});
    }
    //handle submission of form
    handleSubmit(event) {
      //prevent refresh of page on form submit
      event.preventDefault();
  //if no user selected
  if (document.getElementById("inputName").value === "") {
      this.setState({
        display: true,
        modalText:"Error: User must be selected to update!"
    });
    } else {
      //if all forms are empty, error out
        if (document.getElementById("newName").value === "" &&
            document.getElementById("newEmail").value === "" &&
            document.getElementById("newPosition").value === "" &&
            document.getElementById("newSalary").value === "" &&
            document.getElementById("newPassword").value === "" &&
            document.getElementById("newPin").value === "" &&
            document.getElementById("inputAccess").value === "") {
    this.setState({
      display: true,
      modalText:"Error: User Could Not Be Updated, No Values Changed!"
  });
        } else {
          var pinCheck = "false";
          //get list of pins
    axios({
      method:'get',
      url:'/uPins/list'
    })
    //check if new pin being requested is already in use, error out if it is
    .then(res => {
      for (var i = 0; i < res.data.length; i++) {
        if(document.getElementById("newPin").value === res.data[i].pinNum) {
          pinCheck = "true";
        }
      }
      if(pinCheck === "true") {
        this.setState({
          display: true,
          modalText:"Pin Already In Use! Please Enter Different Pin!"
      });
      }
      else {
        var userChange;
        var userEdits = "{ ";
        var pw = document.getElementById("newPassword").value;
        var pwtemp = document.getElementById("newPassword").value;
        //if name entered, add name to string for request
        if(document.getElementById("newName").value !== "") {
            userEdits += '"name" : ' + "\"" + document.getElementById("newName").value + "\"" + ", ";
        }
        //if email entered, add email to string for request
        if(document.getElementById("newEmail").value !== "") {
            userEdits += '"email" : ' + "\"" + document.getElementById("newEmail").value + "\"" + ", ";
        }
        //if position entered, add position to string for request
        if(document.getElementById("newPosition").value !== "") {
            userEdits += '"position" : ' + "\"" + document.getElementById("newPosition").value + "\"" + ", ";
        }
        //if salary entered, add salary to string for request
        if(document.getElementById("newSalary").value !== "") {
            userEdits += '"salary" : ' + document.getElementById("newSalary").value + ", ";
        }
        //if admin access entered, add admin access to string for request
        if(document.getElementById("inputAccess").value !== "") {
          userEdits += '"admin" : ' + document.getElementById("inputAccess").value + ", ";
      }
      //if password entered, encrypt password and add to string for request
        if(document.getElementById("newPassword").value !== "") {
            bcrypt.hash(pw, 10).then(function(hash) {
                pw = hash;
                userEdits += '"password" : ' + "\"" + pw + "\"" + ", ";
                console.log(pw);
            });
        }

        bcrypt.hash(pwtemp, 10).then(function(hash) {
            pwtemp = hash;
            if (userEdits[userEdits.length-2] === ',') {
                userEdits = userEdits.substring(0, userEdits.length-2) + " }";
            } else {
                userEdits = "";
            }
    //if new pin entered, submit request to update
            if(document.getElementById("newPin").value !== "") {
                axios({
                    method:'put',
                    url:'/uPins/update',
                    data:{
                      '_id': document.getElementById("inputName").value,//'ObjectId("'+id+'")',
                      'pinNum': document.getElementById("newPin").value
                    }
                  })
                  .then(res => {
                    console.log(res.data);
                    this.setState({
                        display: true,
                        modalText:"User Successfully Updated!"
                  });
                  //clear form
                    document.getElementById("inputName").value = "";
                    document.getElementById("newName").value = "";
                    document.getElementById("newEmail").value = "";
                    document.getElementById("newPosition").value = "";
                    document.getElementById("newSalary").value = "";
                    document.getElementById("newPassword").value = "";
                    document.getElementById("newPin").value = "";
                    document.getElementById("inputAccess").value = "";
                  })
                  .catch(function (error) {
                    console.log(error);
                    this.setState({
                      display: true,
                      modalText:"Error: Pin Could Not Be Updated!"
                });
                //clear form
                    document.getElementById("inputName").value = "";
                    document.getElementById("newName").value = "";
                    document.getElementById("newEmail").value = "";
                    document.getElementById("newPosition").value = "";
                    document.getElementById("newSalary").value = "";
                    document.getElementById("newPassword").value = "";
                    document.getElementById("newPin").value = "";
                    document.getElementById("inputAccess").value = "";
                  })
            }
            //if edits to user, submit request
            if(userEdits !== "") {
                userChange = JSON.parse(userEdits);
                console.log(userChange);
                axios({
                    method:'put',
                    url:'/Users/update',
                    data:{
                      '_id': document.getElementById("inputName").value,//'ObjectId("'+id+'")',
                      'changes': userChange
                    }
                  })
                  .then(res => {
                    console.log(res.data);
                    this.setState({
                        display: true,
                        modalText:"User Successfully Updated!"
                  });
                  //clear forms
                    document.getElementById("inputName").value = "";
                    document.getElementById("newName").value = "";
                    document.getElementById("newEmail").value = "";
                    document.getElementById("newPosition").value = "";
                    document.getElementById("newSalary").value = "";
                    document.getElementById("newPassword").value = "";
                    document.getElementById("newPin").value = "";
                    document.getElementById("inputAccess").value = "";
                  console.log(this.state.modalText);
                  })
                  .catch(function (error) {
                    console.log(error);
                    this.setState({
                      display: true,
                      modalText:"Error: User Could Not Be Updated!"
                });
                //clear form
                    document.getElementById("inputName").value = "";
                    document.getElementById("newName").value = "";
                    document.getElementById("newEmail").value = "";
                    document.getElementById("newPosition").value = "";
                    document.getElementById("newSalary").value = "";
                    document.getElementById("newPassword").value = "";
                    document.getElementById("newPin").value = "";
                    document.getElementById("inputAccess").value = "";
                console.log(this.state.modalText);
                  })
            }
        }.bind(this))
        
      }
      
        }).catch(function (error) {
          console.log(error);
          this.setState({
            display: true,
            modalText:"Error: Could not check for pin duplicate!"
        });
        }.bind(this));
  }
  
  }
}
  
      render() {
          return (
            //render Modal
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
                      //form for user input
                      <form class="text-center" name="user" onSubmit={this.handleSubmit}>
                      <h1 class="h3 mb-3">Edit User</h1>
                          <label for="inputName" class="sr-only">Name</label>
                          <select id="inputName">
                            <option value="">Please Select User To Edit</option>
                          </select>
                          <label for="newName" class="sr-only">New Name</label>
                          <input type="text" id="newName" class="form-control" placeholder="Enter New Name" />
                          <label for="newEmail" class="sr-only">New Email</label>
                          <input type="email" id="newEmail" class="form-control" placeholder="Enter New Email" />
                          <label for="newPassword" class="sr-only">New Password</label>
                          <input type="password" id="newPassword" class="form-control" placeholder="Enter New Password" />
                          <label for="newPin" class="sr-only">New Pin</label>
                          <input type="password" id="newPin" class="form-control" placeholder="Enter New Pin" />
                          <label for="newPosition" class="sr-only">New Position</label>
                          <select id="newPosition">
                            <option value="">Please Select New Position</option>
                          </select>
                          <label for="newSalary" class="sr-only">New Salary</label>
                          <input type="text" id="newSalary" class="form-control" placeholder="Enter New Salary" />
                          <select id="inputAccess">
                            <option value="">New Access Level</option>
                            <option value="true">Admin</option>
                            <option value="false">Regular User</option>
                          </select>
                          <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
                      </form>
              </div>
          );
      }
  }
  
  export default editUser;
