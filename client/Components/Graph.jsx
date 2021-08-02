import React, { Component } from 'react';
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

class Graph extends Component {
  constructor(props) {
    super(props);
    this.weeks = this.weeks.bind(this);
    this.months = this.months.bind(this);

    this.state = {
      flag: false,
    };
  }

  weeks(event) {
    console.log('ASDASD');
    this.setState({ flag: true });
  }

  months(event) {
    this.setState({ flag: false });
  }

  render() {
    // testing
    // this.props.info.history;
    // this.props.info.curr2;
    // console.log(this.state.month);

    // console.log('this is this.state in render', this.state)
    const data = [];
    let week = [];
    for (let el in this.props.info.history) {
      data.push({
        date: el.slice(5),
        value:
          this.props.info.history[el][this.props.info.curr2] *
          this.props.info.value,
      });
    }
    week = data.slice(data.length - 7);
    //  this.setState({week: data.slice(data.length-8), month:data});
    //  console.log('happening in cDidMount', data);
    //  console.log('happening in cDidMount', this.state.month);
    if (this.state.flag) {
      return (
        <div className="build">
          <div className="wrapper2">
            <ResponsiveContainer width="90%" height={400}>
              <AreaChart data={week}>
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    {/* <stop offset="0%" stopColor="#00d8ff" stopOpacity={0.5} />
                  <stop offset="75%" stopColor="#00d8ff" stopOpacity={0.1} /> */}
                  </linearGradient>
                </defs>

                <Area
                  dataKey="value"
                  stroke="#00d8ff"
                  strokeWidth={3}
                  fill="url(#color)"
                />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={20}
                  angle={90}
                  height={50}
                />

                <YAxis
                  datakey="value"
                  tickLine={false}
                  tickCount={4}
                  domain={['auto', 'auto']}
                  // domain = {[dataMin=>(dataMin * .98), dataMax=>(dataMax* 1.02)]}
                  tickFormatter={(number) => `${number.toFixed(2)}`}
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
          <div className="butt">
            <button onClick={this.weeks}>Week</button>
            <button onClick={this.months}>Month</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="build">
          <div className="wrapper2">
            <ResponsiveContainer width="90%" height={400}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    {/* <stop offset="0%" stopColor="#00d8ff" stopOpacity={0.5} />
                  <stop offset="75%" stopColor="#00d8ff" stopOpacity={0.1} /> */}
                  </linearGradient>
                </defs>

                <Area
                  dataKey="value"
                  stroke="#00d8ff"
                  strokeWidth={3}
                  fill="url(#color)"
                />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={20}
                  angle={90}
                  height={50}
                />
                <YAxis
                  datakey="value"
                  tickLine={false}
                  tickCount={4}
                  domain={['auto', 'auto']}
                  // domain = {[dataMin=>(dataMin * .98), dataMax=>(dataMax* 1.02)]}
                  tickFormatter={(number) => `${number.toFixed(3)}`}
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
          <div className="butt">
            <button onClick={this.weeks}>Week</button>
            <button onClick={this.months}>Month</button>
          </div>
        </div>
      );
    }
  }
}

export default Graph;
