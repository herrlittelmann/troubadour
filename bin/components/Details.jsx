import React, { Component } from "react";
import SoundFile from "./SoundFile.jsx";
import NewSoundFile from "./NewSoundFile.jsx";

export default class Details extends Component {
  render() {
    const { mood, moodIndex, createSound, addSound } = this.props;
    const { name, files } = mood;
    console.log(files);

    const fileList = files.map(file => {
      return <SoundFile file={file} />;
    });

    return (
      <div className="eigenschaften">
        <h1>Eigenschaften</h1>
        <h2>{name}</h2>
        <span>{files.length}</span>
        <NewSoundFile
          handler={() => {
            const newSoundFile = createSound();
            addSound(newSoundFile, moodIndex);
          }}
        />
        <div className="filelist">{fileList}</div>
      </div>
    );
  }
}
