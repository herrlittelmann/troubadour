import React, { Component } from "react";
import { remote } from "electron";

export default class NewSoundfile extends Component {
  render() {
    const { app, dialog } = remote;
    const { handleNewFiles } = this.props;
    const buttonClick = () => {
      dialog.showOpenDialog(
        {
          properties: ["openFile", "multiSelections"]
        },
        function(files) {
          if (files !== undefined) {
            // handle files
            handleNewFiles(files);
          }
        }
      );
    };
    const onChange = event => {
      console.log(event.target.value);
    };
    return (
      <button className="stimmung" onClick={buttonClick}>
        <i className="fa fa-plus" aria-hidden="true" /> sound
      </button>
    );
  }
}
