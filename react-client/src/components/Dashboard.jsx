import React, { Component } from 'react';
import axios from 'axios';
const AA = require('../../../config/keys').AlphaAdv;
import Graph from './Graph.jsx';
import Board from './Board.jsx';
import Bar from './Bar.jsx';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      search: '',
      bestMatches: [],
      selection: false,
      searchExecuted: false,
      symbol: '',
      name: '',
      type: '',
      region: '',
      marketOpen: '',
      marketClose: '',
      timezone: '',
      currency: '',
      graphName: 'Intraday',
      graphTime: [],
      graphPrice: [],
      tablePreviousPrices: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.searchList = this.searchList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBarEvent = this.handleBarEvent.bind(this);

  }

  componentDidMount() {
    axios.get('/api/users/current')
      .then(res => {
        this.setState({firstName: res.data.firstName, lastName: res.data.lastName});
      })
      .catch(err => console.log(err));
  }
  // onDeleteClick(e) {
  //   this.props.deleteAccount();
  // }

  queryBuilder(graphType, symbol) {

    let queryType, queryInterval, objProp, interval;

    if(graphType === 'Intraday') {
      queryType = 'TIME_SERIES_INTRADAY';
      queryInterval = '5min';
      objProp = 'Time Series (5min)';
      interval = '&interval=';
    }

    if(graphType === 'Weekly') {
      queryType = 'TIME_SERIES_WEEKLY';
      objProp = 'Weekly Time Series';
      queryInterval = '';
      interval = '';
    }

    if(graphType === 'Monthly') {
      queryType = 'TIME_SERIES_MONTHLY';
      objProp = 'Monthly Time Series';
      queryInterval = '';
      interval = '';
    }

    return {
      query: `https://www.alphavantage.co/query?function=${queryType}&symbol=${symbol + interval + queryInterval}&apikey=${AA}`,
      objProp: objProp
    }
    
    
  }

  onChange(e) {
    this.setState({ selection: false });
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const queryType = 'SYMBOL_SEARCH';
    const query = `https://www.alphavantage.co/query?function=${queryType}&keywords=${this.state.search}&apikey=${AA}`;

    axios.get(query)
        .then(res => {
          this.setState({ bestMatches: res.data.bestMatches, searchExecuted: true});
        })
        .catch(err =>console.log(err));
    
  }

  handleClick(e) {
    e.preventDefault();
    const i = e.target.value
    const bestMatches = this.state.bestMatches;
    const symbol = bestMatches[i]['1. symbol'];
    this.setState({ 
      searchExecuted: false,
      symbol: bestMatches[i]['1. symbol'],
      name: bestMatches[i]['2. name'],
      type: bestMatches[i]['3. type'],
      region: bestMatches[i]['4. region'],
      marketOpen: bestMatches[i]['5. marketOpen'],
      marketClose: bestMatches[i]['6. marketClose'],
      timezone: bestMatches[i]['7. timezone'],
      currency: bestMatches[i]['8. currency']
    });

    let query = this.queryBuilder('Intraday', symbol)

    console.log(query);

    axios.get(query.query)
        .then(res => {
          this.handleData(res.data[query.objProp]);
        })
        .catch(err =>console.log(err));
  }

  searchList() {
    const companyList = this.state.bestMatches
    const listItems = companyList.map((co, i) => 
    <li className="list-group-item btn" key={co['1. symbol']} onClick={this.handleClick} value={i} >{ co['1. symbol'] + ' - ' + co['2. name'] }</li>
    );
    return (
      <ul className="list-group list-group-flush">
        {listItems}
      </ul>
    );
  }

  handleData(data, graphName = 'Intraday') {
    console.log('graph name ', graphName, ' - handle data ', data);
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    } 
    if(mm<10) {
        mm = '0'+mm
    } 
    today = yyyy + '-' + mm + '-' + dd;

    let timesArray = [];
    let closePriceArr = [];
    let previousCloseArr = [];

    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        if(graphName === 'Intraday') {
            let dateKey = prop.slice(0,10);
            if(dateKey === today){
              timesArray.push('Time: ' + prop.slice(11, 16));
              closePriceArr.push(parseFloat(data[prop]['4. close'], 10));
            } 
            if(dateKey !== today){
              previousCloseArr.push(parseFloat(data[prop]['4. close'], 10));
            } 
        } else {
          timesArray.push('Date: ' + prop);
          closePriceArr.push(parseFloat(data[prop]['4. close'], 10));
        }
      }
    }

    timesArray.reverse();
    closePriceArr.reverse();
    previousCloseArr.reverse();

   

    this.setState({ graphTime: timesArray, graphPrice: closePriceArr, tablePreviousPrices: previousCloseArr});
    this.setState({ selection: true });
  }

  handleBarEvent(e) {

    let temp = e.target.value;
  
    e.preventDefault();

    if(this.state.graphName !== e.target.value) {

    this.setState({ [e.target.name]: e.target.value, selection: false });

    console.log('e target value: ', e.target.value);
    console.log('symbol for query: ', this.state.symbol);

    let query = this.queryBuilder(temp, this.state.symbol);

    console.log(query.query);

    axios.get(query.query)
        .then(res => {
          this.handleData(res.data[query.objProp], temp);
          console.log(res.data[query.objProp]);
        })
        .catch(err =>console.log(err));
    
    }
    
  }

  render() {
   
    return (
      <div className="dashboard">
        <div className="container">

          <div className="row">
            <div className="col-md-8">
              <form noValidate onSubmit={this.onSubmit} className="form-inline">
                <div className="form-group">
                  <input placeholder="Symbol or Company Name" className="form-control" name="search" value={this.state.search} onChange={this.onChange}></input>
                </div>
                <input type="submit" className="btn btn-info ml-2" />
              </form>
              {/* <form className="form-inline active-cyan-4">
                  <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search" aria-label="Search"></input>
                  <i className="fa fa-search" aria-hidden="true" type="submit"></i>
              </form>
              */}
            </div>

            {/* <div className="col-md-4">
            </div> */}

            <div className="col-md-4">
              <p className="lead text-muted">Welcome {this.state.firstName} {this.state.lastName}</p>
            </div>
          </div>

          <div className="row">
           <div className="col-md-4">
            {this.state.searchExecuted ? this.searchList(): ''}
           </div>
          </div>
          
          {/* display graph and metrics on the side */}
          <div className="row graph">
            <div className="col-md-6">
              {this.state.selection ?  <Graph times={this.state.graphTime} prices={this.state.graphPrice} company={this.state.name + ' (' + this.state.symbol + ')' + ' - ' + this.state.graphName}/> : ''}
            </div>

            <div className="col-md-1">
            </div>

            <div className="col-md-5">
             {this.state.selection ? <Board close={this.state.graphPrice} previous={this.state.tablePreviousPrices} name={this.state.name} symbol={this.state.symbol}/> : ''}
            </div>
          </div>

          {this.state.selection ? <Bar func={this.handleBarEvent}/> : ''}

        </div>
      </div>
    );
  }
  
}

export default Dashboard;
