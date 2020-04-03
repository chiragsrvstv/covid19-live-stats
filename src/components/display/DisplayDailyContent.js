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
      const affected = new Intl.NumberFormat().format(
        this.state.dailyConfirmed
      );
      const deaths = new Intl.NumberFormat().format(this.state.dailyDeaths);
      const recovered = new Intl.NumberFormat().format(
        this.state.dailyRecovered
      );
      return (
        <div className="row">
          <h1 className="sixteen wide centered column"> Global Cases </h1>
          <div className="cards-list">
            <div className="five wide mobile eight wide tablet five wide computer column">
              <div className="card 2">
                <div className="card_image">
                  {" "}
                  <img
                    src="https://media.giphy.com/media/kaIVrG4k2YfooOOcYE/giphy.gif"
                    alt="affected"
                  />{" "}
                </div>
                <div className="card_title title-white">
                  <h1 className="data-label">{affected}</h1>{" "}
                  <h1 className="data-label">Affected</h1>
                </div>
              </div>
            </div>
            <div className="sixteen wide mobile eight wide tablet five wide computer column">
              <div className="card 2">
                <div className="card_image">
                  {" "}
                  <img
                    src="https://media.giphy.com/media/EEFEyXLO9E0YE/giphy.gif"
                    alt="deaths"
                  />{" "}
                </div>
                <div className="card_title title-white">
                  <h1 className="data-label">{deaths}</h1>{" "}
                  <h1 className="data-label">Deaths</h1>
                </div>
              </div>
            </div>
            <div className="sixteen wide mobile eight wide tablet five wide computer column">
              <div className="card 2">
                <div className="card_image">
                  {" "}
                  <img
                    src="https://media.giphy.com/media/xThtaxm8RQ5koMKKxW/giphy.gif"
                    alt="recovered"
                  />{" "}
                </div>
                <div className="card_title title-white">
                  <h1 className="data-label">{recovered}</h1>{" "}
                  <h1 className="data-label">Recovered</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.error) {
      return <div> {this.state.error.message} </div>;
    } else {
      return <div className="ui loading segment"> Loading Stats... </div>;
    }
  }
}

export default DisplayDailyContent;
