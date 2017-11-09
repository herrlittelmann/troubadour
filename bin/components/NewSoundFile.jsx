import React, { Component } from "react";

export default class NewSoundFile extends Component {
  render() {
    const { handler } = this.props;
    return (
      <button className="stimmung" onClick={handler}>
        <i className="fa fa-plus" aria-hidden="true" /> sound
      </button>
    );
  }
}
