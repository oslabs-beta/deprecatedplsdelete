import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Login from './User/Login.jsx';
import Signup from './User/Signup.jsx';
import ChoiceBox from './Components/ChoiceBox.jsx';
import Graph from './Components/Graph.jsx';
import Navigation from './Components/Navigation.jsx';
import ConversionBox from './Components/ConversionBox.jsx';

// design login/signup page hasan/shawn
// connect to router
// fix x&y axis
// style the page lucas

// After discussion & input from Mike, ISSUE IS:
// Back end is giving all data at once. Unless they can separate out functionality, state cannot be separated between graph and stateholder and must re-render on every single change.
// Else, we can BLOW UP state to hold ALL database for the user as well as current conversion rates & amounts. This would slow down the app significantly.

// | App
//   |Graph (Graph) (only accesses database?)
//   |StateHolder
//     |ConversionBox
//     |ChoiceBox

// hello fellow 27 iterators! I did the frontend more so it might be a little more commented. Feel free to message if any questions!
// basically what we didn't get to was:
  // the login and signup pages literally don't render. threw in oleksii.js at the last min, still didn't render. not sure if react router is necessary. issue is same as before all that was added
  // oauth, user accounts
  // database management: tracking each person's fav currencies and those over time. holding those in the database. please consider if the conversion to SQL might contribute very handily to these relations
  // oleksii & i tried for an evening converting to hooks, but scope of data was so small for today that we decided against it. if you expand, please consider!
  // compare against other investment trends ie stocks/crypto for starters
  // nesting the scss
  // naming divs usefully...
// other notes:
  // put the connection to DB within the models. nesting not ideal. recommend thinknig about RDBMS


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr1: '', //USD
      curr2: '', //EUR
      value: '', //your amount
      conversionRate: 2, //test rate, will be overwritten by state change
      converted: '',
      history: '', //your amount * conversionrate
    };
    this.curr1Change = this.curr1Change.bind(this);
    this.curr2Change = this.curr2Change.bind(this);
    this.valueChange = this.valueChange.bind(this);
  }

  curr1Change(event) {
    // goes to ChoiceBox
    // res.locals.history
    // res.locals.rate
    this.setState({ curr1: event.target.value });
  }

  curr2Change(event) {
    // goes to ChoiceBox
    this.setState({ curr2: event.target.value });
  }

  valueChange(event) {
    
    const x = Promise.resolve(this.setState({ value: event.target.value }));
    x.then(() => {
      axios
        .post('http://localhost:3000/currencyApi', {
          curr1: this.state.curr1,
          curr2: this.state.curr2,
        })
        .then((response) => {
          this.setState({ conversionRate: response.data.info.rate });
          this.setState({ history: response.data.history });
        })
        .catch((error) => {
          console.log('Value change error!!', error, ':(');
        });
    });
  }

  render() {
    return (
      <Router>
        <div className="header">
          <div className="topButtons">
            <div className="leftButtons">
              <Link to='/signup'>
                <button
                  className="signup-btn"
                  // onClick={(event) => {
                  //   console.log('trying to send you to singup');
                  //   console.log(this.state);
                  //   this.setState({ currentpage: 'signup' });}}
                >
                  {' '}
                  Signup{' '}
                </button>
              </Link>

              <Link to="/login">
                <button
                  className="login-btn"
                >
                  {' '}
                  Login{' '}
                </button>
              </Link>
            </div>
            <div className="rightButtons">
              <button>Learn More</button>
              <button>Contact Us</button>
            </div>
          </div>
          <div>
            <Link to="/">
            <h1>LUCAVERTER</h1>
            </Link>
          </div>
      </div>
            <Switch>
              <Route exact path="/">
                <ConversionBox info={this.state} />
                <ChoiceBox
                  info={this.state}
                  curr1Change={this.curr1Change}
                  curr2Change={this.curr2Change}
                  valueChange={this.valueChange}
                />
                <Graph info={this.state} />
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/signup">
                <Signup/>
              </Route>
            </Switch>
      </Router>
    );
  }
}

export default App;