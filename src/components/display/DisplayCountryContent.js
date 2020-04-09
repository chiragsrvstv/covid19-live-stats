import React from "react";
import covidApi from "../../api/covidApi";

import CountrySelect from "../CountrySelect";

class DisplayContent extends React.Component {
  state = {
    confirmed: null,
    deaths: null,
    recovered: null,
    country: "IN",
    error: true,
  };

  // method to get selected country from countrySelect component(passed as a prop)
  onCountrySelect = (selectedCountry) => {
    this.setState({ country: selectedCountry });
  };

  // fetching data specific to a country and storing its result in state
  fetchCountryData() {
    covidApi
      .get(`countries/${this.state.country}`)
      .then((response) => {
        this.setState({
          confirmed: response.data.confirmed.value,
          deaths: response.data.deaths.value,
          recovered: response.data.recovered.value,
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
      return (
        <div className="row hero-image">
          <div className="sixteen wide mobile ten wide tablet ten wide computer column">
            <CountrySelect
              className=""
              onCountrySelect={this.onCountrySelect}
              defaultCountry={this.state.country}
            />
          </div>

          <div className="country sixteen wide column cards-list">
            <div className="card country">
              <div className="card_image country_image">
                <video autoPlay muted loop playsInline className="card_image">
                  <source src="/smoky.webm" type="video/webm" />
                  <source src="/smoky.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="card_title title-white country">
                <h1 className="data-label">{affected} Affected</h1>
                <h1 className="data-label">{deaths} Died</h1>
                <h1 className="data-label">{recovered} Recovered</h1>
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
