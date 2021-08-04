import React, { Component } from 'react';
import { render } from 'react-dom';

class ChoiceBox extends Component {
  render() {
    const arr = [ //sorry blame Hasan's linter, can fix by requesting API and grabbing Object.keys. https://exchangeratesapi.io/documentation/ click Supported Symbols Endpoint on left
      'AED',
      'AFN',
      'ALL',
      'AMD',
      'ANG',
      'AOA',
      'ARS',
      'AUD',
      'AWG',
      'AZN',
      'BAM',
      'BBD',
      'BDT',
      'BGN',
      'BHD',
      'BIF',
      'BMD',
      'BND',
      'BOB',
      'BRL',
      'BSD',
      'BTC',
      'BTN',
      'BWP',
      'BYN',
      'BYR',
      'BZD',
      'CAD',
      'CDF',
      'CHF',
      'CLF',
      'CLP',
      'CNY',
      'COP',
      'CRC',
      'CUC',
      'CUP',
      'CVE',
      'CZK',
      'DJF',
      'DKK',
      'DOP',
      'DZD',
      'EGP',
      'ERN',
      'ETB',
      'EUR',
      'FJD',
      'FKP',
      'GBP',
      'GEL',
      'GGP',
      'GHS',
      'GIP',
      'GMD',
      'GNF',
      'GTQ',
      'GYD',
      'HKD',
      'HNL',
      'HRK',
      'HTG',
      'HUF',
      'IDR',
      'ILS',
      'IMP',
      'INR',
      'IQD',
      'IRR',
      'ISK',
      'JEP',
      'JMD',
      'JOD',
      'JPY',
      'KES',
      'KGS',
      'KHR',
      'KMF',
      'KPW',
      'KRW',
      'KWD',
      'KYD',
      'KZT',
      'LAK',
      'LBP',
      'LKR',
      'LRD',
      'LSL',
      'LTL',
      'LVL',
      'LYD',
      'MAD',
      'MDL',
      'MGA',
      'MKD',
      'MMK',
      'MNT',
      'MOP',
      'MRO',
      'MUR',
      'MVR',
      'MWK',
      'MXN',
      'MYR',
      'MZN',
      'NAD',
      'NGN',
      'NIO',
      'NOK',
      'NPR',
      'NZD',
      'OMR',
      'PAB',
      'PEN',
      'PGK',
      'PHP',
      'PKR',
      'PLN',
      'PYG',
      'QAR',
      'RON',
      'RSD',
      'RUB',
      'RWF',
      'SAR',
      'SBD',
      'SCR',
      'SDG',
      'SEK',
      'SGD',
      'SHP',
      'SLL',
      'SOS',
      'SRD',
      'STD',
      'SVC',
      'SYP',
      'SZL',
      'THB',
      'TJS',
      'TMT',
      'TND',
      'TOP',
      'TRY',
      'TTD',
      'TWD',
      'TZS',
      'UAH',
      'UGX',
      'USD',
      'UYU',
      'UZS',
      'VEF',
      'VND',
      'VUV',
      'WST',
      'XAF',
      'XAG',
      'XAU',
      'XCD',
      'XDR',
      'XOF',
      'XPF',
      'YER',
      'ZAR',
      'ZMK',
      'ZMW',
      'ZWL',
    ];
    const options = arr.map((el, i) => <option key={i}> {el} </option>); // data to fill dropdown menu with symbols
    
    const submitCurrency = () => {
      fetch('/user/add', {
        method: 'post',
        body: JSON.stringify({
          incoming_currency: this.props.info.curr1,
          target_currency: this.props.info.curr2,
          userId: 'test' //googleID
      })
    })
  }

    return (
      <>
        <div className="wrapper__ON_ChoiceBox_style">
          <div className="wrapper__ON_ChoiceBox">
            <div className="wrapperChoicebox">
              <div className="currency1">
                <label className="c1test">Currency 1</label>
                <select
                  value={this.props.info.curr1}
                  onChange={this.props.curr1Change}
                  required
                >
                  <option>Choose</option>
                  {options}
                </select>
              </div>
              <div className="currency2">
                <label className="c2test">Currency 2</label>
                <select
                  value={this.props.info.curr2}
                  onChange={this.props.curr2Change}
                  required
                >
                  <option>Choose</option>
                  {options}
                </select>
              </div>
            </div>
            <div className="wrapperInput">
              <input
                type="number"
                value={this.props.info.value}
                onChange={this.props.valueChange}
                className="inputAmount"
                placeholder="  Input your amount here" 
                required
              />
              <button
                type="submit"
                className="signup-btn"
                onClick={()=>console.log('hi')}
              />
            </div>
            <h2>{this.props.info.curr1} TAFFOVERTER HISTORY</h2>
          </div>
        </div>
      </>
    );
  }
}

export default ChoiceBox;
