import React, { Component } from "react";

export default class SoundFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loop: true
    };
  }
  toggleLoop() {
    this.setState({
      loop: !this.state.loop
    });
  }
  render() {
    const { handler, file } = this.props;
    const { loop } = this.state;
    const name = file ? file.name : "";
    const time = file ? file.time : "";
    const loopButtonLabel = loop ? "do not loop" : "loop";

    return (
      <div className="file" onClick={handler}>
        <i className="fa fa-file-sound" aria-hidden="true" />
        <audio controls autoplay loop={loop}>
          <source src={name} type="audio/mp3" />
        </audio>
        <button
          onClick={() => {
            this.toggleLoop();
          }}
        >
          {loopButtonLabel}
        </button>
      </div>
    );
  }
}
