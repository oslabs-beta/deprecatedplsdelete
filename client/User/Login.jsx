import React, { Component } from 'react';
import { render } from 'react-dom';

class Login extends Component {
  constructor () {
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
        <form method="POST" action="/login">
          <label> User Name: </label>
          <input type="text" className="username" onChange={(e) => this.setState({...this.state, username: e.target.value})}/>
          <label >Password</label>
          <input type="password" className="password" onChange={(e) => this.setState({...this.state, password: e.target.value})}/>
          <input type="submit" className="Login-btn" text="Login" />
        </form>
      </div>
    )
  }
}

export default Login;