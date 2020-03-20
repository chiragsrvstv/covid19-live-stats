import React from "react";
import Dropdown from "./Dropdown";
import covidApi from "../api/covidApi";

class CountrySelect extends React.Component {
  state = { countries: "", selectedCountry: "IT" };

  async fetchCountries() {
    const countriesResponse = await covidApi.get("https://covid19.mathdro.id/api/countries");

    this.setState({countries: countriesResponse.data.countries});
    // console.log(countriesResponse.data.countries);

  }

  onCountrySelect = country => {
    this.setState({seletedcountry: country});
  }

  componentDidMount() {
    this.fetchCountries();
  }
  // logic to change state which will be passed to app as a prop.

  render() {
    return (
      <div className="ui container">
        <Dropdown countries={this.state.countries} onCountrySelect={this.onCountrySelect}/>
      </div>
    );
  }
}

export default CountrySelect;
