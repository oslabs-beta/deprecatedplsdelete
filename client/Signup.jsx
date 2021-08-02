import React, { Component } from 'react';
import { render } from 'react-dom';

class Signup extends Component {
  constructor () {
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
        <form method="POST" action="/signup">
          <label> User Name: </label>
          <input type="text" className="username" onChange={(e) => this.setState({...this.state, username: e.target.value})}/>
          <label >Password</label>
          <input type="text" className="password" onChange={(e) => this.setState({...this.state, password: e.target.value})}/>
          <input type="submit" className="Signup-btn" text="Signup" />
        </form>
      </div>
    )
  }
}

export default Signup;