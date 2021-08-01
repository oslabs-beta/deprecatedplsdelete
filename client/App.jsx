import React, { Component } from 'react';
import { render } from 'react-dom';
import { ResponsiveContainer, LineChart, Tooltip, AreaChart, Area, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { format, parseISO, subDays } from "date-fns";
import axios from 'axios';

const dummyData = []

| App
  |Toolbar
  |StateHolder
    |ConversionBox
    |ChoiceBox
    
class App extends Component {
   constructor(props){
    super(props);
    this.state = {
      curr1: '', //USD
      curr2: '', //EUR
      value: '', //your amount
      conversionRate: 2,
      converted: '' //your amount * conversionrate
    };
    this.curr1Change = this.curr1Change.bind(this);
    this.curr2Change = this.curr2Change.bind(this);
    this.valueChange = this.valueChange.bind(this);
  }

  curr1Change(event){
  // res.locals.history
  // res.locals.rate
  //
    this.setState({curr1: event.target.value});
   }
  curr2Change(event){
    this.setState({curr2: event.target.value});
  }
  valueChange(event){
    this.setState({value: event.target.value});
  }
  
  componentDidMount() {
  
  }

  
  componentDidUpdate() {
    axios.post('/api', { curr1:this.state.curr1, curr2: this.state.curr2 })
      .then(response => {
        console.log(response);
      }, (error) => {
        console.log(error);
      })
      .catch(error => {
        console.log(error.toJSON());
      })
    
  }

  render() {
     
    return (
      <>
        <ConversionBox info= {this.state} />
        <ChoiceBox info={this.state} curr1Change={this.curr1Change} curr2Change={this.curr2Change} valueChange={this.valueChange} />
        <Toolbar/>
      </>
    );
  }
}

class Header extends Component {

}

class Toolbar extends Component {
render() {
  const data=[];
  for(let num =30; num>=0; num--) {
     data.push({
         data: subDays(new Date(), num).toISOString().substr(0, 10),
         value: 1 + Math.random()
     });
  }
    return(
  
  <div className ="build">
  <div className ="butt">
  <button>Week</button>
  <button>Month</button>
  </div>
      <div className ="wrapper2">
       
        <ResponsiveContainer width={700} height={400}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />
                <XAxis dataKey="date"
                    tick={(str) => {
                      const date = parseISO(str);
                      if (date.getDate() % 7 === 0) {
                          return format(date, "MMM, d");
                      }
                      return "";
                    }}  
                />
                    <YAxis
                    datakey="value"
                    axisLine={false}
                    tickLine={false}
                    tickCount={8}
                    tickFormatter={(number) => `$${number.toFixed(2)}`}  />
              <Tooltip/>
           <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>

      </div>
      </div>
  );
  }
}

class ConversionBox extends Component {

  render() {
    return(
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
        <div className="Outputer"> {this.props.info.value * this.props.info.conversionRate} IN {this.props.info.curr2}</div>
      </div>

      </div>
    </>
  )}
}

class ChoiceBox extends Component {
  render() {
        const arr = [ 'ALL','AFN','ARS','AWG', 'AUD','AZN','BSD','BBD', 'BDT','BYR','BZD','BMD','BOB', 'BAM','BWP', 'BGN','BRL', 'BND', 'KHR', 'CAD', 'KYD', 'CLP', 'CNY', 'COP', 'CRC','HRK','CUP', 'CZK', 'DKK', 'DOP', 'XCD', 'EGP', 'SVC','EEK', 'EUR','FKP', 'FJD','GHC','GIP','GTQ','GGP','GYD','HNL','HKD','HUF','ISK','INR','IDR','IRR','IMP','ILS','JMD','JPY','JEP','KZT','KPW','KRW','KGS','LAK','LVL', 'LBP','LRD','LTL','MKD','MYR','MUR','MXN','MNT','MZN','NAD','NPR','ANG','NZD','NIO','NGN','NOK','OMR','PKR','PAB','PYG','PEN','PHP','PLN','QAR','RON','RUB','SHP','SAR','RSD','SCR','SGD','SBD','SOS','ZAR','LKR','SEK','CHF','SRD','SYP','TWD','THB','TTD','TRL','TVD','UAH','GBP','USD','UYU','UZS','VEF','VND','YER','ZWD'];
       const options = arr.map((el, i) => <option key={i}> {el} </option>);
    return(
      <>
        <div className="wrapper__ON_ChoiceBox_style">
        <div className="wrapper__ON_ChoiceBox">
        <div className="wrapperChoicebox" >
                <label className="c1test">Currency 1</label>
                <select value={this.props.info.curr1} onChange={this.props.curr1Change} required>
                <option>Choose...</option>
                {options}
                </select>
                <label  className="c2test">Currency 2</label>
                <select value={this.props.info.curr2} onChange={this.props.curr2Change} required>
                <option >Choose...</option>
                {options}
                </select>
        </div>
                <div className="wrapperInput">
                    <input  type="text" value={this.props.info.value} onChange={this.props.valueChange} className="inputAmount" placeholder="Input your amount here" required />
                </div>
        </div>
      </div>
      </>
  )}
}


export default App;
// COMPONENT LIST
  //1. head toolbar with logo, title, and login
  //2. conversion box
  //3. choice box, dropdowns to pick, labels
  //4. graph
