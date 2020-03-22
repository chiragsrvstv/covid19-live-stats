import React from "react";
import covidApi from "../api/covidApi";

class CountrySelect extends React.Component {
  state = { countriesList: '', selectedCountry: "IN" };

  async fetchCountries() {
    const countriesResponse = await covidApi.get("https://covid19.mathdro.id/api/countries");
    this.setState({countriesList: countriesResponse.data.countries});


  }

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

  render() {
    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
          <label>
            Select Country
            <select className="ui fluid search selection dropdown" value={this.state.selectedCountry} onChange={this.handleChange}>
              {Object.entries(this.state.countriesList).map(([country, code]) => (
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
