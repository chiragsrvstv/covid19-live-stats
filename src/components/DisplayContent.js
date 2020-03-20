import React from "react";
import covidApi from "../api/covidApi";

class DisplayContent extends React.Component {
  state = { confirmed: null, deaths: null, recovered: null };

  async fetchCountryData() {
    const response = await covidApi.get(
      `countries/${this.props.selectedCountry}`
    );

    if (response.data.confirmed) {
      this.setState({
        confirmed: response.data.confirmed.value,
        deaths: response.data.deaths.value,
        recovered: response.data.recovered.value
      });
      console.log(response.data);
    } else {
      return <div> Data Not Found </div>;
    }
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
