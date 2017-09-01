import React from "react";

const App = () => (
  <div id="container">
    <header>
      <img src="bin/img/title.png" alt="Troubadour" />
    </header>

    <div id="player">
      <div
        className="stimmung"
        id="neu"
        onClick={() => {
          console.log("clicked add button");
        }}
      >
        <i className="fa fa-plus" aria-hidden="true" />
      </div>
    </div>

    <div id="eigenschaften" />
  </div>
);

export default App;
