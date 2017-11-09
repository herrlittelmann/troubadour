import React, { Component } from "react";

export default class NewMood extends Component {
  render() {
    const { handler } = this.props;
    return (
      <button className="stimmung" id="neu" onClick={handler}>
        <i className="fa fa-plus" aria-hidden="true" /> mood
      </button>
    );
  }
}
