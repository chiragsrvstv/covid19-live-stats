import React from "react";
import covidApi from "../../api/covidApi";

import CountrySelect from '../CountrySelect';

class DisplayContent extends React.Component {
  state = { confirmed: null, deaths: null, recovered: null, country: "IN" };

  async fetchCountryData() {
    const response = await covidApi.get(
      `countries/${this.state.country}`
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


  onCountrySelect = (selectedCountry) => {
    this.setState({country: selectedCountry});
  }

  componentDidMount() {
    this.fetchCountryData();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.country !== this.state.country) {
      this.fetchCountryData();
    }

  }



  render() {
    return (
      <div>
        <CountrySelect onCountrySelect={this.onCountrySelect} />
        <div>Affected: {this.state.confirmed}</div>
        <div>Deaths: {this.state.deaths}</div>
        <div>Recovered: {this.state.recovered}</div>
      </div>
    );
  }
}

export default DisplayContent;
