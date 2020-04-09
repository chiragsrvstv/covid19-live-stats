import React from "react";
import covidApi2 from "../../api/covidApi2";

import CountrySelect from "../CountrySelect";

class DisplayContent extends React.Component {
  state = {
    confirmed: null,
    deaths: null,
    recovered: null,
    todayCases: "",
    todayDeaths: "",
    country: "IN",
    error: true,
  };

  // method to get selected country from countrySelect component(passed as a prop)
  onCountrySelect = (selectedCountry) => {
    this.setState({ country: selectedCountry });
  };

  // fetching data specific to a country and storing its result in state
  fetchCountryData() {
    covidApi2
      .get(`yesterday/${this.state.country}`)
      .then((response) => {
        this.setState({
          confirmed: response.data.cases,
          deaths: response.data.deaths,
          recovered: response.data.recovered,
          todayCases: response.data.todayCases,
          todayDeaths: response.data.todayDeaths,
          error: false,
        });
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  }

  componentDidMount() {
    this.fetchCountryData();
  }

  componentDidUpdate(prevProps, prevState) {
    // checking if the selected country data is not already rendered on the page.
    if (prevState.country !== this.state.country) {
      this.fetchCountryData();
    }
  }

  render() {
    if (!this.state.error) {
      const affected = new Intl.NumberFormat().format(this.state.confirmed);
      const deaths = new Intl.NumberFormat().format(this.state.deaths);
      const recovered = new Intl.NumberFormat().format(this.state.recovered);
      const todayDeaths = new Intl.NumberFormat().format(
        this.state.todayDeaths
      );
      const todayCases = new Intl.NumberFormat().format(this.state.todayCases);
      return (
        <div className="row hero-image">
          <div className="sixteen wide mobile ten wide tablet ten wide computer column">
            <CountrySelect
              className=""
              onCountrySelect={this.onCountrySelect}
              defaultCountry={this.state.country}
            />
          </div>

          <div className="country sixteen wide mobile eight wide tablet eight wide computer column cards-list">
            <div className="card country">
              <div className="card_image country_image">
                <video autoPlay muted loop playsInline className="card_image">
                  <source src="/smoky2.webm" type="video/webm" />
                  <source src="/smoky2.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="card_title title-white country summary">
                <h1 className="data-label">{affected} Affected</h1>
                <h1 className="data-label">{deaths} Died</h1>
                <h1 className="data-label">{recovered} Recovered</h1>
              </div>
            </div>{" "}
          </div>
          <div className="country sixteen wide mobile eight wide tablet eight wide computer column cards-list">
            <div className="card country">
              <div className="card_image country_image">
                <video autoPlay muted loop playsInline className="card_image">
                  <source src="/waves.webm" type="video/webm" />
                  <source src="/waves.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="card_title title-white country today ">
                <h1 className="data-label head"> Past 24 Hours </h1>
                <h1 className="data-label"> {todayCases} New Cases </h1>
                <h1 className="data-label"> {todayDeaths} Deaths</h1>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.error) {
      return (
        <div>
          <CountrySelect
            onCountrySelect={this.onCountrySelect}
            defaultCountry={this.state.country}
          />
          <div className="ui red header centered container">
            Data Not Yet Available...
          </div>
          <div></div>
        </div>
      );
    } else {
      return <div> Loading... </div>;
    }
  }
}

export default DisplayContent;
