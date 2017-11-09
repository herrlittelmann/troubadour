import React, { Component } from "react";

export default class NewMood extends Component {
  render() {
    const { name, files, handler } = this.props;

    return (
      <div className="stimmung" onClick={handler}>
        <h1>{name}</h1>
        <span>{files.length}</span>
      </div>
    );
  }
}
