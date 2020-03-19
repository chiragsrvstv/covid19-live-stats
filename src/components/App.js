import React from "react";
import covidApi from "../api/covidApi";

import CountrySelect from './CountrySelect';
import DisplayContent from './DisplayContent';

class App extends React.Component {
  state = { confirmed: null, value: '',  };

  async fetchDaily(){
    const response = await covidApi.get('daily');
    console.log(response.data);
    this.setState({ confirmed: response.data });
    //console.log(this.state);
  };

  componentDidMount() {
    this.fetchDaily();
  }


  renderContent() {
    if(this.state.confirmed) {
      const cnf = this.state.confirmed;
      const latest = cnf[cnf.length -1];
      return (<div>
        <h3> Affected: {latest.totalConfirmed} </h3>
        <h3> Recovered: {latest.totalRecovered} </h3>
        </div>);
    } else {
      return <div> Loading.... </div>;
    }
  };

  render() {
    return (
      <div>
        <h1> App </h1>
        <CountrySelect />
        <DisplayContent />
      </div>
    );
  }
}

export default App;
