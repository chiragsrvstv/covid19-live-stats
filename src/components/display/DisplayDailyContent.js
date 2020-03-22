import React from "react";
import covidApi from "../../api/covidApi";

class DisplayDailyContent extends React.Component {
  state = { dailyConfirmed: "", dailyDeaths: "", dailyRecovered: "" };

  async componentDidMount() {
    const dailyDataResponse = await covidApi.get("/");
    if(dailyDataResponse.data) {
        this.setState({
        dailyConfirmed: dailyDataResponse.data.confirmed.value,
        dailyDeaths: dailyDataResponse.data.deaths.value,
        dailyRecovered: dailyDataResponse.data.recovered.value
      });
    } else {
    return (<div> Data Not Available </div>);
  }
  }

  render() {
    return (
      <div>
        <div> Confirmed: {this.state.dailyConfirmed} </div>
        <div> Deaths: {this.state.dailyDeaths} </div>
        <div> Recovered: {this.state.dailyRecovered} </div>
      </div>
    );
  }
}

export default DisplayDailyContent;
