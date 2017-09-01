import React, { Component } from "react";

export default class NewMood extends Component {
  render({ name }) {
    return (
      <div
        className="stimmung"
        id="neu"
        onClick={() => {
          console.log("clicked add button");
        }}
      >
        {name}
      </div>
    );
  }
}
