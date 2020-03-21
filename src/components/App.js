import React from "react";

import DisplayContent from './display/DisplayContent';


class App extends React.Component {

  // country prop should come from countrySelect component, hardcoding for now.

  render() {
    return (
      <div className="ui container">
        <h1> App </h1>
        <DisplayContent />
      </div>
    );
  }
}

export default App;
