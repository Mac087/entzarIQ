import React, { Component } from 'react';

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
     
  }

  render() {

    return (
      <div className="row mt-4">
      <div className="col-md-4">
        <button type="button" className="btn btn-outline-info" name="graphName" value="Intraday" onClick={this.props.func}>Intraday</button>
      </div>
      <div className="col-md-4">
        <button type="button" className="btn btn-outline-info" name="graphName" value="Weekly" onClick={this.props.func}>Weekly</button>
      </div>
      <div className="col-md-4">
        <button type="button" className="btn btn-outline-info" name="graphName" value="Monthly" onClick={this.props.func}>Monthly</button>
      </div>
    </div>
    );
  }
}

export default Bar;