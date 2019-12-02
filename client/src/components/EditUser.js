import React, {Component} from 'react';
import './addUser.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

var bcrypt = require('bcryptjs');

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
      axios({
        method:'get',
        url:'http://localhost:3000/Users/list'
      })
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.users[i] = res.data[i].name;
          this.ids[i] = res.data[i]._id;
          console.log(this.users[i]);
          console.log(this.ids[i]);
      }
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
    axios({
      method:'get',
      url:'http://localhost:3000/positions/list'
    })
    .then(res => {
      for (var i = 0; i < res.data.length; i++) {
        this.pos[i] = res.data[i].Position;
    }
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
        modalText:"Error: User must be selected to update!"
    });
    } else {
        if (document.getElementById("newName").value === "" &&
            document.getElementById("newEmail").value === "" &&
            document.getElementById("newPosition").value === "" &&
            document.getElementById("newSalary").value === "" &&
            document.getElementById("newPassword").value === "" &&
            document.getElementById("newPin").value === "") {
    this.setState({
      display: true,
      modalText:"Error: User Could Not Be Updated, No Values Changed!"
  });
        } else {
        var userChange;
        var userEdits = "{ ";
        var pw = document.getElementById("newPassword").value;
        var pwtemp = document.getElementById("newPassword").value;
        if(document.getElementById("newName").value !== "") {
            userEdits += '"name" : ' + "\"" + document.getElementById("newName").value + "\"" + ", ";
        }
        if(document.getElementById("newEmail").value !== "") {
            userEdits += '"email" : ' + "\"" + document.getElementById("newEmail").value + "\"" + ", ";
        }
        if(document.getElementById("newPosition").value !== "") {
            userEdits += '"position" : ' + "\"" + document.getElementById("newPosition").value + "\"" + ", ";
        }
        if(document.getElementById("newSalary").value !== "") {
            userEdits += '"salary" : ' + document.getElementById("newSalary").value + ", ";
        }
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
    
            if(document.getElementById("newPin").value !== "") {
                axios({
                    method:'put',
                    url:'http://localhost:3000/uPins/update',
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
                    document.getElementById("inputName").value = "";
                    document.getElementById("newName").value = "";
                    document.getElementById("newEmail").value = "";
                    document.getElementById("newPosition").value = "";
                    document.getElementById("newSalary").value = "";
                    document.getElementById("newPassword").value = "";
                    document.getElementById("newPin").value = "";
                  console.log(this.state.modalText);
                  })
                  .catch(function (error) {
                    console.log(error);
                    this.setState({
                      display: true,
                      modalText:"Error: Pin Could Not Be Updated!"
                });
                    document.getElementById("inputName").value = "";
                    document.getElementById("newName").value = "";
                    document.getElementById("newEmail").value = "";
                    document.getElementById("newPosition").value = "";
                    document.getElementById("newSalary").value = "";
                    document.getElementById("newPassword").value = "";
                    document.getElementById("newPin").value = "";
                console.log(this.state.modalText);
                  })
            }
            console.log("Edits: " + userEdits);
            if(userEdits !== "") {
                userChange = JSON.parse(userEdits);
                console.log(userChange);
                axios({
                    method:'put',
                    url:'http://localhost:3000/Users/update',
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
                    document.getElementById("inputName").value = "";
                    document.getElementById("newName").value = "";
                    document.getElementById("newEmail").value = "";
                    document.getElementById("newPosition").value = "";
                    document.getElementById("newSalary").value = "";
                    document.getElementById("newPassword").value = "";
                    document.getElementById("newPin").value = "";
                  console.log(this.state.modalText);
                  })
                  .catch(function (error) {
                    console.log(error);
                    this.setState({
                      display: true,
                      modalText:"Error: User Could Not Be Updated!"
                });
                    document.getElementById("inputName").value = "";
                    document.getElementById("newName").value = "";
                    document.getElementById("newEmail").value = "";
                    document.getElementById("newPosition").value = "";
                    document.getElementById("newSalary").value = "";
                    document.getElementById("newPassword").value = "";
                    document.getElementById("newPin").value = "";
                console.log(this.state.modalText);
                  })
            }
        }.bind(this));
/*
        if (userEdits[userEdits.length-2] === ',') {
            userEdits = userEdits.substring(0, userEdits.length-2) + " }";
        } else {
            userEdits = "";
        }

        if(document.getElementById("newPin").value !== "") {
            axios({
                method:'put',
                url:'http://localhost:3000/uPins/update',
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
              })
              .catch(function (error) {
                console.log(error);
                this.setState({
                  display: true,
                  modalText:"Error: Pin Could Not Be Updated!"
            });
              })
        }
        console.log("Edits: " + userEdits);
        if(userEdits !== "") {
            userChange = JSON.parse(userEdits);
            console.log(userChange);
            axios({
                method:'put',
                url:'http://localhost:3000/Users/update',
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
              })
              .catch(function (error) {
                console.log(error);
                this.setState({
                  display: true,
                  modalText:"Error: User Could Not Be Updated!"
            });
              })
        }
        */
        }
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
                          <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
                      </form>
              </div>
          );
      }
  }
  
  export default editUser;