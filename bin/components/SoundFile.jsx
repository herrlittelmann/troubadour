import React, { Component } from "react";

export default class SoundFile extends Component {
  render() {
    const { handler, file } = this.props;
    const name = file ? file.name : "";
    const time = file ? file.time : "";

    return (
      <div className="file" onClick={handler}>
        <i className="fa fa-file-sound" aria-hidden="true" />
        {name}
        {time}
      </div>
    );
  }
}
