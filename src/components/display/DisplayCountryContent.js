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

  // method to get selected country from countrySelect component(passed as a prop)
  onCountrySelect = selectedCountry => {
    console.log("changed");
    this.setState({ country: selectedCountry });
  };

  // fetching data specific to a country and storing its result in state
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
      .catch(err => {
        this.setState({ error: err });
      });
  }

  componentDidMount() {
    this.fetchCountryData();
  }

  componentDidUpdate(prevProps, prevState) {
    // checking if the selected country data is not already rendered on the page.
    if (prevState.country !== this.state.country) {
      console.log("updated country is" + this.state.country);
      this.fetchCountryData();
    }
  }

  render() {
    if (!this.state.error) {
      const affected = new Intl.NumberFormat().format(this.state.confirmed);
      const deaths = new Intl.NumberFormat().format(this.state.deaths);
      const recovered = new Intl.NumberFormat().format(this.state.recovered);
      return (
        <div className="row">
          <div className="sixteen wide column">
            <CountrySelect
              className=""
              onCountrySelect={this.onCountrySelect}
            />
          </div>

          <div className="cards-list1">
            <div className="sixteen wide mobile eight wide tablet eight wide computer column">
              <div className="card1">
                <div className="card_image1">
                  {" "}
                  <img
                    src="https://media.giphy.com/media/MWsCOt1HcAeBGmJ2jB/giphy.gif"
                    alt="affected"
                  />{" "}
                </div>
                <div className="card_title title-white">
                  <h1 className="country-data-label">Affected: {affected}</h1>{" "}
                  <h1 className="country-data-label">Died: {deaths}</h1>
                  <h1 className="country-data-label"> Recovered: {recovered} </h1>
                  <p className="country-facts-label">0000 Affected and 1111 Died in Past 24 Hours </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      );
    } else if (this.state.error) {
      return (
        <div>
          <CountrySelect onCountrySelect={this.onCountrySelect} />
          <div> Data Not Yet Available </div>
        </div>
      );
    } else {
      return <div> Loading... </div>;
    }
  }
}

export default DisplayContent;
