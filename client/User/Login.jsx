import React, { Component } from 'react';
import { render } from 'react-dom';
import { GoogleLogin } from 'react-google-login';

class Login extends Component {
  // constructor () {
  //   this.state = {
  //     username: '',
  //     password: '',
  //     isLoggedIn: false,
  //     failedLogin: false, 
  //   };
  // }

  render() {
    return (
      
      <div>
        <h1>Here's the login page</h1> 
          <GoogleLogin
          clientId=""
          buttonText="Login with Google"
          // onSuccess={responseGoogle}
          // onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
        {/* <form method="POST" action="/login">
          <label> User Name: </label>
          <input type="text" className="username" onChange={(e) => this.setState({...this.state, username: e.target.value})}/>
          <label >Password</label>
          <input type="password" className="password" onChange={(e) => this.setState({...this.state, password: e.target.value})}/>
          <input type="submit" className="Login-btn" text="Login" />
        </form> */}
      </div>
    );
  }
}

export default Login;