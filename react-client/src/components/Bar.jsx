import React, { Component } from 'react';

class Bar extends Component {
  constructor() {
    super();
    this.state = {
    
    };
  }

  componentDidMount() {
     
  }

  render() {

    return (
      <div className="row mt-4">
      <div className="col-md-4">
        <button type="button" className="btn btn-outline-info">Intraday</button>
      </div>
      <div className="col-md-4">
        <button type="button" className="btn btn-outline-info">Weekly</button>
      </div>
      <div className="col-md-4">
        <button type="button" className="btn btn-outline-info">Monthly</button>
      </div>
    </div>
    );
  }
}

export default Bar;