import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from 'recharts'; // exampleLine built out under Tooltip see line136
import { format, parseISO, subDays } from 'date-fns';
import axios from 'axios';

// After discussion & input from Mike, ISSUE IS:
// Back end is giving all data at once. Unless they can separate out functionality, state cannot be separated between graph and stateholder and must re-render on every single change.
// Else, we can BLOW UP state to hold ALL database for the user as well as current conversion rates & amounts. This would slow down the app significantly.

// | App
//   |Graph (Graph) (only accesses database?)
//   |StateHolder
//     |ConversionBox
//     |ChoiceBox

// TO DO SUN/MON:
// build stateholder
// convert everything to hooks
// extra features
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr1: '', //USD
      curr2: '', //EUR
      value: '', //your amount
      conversionRate: 2,
      converted: '', //your amount * conversionrate
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
    // goes to ChoiceBox
    // this.setState({ value: event.target.value });
    
    // setTimeout (()=> {axios.post('http://localhost:3000/currencyApi', {
    //       curr1: this.state.curr1,
    //       curr2: this.state.curr2,
    //     })
    //     .then((response) => {
    //       console.log(response.data.info);
    //       this.setState({ conversionRate: response.data.info });

    //     })
    //     .catch((error) => {
    //       console.log('Value change error!!', error, ':(');
    //     })
    //   }, 0);

    const x = Promise.resolve(this.setState({ value: event.target.value }));
    x
    .then((()=> {axios.post('http://localhost:3000/currencyApi', {
      curr1: this.state.curr1,
      curr2: this.state.curr2,
    })
    .then((response) => {
      console.log(response);
      this.setState({ conversionRate: response.data.rate.info });

    })
    .catch((error) => {
      console.log('Value change error!!', error, ':(');
    })
  }));
  }

  componentDidMount() {}

  //to fetch all data?
  componentDidUpdate() {

      
  }

  render() {
    return (
      <>
        <ConversionBox info={this.state} />
        <ChoiceBox
          info={this.state}
          curr1Change={this.curr1Change}
          curr2Change={this.curr2Change}
          valueChange={this.valueChange}
        />
        <Graph />
      </>
    );
  }
}

// state is held
class StateHolder extends Component {
  // hold ConversionBox and ChoiceBox here
  // state will hold
}

class Graph extends Component {
  render() {
    // testing
    const data = [];
    for (let num = 30; num >= 0; num--) {
      data.push({
        date: subDays(new Date(), num).toISOString().substr(0, 10),
        value: 1 + Math.random(),
      });
    }
    return (
      <div className="build">
        <div className="butt">
          <button>Week</button>
          <button>Month</button>
        </div>
        <div className="wrapper2">
          <ResponsiveContainer width="90%" height={400}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2451B8" stopOpacity={0.5} />
                  <stop offset="75%" stopColor="#2451B8" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

              <XAxis
                dataKey="date"
                tickLine={false}
                // tick={(str) => {
                //   const date = parseISO(str);
                //   if (date.getDate() % 7 === 0) {
                //       return format(date, "MMM, d");
                //   }
                //   return "";
                // }}  // TICK WILL NOW WORK but
              />
              <YAxis
                datakey="value"
                tickLine={false}
                tickCount={6}
                tickFormatter={(number) => `$${number.toFixed(2)}`}
              />
              <Tooltip />
              {/* <Line type="monotone" dataKey="bitcoin" stroke="#82ca9d"/> //if given 1+ point of comparison */}
              <CartesianGrid
                opacity={0.1}
                vertical={false}
                strokeDasharray="3 3"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

class ConversionBox extends Component {
  render() {
    return (
      <>
        <div className="wrapper">
          <div className="Inner_wrapper">
            <div className="amountToConvert">
              {/* amt & curr1 to convert */}
              <label className="">Your amount</label>
              <div className=""> {this.props.info.value}</div>
            </div>

            <div className="CurrToConvert">
              {/* amt & curr1 to convert */}
              <label className="">Your input currency</label>
              <div className=""> {this.props.info.curr1}</div>
            </div>
          </div>

          <div className="convertedAmount">
            <label className=""></label>
            <div className="Outputer">
              {' '}
              {(this.props.info.value * this.props.info.conversionRate.rate).toFixed(2)} IN{' '}
              {this.props.info.curr2}
            </div>
          </div>
        </div>
      </>
    );
  }
}

class ChoiceBox extends Component {
  render() {
    const arr = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTC', 'BTN', 'BWP', 'BYN', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMK', 'ZMW', 'ZWL']
    const options = arr.map((el, i) => <option key={i}> {el} </option>);
    return (
      <>
        <div className="wrapper__ON_ChoiceBox_style">
          <div className="wrapper__ON_ChoiceBox">
            <div className="wrapperChoicebox">
              <label className="c1test">Currency 1</label>
              <select
                value={this.props.info.curr1}
                onChange={this.props.curr1Change}
                required
              >
                <option>Choose...</option>
                {options}
              </select>
              <label className="c2test">Currency 2</label>
              <select
                value={this.props.info.curr2}
                onChange={this.props.curr2Change}
                required
              >
                <option>Choose...</option>
                {options}
              </select>
            </div>
            <div className="wrapperInput">
              <input
                type="text"
                value={this.props.info.value}
                onChange={this.props.valueChange}
                className="inputAmount"
                placeholder="Input your amount here"
                required
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
// COMPONENT LIST
//1. head Graph with logo, title, and login
//2. conversion box
//3. choice box, dropdowns to pick, labels
//4. graph

// in case OAuth
//   Client ID
//   832758037832-v87s2h5cbuvt557o5tsbkkid1a9pcnud.apps.googleusercontent.com
//   Client Secret
//   9A3rS_Ky-MhsCTE2Q0FS8b6K
