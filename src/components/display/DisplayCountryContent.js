import React from "react";
import covidApi from "../../api/covidApi";

import CountrySelect from "../CountrySelect";

class DisplayContent extends React.Component {
  state = {
    confirmed: null,
    deaths: null,
    recovered: null,
    country: "IN",
    error: true
  };

  onCountrySelect = selectedCountry => {
    this.setState({ country: selectedCountry });
  };


  fetchCountryData() {
    covidApi
      .get(`countries/${this.state.country}`)
      .then(response => {
        this.setState({
          confirmed: response.data.confirmed.value,
          deaths: response.data.deaths.value,
          recovered: response.data.recovered.value,
          error: false
        });
      })
      .catch(err => this.setState({ error: err }));
  }

  componentDidMount() {
    this.fetchCountryData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.country !== this.state.country && !this.state.error) {
      this.fetchCountryData();
    }
  }

  render() {
    if (!this.state.error) {
      return (
        <div>
          <div>Affected: {this.state.confirmed}</div>
          <div>Deaths: {this.state.deaths}</div>
          <div>Recovered: {this.state.recovered}</div>
          <CountrySelect onCountrySelect={this.onCountrySelect} />
        </div>
      );
    } else if (
      this.state.error == "Error: Request failed with status code 404"
    ) {
      return (
        <div>
          <CountrySelect onCountrySelect={this.onCountrySelect} />
          // load a modal here
          <div> Data Not Yet Available </div>

        </div>
      );
    } else {
      return <div> Loading </div>;
    }
  }
}

export default DisplayContent;
