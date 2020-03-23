import React from "react";
import covidApi from "../api/covidApi";

class CountrySelect extends React.Component {
  state = {
    countriesList: "",
    selectedCountry: "IN",
    error: true
  };

  fetchCountries() {
    covidApi
      .get("https://covid19.mathdro.id/api/countries")
      .then(countriesResponse => {
        this.setState({
          countriesList: countriesResponse.data,
          error: false
        });
      })
      .catch(err => {
        this.setState({ error: err });
        console.log(err);
      });
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
    if (this.state.countriesList && !this.state.error) {
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
                {Object.entries(this.state.countriesList.countries).map(
                  ([country, code], index) => (
                    /* assigning keys as index value temporarily to remove warnings */
                    <option
                      key={index}
                      value={code}
                    >
                      {country}
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
