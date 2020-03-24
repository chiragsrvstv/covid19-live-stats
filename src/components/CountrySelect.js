import React from "react";
import covidApi from "../api/covidApi";

class CountrySelect extends React.Component {
  state = {
    countriesList: "",
    selectedCountry: "IN",
    error: true
  };

  // fetching list of all countries and storing its result in state
  fetchCountries() {
    covidApi
      .get("https://covid19.mathdro.id/api/countries")
      .then(countriesResponse => {
        this.setState({
          countriesList: countriesResponse.data.countries,
          error: false
        });
      })
      .catch(err => {
        this.setState({ error: err });
        console.log(err);
      });
  }

  // method to save value(country) selected by user in state variable
  handleChange = event => {
    this.setState({ selectedCountry: event.target.value });
  };

  // method to pass the selected country back to DisplayCountryContent component when the user hits submit
  handleSubmit = event => {
    this.props.onCountrySelect(this.state.selectedCountry);
    event.preventDefault();
  };

  componentDidMount() {
    this.fetchCountries();
  }

  render() {
    if (this.state.countriesList && !this.state.error) {
      console.log(this.state);
      const x = this.state.countriesList;
      return (
        <div className="">
          <form onSubmit={this.handleSubmit}>
            <label>
              Select Country
              <select
                className="ui fluid search selection dropdown"
                value={this.state.selectedCountry}
                onChange={this.handleChange}
              >
                {x.map(country => (
                  <option key={country.iso3} value={country.iso3}>
                    {country.name}
                  </option>
                )
                )}
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else if (this.state.error) {
      return <div> Something Went Wrong </div>;
    } else {
      return <div>Loading Countries...</div>;
    }
  }
}

export default CountrySelect;
