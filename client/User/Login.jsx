import React, { Component } from 'react';
import { render } from 'react-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
require('regenerator-runtime/runtime')

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      accessToken: '',
      username: '',
      password: '',
      isLoggedIn: false,
      failedLogin: false, 
    };
    this.responseGoogle = this.responseGoogle.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin(googleData) {
    const res = await axios({
      method: "post",
      url: "/auth/google",
      data: { token: googleData.accessToken, id: googleData.googleId }
    });
    
  }
    // const data = await res.json() // may come back as json already
    // console.log("returned user data", data);

    // { accessToken, googleId
    // response.

  // can handle pushing data to the backend here - with some changes
  // async handleLogin(googleData) {
  //   const res = await fetch("/api/v1/auth/google", {
  //   method: "POST",
  //   body: JSON.stringify({
  //   token: googleData.tokenId
  //     }),
  //       headers: {
  //     "Content-Type": "application/json"
  //   }
  // })
  // const data = await res.json()
  // console.log("returned user data", data);
  // // store returned user somehow
  // }

  responseGoogle = (response) => {
    console.log("triggering now");
    this.setState( {accessToken: response.accessToken });
    console.log('response access token',response.accessToken);
    console.log('full googleId', response.googleId);
    console.log('full response obj', response);
    console.log(this.state);
    
  }

  
  render() {
    return (
      <div>
        <GoogleLogin
        clientId="689937676919-hqbq0jspagnb2003k5qp25melhte9t0c.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={this.handleLogin}
        onFailure={()=> window.location.href = "/login"}
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
};

export default Login;