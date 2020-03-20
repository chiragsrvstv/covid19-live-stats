import React from "react";

import CountrySelect from './CountrySelect';
import DisplayContent from './DisplayContent';

class App extends React.Component {
  state = { country: 'IN' };
  // country prop should come from countrySelect component, hardcoding for now.

  render() {
    return (
      <div className="ui container">
        <h1> App </h1>
        <CountrySelect />
        <DisplayContent selectedCountry={this.state.country} />
      </div>
    );
  }
}

export default App;
