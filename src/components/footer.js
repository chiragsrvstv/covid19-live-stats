import React from "react";

const footer = () => {
  return (
    <footer className="ui borderless inverted menu">
      <div className="item footer">
        <p>
          Developed with{" "}
          <span role="img" aria-label="heart">
            {" "}
            ❤️{" "}
          </span>{" "}
          by <a href="https://chiragsrvstv.codes"> @Chirag </a>
        </p>
      </div>
      <div className="right floated item">
        <a href="https://github.com/chiragsrvstv/covid19-live-stats">
          {" "}
          <i className="github icon large"> </i>{" "}
        </a>
      </div>
    </footer>
  );
};

export default footer;
