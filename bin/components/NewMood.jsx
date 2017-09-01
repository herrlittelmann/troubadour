import React, { Component } from "react";

export default class NewMood extends Component {
  render() {
    return (
      <div
        className="stimmung"
        id="neu"
        onClick={() => {
          console.log("clicked add button");
        }}
      >
        <i className="fa fa-plus" aria-hidden="true" />
      </div>
    );
  }
}
