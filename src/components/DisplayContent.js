import React from "react";

import Affected from "./display/Affected";
import Deaths from "./display/Deaths";
import Recovered from "./display/Recovered";

class DisplayContent extends React.Component {
  render() {
    return (
      <div>
        <Affected />
        <Deaths />
        <Recovered />
      </div>
    );
  }
}

export default DisplayContent;
