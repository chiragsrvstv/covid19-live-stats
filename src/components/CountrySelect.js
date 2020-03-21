import React from "react";
import covidApi from "../api/covidApi";

class CountrySelect extends React.Component {
  state = { countries: "", selectedCountry: "IN" };

  async fetchCountries() {
    const countriesResponse = await covidApi.get("https://covid19.mathdro.id/api/countries");
    this.setState({countries: countriesResponse.data.countries});
    console.log(countriesResponse.data);

  }

  // onCountrySelect = (country) => {
  //   this.setState({seletedcountry: country});
  // }

  handleChange = event => {
    this.setState({ selectedCountry: event.target.value });
  };

  handleSubmit = event => {
    this.props.onCountrySelect(this.state.selectedCountry);
    event.preventDefault();
  };


  componentDidMount() {
    this.fetchCountries();
  }


  // logic to change state which will be passed to app as a prop.

  render() {
    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
          <label>
            Select Country
            <select className="ui fluid search selection dropdown" value={this.state.selectedCountry} onChange={this.handleChange}>
              {Object.entries(this.state.countries).map(([country, code]) => (
                  <option key={code} value={code}> {country} </option>
                ))}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>

    );
  }
}

export default CountrySelect;
