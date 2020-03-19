import React from "react";
import covidApi from "../api/covidApi";

import Affected from "./display/Affected";
import Deaths from "./display/Deaths";
import Recovered from "./display/Recovered";

class DisplayContent extends React.Component {
  state = { confirmed: null, deaths: null, recovered: null };

  async fetchCountryData() {
    const response = await covidApi.get(
      `countries/${this.props.selectedCountry}`
    );
    this.setState({
      confirmed: response.data.confirmed.value,
      deaths: response.data.deaths.value,
      recovered: response.data.recovered.value
    });
    console.log(response.data);
  }

  componentDidMount() {
    this.fetchCountryData();
  }

  render() {
    return (
      <div>
        <div>Affected: {this.state.confirmed}</div>
        <div>Deaths: {this.state.deaths}</div>
        <div>Recovered: {this.state.recovered}</div>
      </div>
    );
  }
}

export default DisplayContent;
