import React, { Component } from 'react';
import { render } from 'react-dom';
import Login from '../User/Login.jsx';
import Signup from '../User/Signup.jsx';

class Navigation extends Component {
  render() {
    return (
      <div className="header">
        <div className="topButtons">
          <div className="leftButtons">
            <button
              className="signup-btn"
              // onClick={(event) => (window.location.href = '/signup')}
            >
              {' '}
              Signup{' '}
            </button>
            <button
              className="login-btn"
              // onClick={(event) => (window.location.href = '/login')}
            >
              {' '}
              Login{' '}
            </button>
          </div>
          <div className="rightButtons">
            <button>Learn More</button>
            <button>Contact Us</button>
          </div>
        </div>
        <div>
          <h1>LUCAVERTER</h1>
        </div>
      </div>
    );
  }
}

export default Navigation;
