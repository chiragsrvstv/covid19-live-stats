import React from "react";
import '../stylesheets/app.css';

import DisplayContent from './display/DisplayContent';
import Header from './Header';


class App extends React.Component {

  // country prop should come from countrySelect component, hardcoding for now.

  render() {
    return (
      <div className="ui container">
        <Header />
        <DisplayContent />
      </div>
    );
  }
}

export default App;
