import React, { Component } from "react";

export default class Details extends Component {
  render() {
    console.log(this.props);
    const { mood, handler } = this.props;
    const { name, files } = mood;

    return (
      <div className="eigenschaften" onClick={handler}>
        <h1>Eigenschaften</h1>
        <h2>{name}</h2>
        <span>{files.length}</span>
      </div>
    );
  }
}
