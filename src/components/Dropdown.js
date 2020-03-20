import React from "react";

class Dropdown extends React.Component {
  state = { value: "IN" };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    alert("Your country is " + this.state.value);
    event.preventDefault();
  };

  // countryList = this.props.countries().map(country => console.log(country));


  render() {

    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
          <label>
            Select Country
            <select className="ui fluid search selection dropdown" value={this.state.value} onChange={this.handleChange}>
              {Object.entries(this.props.countries).map(([country, code]) => (
                  <option key={code} value={code}> {country} </option>
                ))}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
//
// <div className="ui fluid search selection dropdown">
//   <input type="" name="country" onClick={() => console.log('e')} />
//   <i className="dropdown icon"> </i>
//   <div className="default text"> Select Country </div>
//   <div className="menu">
//     <div className="item" data-value="af">
//       <i className="af flag"> </i> Afghanistan
//     </div>
//     <div className="item" data-value="ax">
//       <i className="ax flag"></i>Aland Islands
//     </div>
//   </div>
// </div>

export default Dropdown;
