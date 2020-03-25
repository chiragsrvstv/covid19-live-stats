import React from 'react';
import DisplayCountryContent from './DisplayCountryContent';
import DisplayDailyContent from './DisplayDailyContent';

class DisplayContent extends React.Component {
  render() {
    return (
      <div className="ui grid">
        <DisplayDailyContent className="" />
        <DisplayCountryContent className="" />
      </div>
    );
  }
}

export default DisplayContent;
