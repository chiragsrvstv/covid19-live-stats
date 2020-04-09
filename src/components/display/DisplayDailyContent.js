import React from "react";
import covidApi from "../../api/covidApi";

class DisplayDailyContent extends React.Component {
  state = {
    dailyConfirmed: "",
    dailyDeaths: "",
    dailyRecovered: "",
    error: true,
  };

  async componentDidMount() {
    // fetching daily data from the API and storing its result in state
    try {
      const dailyDataResponse = await covidApi.get("/");
      this.setState({
        dailyConfirmed: dailyDataResponse.data.confirmed.value,
        dailyDeaths: dailyDataResponse.data.deaths.value,
        dailyRecovered: dailyDataResponse.data.recovered.value,
        error: false,
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
                  <video autoPlay muted loop playsInline className="card_image">
                    <source src="/bacteria.webm" type="video/webm" />
                    <source src="/bacteria.mp4" type="video/mp4" />
                  </video>
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
                  <video autoPlay muted loop playsInline className="card_image">
                    <source src="/cloud.webm" type="video/webm" />
                    <source src="/cloud.mp4" type="video/mp4" />
                  </video>
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
                  <video autoPlay muted loop playsInline className="card_image">
                    <source src="/heal.webm" type="video/webm" />
                    <source src="/heal.mp4" type="video/mp4" />
                  </video>
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
      return (
        <div className="ui active dimmer">
          <div className="ui huge text loader">
            {this.state.error.message}, Loading !
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui active dimmer">
          <div className="ui text loader"> Loading... </div>
        </div>
      );
    }
  }
}

export default DisplayDailyContent;
