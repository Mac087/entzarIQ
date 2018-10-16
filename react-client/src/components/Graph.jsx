import React, { Component } from "react";
import Chart from "react-apexcharts";

class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "Stock Time Series"
        },
        xaxis: {
          categories: this.props.times,
          labels: {
            show: false
          }
        },
        title: {
          text: this.props.company,
          align: 'center',
          margin: 5,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '16px',
            color:  '#263238'
          }
        }
      },
      series: [
        {
          name: "Closing Price",
          data: this.props.prices
        }
      ]
    };
  }
  

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="550"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;