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
    // fetching daily data from the API
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
      return (
        <div>
          <div>
            Affected:
            {affected}
          </div>
          <div>
            Deaths: {new Intl.NumberFormat().format(
              this.state.dailyDeaths
            )}
          </div>
          <div>
            Recovered:
            {new Intl.NumberFormat().format(this.state.dailyRecovered)}
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
