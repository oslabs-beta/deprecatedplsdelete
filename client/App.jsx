import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr1: '', //USD
      curr2: '', //EUR
      value: '', //your amount
      conversionRate: 2, //test rate, will be overwritten by 
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
      <>
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" />
              <Route path="/login" render={() => <Login />} />
              <Route path="/signup" render={() => <Signup />} />
            </Switch>
          </BrowserRouter>
        </div>
        <Navigation />
        <ConversionBox info={this.state} />
        <ChoiceBox
          info={this.state}
          curr1Change={this.curr1Change}
          curr2Change={this.curr2Change}
          valueChange={this.valueChange}
        />
        <Graph info={this.state} />
      </>
    );
  }
}

export default App;