import React, {Component} from 'react';
import '../Login.css';
import axios from 'axios';

class deleteUser extends Component {

    render() {
        return (
            <div class="delete-user-component text-center">
                <form class="text-center" onsubmit="event.preventDefault(); handleSubmit();">
                    <label>
                        Name:
                    <input type="text" v-model="user.name"/>
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
        name: ''
      }
    }
  },

  methods: {
    handleSubmit() {
      // Send data to the server or update your stores and such.
      axios.get('http://localhost:3000/Users/', {
        name: this.name,
      });
    alert("User created");
    }
  }
}