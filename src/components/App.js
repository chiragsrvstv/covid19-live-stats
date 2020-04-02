import React from "react";
import "../stylesheets/app.css";

import DisplayContent from "./display/DisplayContent";
import Header from "./Header";
import Footer from "./footer";

class App extends React.Component {
  // country prop should come from countrySelect component, hardcoding for now.

  render() {
    return (
      <div className="main">
        <div className="ui container">
          <Header />
          <div className="ui huge centered header quote">
            {" "}
            "Apparently there is nothing that cannot happen today." ~ Mark Twain{" "}
          </div>
          <DisplayContent />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
