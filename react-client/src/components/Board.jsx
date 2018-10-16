import React, { Component } from 'react';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      mainPrice: '',
      prevClose: '',
      openPrice: '',
      priceRange: '',
      diff: ''
    };
  }

  componentDidMount() {
     //Find Latest Close and diff with prvious close
     let lastClose = Math.round(this.props.close.slice(-1)[0] * 100) / 100;
     let previousClose = Math.round(this.props.previous.slice(-1)[0] * 100) / 100;
     let diff = Math.round((lastClose - previousClose) * 100) / 100;
     diff = diff < 0 ? diff + '' : '+' + diff;
   //Find Previous Close

   //Find Open
     let open = Math.round(this.props.close[0] * 100) / 100;
   //Find Days Range
     let dayRange = open + '-' + lastClose;

     this.setState({ mainPrice: lastClose, prevClose: previousClose, openPrice: open, priceRange: dayRange, diff: diff});

  }

  render() {

    return (
      <table className="table">
              <thead>
                <tr>
                  <th scope="col">{this.props.name + ' (' + this.props.symbol + ')'}</th>
                  <th>{'      '}</th>
                  <th scope="col"><span className="font-weight-bold">{this.state.mainPrice + ' '}</span><span className="text-success">{this.state.diff}</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Previous Close</td>
                  <td>{'      '}</td>
                  <td><span className="font-weight-bold">{this.state.prevClose}</span></td>
                </tr>
                <tr>
                  <td>Open</td>
                  <td>{'      '}</td>
                  <td><span className="font-weight-bold">{this.state.openPrice}</span></td>
                </tr>
                <tr>
                  <td>Days Range</td>
                  <td>{'      '}</td>
                  <td><span className="font-weight-bold">{this.state.priceRange}</span></td>
                </tr>
              </tbody>
        </table>
    );
  }
}

export default Board;