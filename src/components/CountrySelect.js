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

  // method to pass the selected country back to DisplayCountryContent component when the user selects a country
  handleChange = event => {
    this.props.onCountrySelect(event.target.value);
    this.setState({selectedCountry: event.target.value});
  };



  componentDidMount() {
    this.fetchCountries();
  }

  render() {
    if (this.state.countriesList && !this.state.error) {
      const iconClassName = `${this.state.selectedCountry.toLowerCase()} flag`;
      return (
        <div className="">


              <label> Selected Country: <i className={iconClassName}> </i> </label>
              <select
                className="ui fluid search selection dropdown"
                value={this.state.selectedCountry}
                onChange={this.handleChange}
              >
                {this.state.countriesList.map((country, index) => (
                  <option className="item" key={country.iso3 || index} value={country.iso2 || index}>
                    {country.name}
                  </option>
                )
                )}
              </select>



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
