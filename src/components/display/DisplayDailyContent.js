import React from "react";
import covidApi from "../../api/covidApi";

class DisplayDailyContent extends React.Component {
  state = {
    dailyConfirmed: "",
    dailyDeaths: "",
    dailyRecovered: "",
    error: true
  };

  async componentDidMount() {
    // fetching daily data from the API and storing its result in state
    try {
      const dailyDataResponse = await covidApi.get("/");
      this.setState({
        dailyConfirmed: dailyDataResponse.data.confirmed.value,
        dailyDeaths: dailyDataResponse.data.deaths.value,
        dailyRecovered: dailyDataResponse.data.recovered.value,
        error: false
      });
    } catch (err) {
      this.setState({ error: err });
    }
  }

  render() {
    if (!this.state.error) {
      const affected = new Intl.NumberFormat().format(this.state.dailyConfirmed);
      const deaths = new Intl.NumberFormat().format(this.state.dailyDeaths);
      const recovered = new Intl.NumberFormat().format(this.state.dailyRecovered);
      return (
        <div>
          <div>
            Affected:
            {affected}
          </div>
          <div>
            Deaths: {deaths}
          </div>
          <div>
            Recovered:
            {recovered}
          </div>
        </div>
      );
    } else if (this.state.error) {
      return(
        <div> {this.state.error.message} </div>
      );
    }
    else {
      return <div> Loading Stats... </div>;
    }
  }
}

export default DisplayDailyContent;
