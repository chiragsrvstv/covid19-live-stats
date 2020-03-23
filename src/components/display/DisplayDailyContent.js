import React from "react";
import covidApi from "../../api/covidApi";

class DisplayDailyContent extends React.Component {
  state = { dailyConfirmed: "", dailyDeaths: "", dailyRecovered: "", error: true };

  async componentDidMount() {
    const dailyDataResponse = await covidApi.get("/");
    if(dailyDataResponse.data) {
        this.setState({
        dailyConfirmed: dailyDataResponse.data.confirmed.value,
        dailyDeaths: dailyDataResponse.data.deaths.value,
        dailyRecovered: dailyDataResponse.data.recovered.value,
        error: false
      });
    } else {
      return (<div> Data Not Available </div>);
    }
  }

  render() {
    if(!this.state.error) {
      return (
        <div>
          <div> Affected: {new Intl.NumberFormat().format(this.state.dailyConfirmed)} </div>
          <div> Deaths: {new Intl.NumberFormat().format(this.state.dailyDeaths)} </div>
          <div> Recovered: {new Intl.NumberFormat().format(this.state.dailyRecovered)} </div>
        </div>
      );
    } else {
      return <div> Loading Stats... </div>;

    }

  }
}

export default DisplayDailyContent;
