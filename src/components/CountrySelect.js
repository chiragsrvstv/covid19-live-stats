import React from 'react';

class CountrySelect extends React.Component {
  state = {country: 'IN'};

  // logic to change state which will be passed to app as a prop.

  render() {
    return <div> Choose Country: IN </div>;
  }
}

export default CountrySelect;
