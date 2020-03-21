import React from 'react';
import DisplayCountryContent from './DisplayCountryContent';
import DisplayDailyContent from './DisplayDailyContent';

class DisplayContent extends React.Component {
  render() {
    return (
      <div>
        <DisplayDailyContent />
        <DisplayCountryContent />
      </div>
    );
  }
}

export default DisplayContent;
