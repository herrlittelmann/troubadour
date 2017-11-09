import React, { Component } from "react";
import NewMood from "./NewMood.jsx";
import Mood from "./Mood.jsx";
import Details from "./Details.jsx";

export default class App extends Component {
  // setzt den anfänglichen State, damit die Anwendung immer darauf zugreifen und ihn von Anfang an rendern kann
  constructor(props) {
    super(props);
    this.state = {
      moods: [],
      selectedMood: undefined
    };
  }

  // Erzeuge ein neues, leeres Mood mit einem Name und einer List an Dateien (die wir dann später abspielen)
  createMood(newName, newFiles) {
    const name = newName || `Neues Thema ${this.state.moods.length}`;
    const files = newFiles || [];
    return { name, files };
  }

  // Fügt ein Mood der List an moods hinzu, welche von der Anwendung gerendert werden
  addEmptyMood() {
    const mood = this.createMood();
    this.setState({
      // Erzeugt ein eines Array mit dem neuen Mood (mood) am Anfang und den alten (this.moods) direkt danach
      moods: [...this.state.moods, mood]
    });
  }

  showMoodDetails(index) {
    this.setState({
      selectedMood: index
    });
  }
  createSound(fileName, fileTime) {
    const name = fileName || `new file`;
    const time = fileTime || "-";
    return { name, time };
  }
  addSound(file, moodIndex) {
    const { moods } = this.state;
    const oldMood = moods[moodIndex];
    const oldFiles = oldMood.files;
    const newMood = {
      ...oldMood,
      files: [...oldFiles, file]
    };
    this.setState({
      moods: this.replaceAtIndex(moods, newMood, moodIndex)
    });
  }

  // Hilfsfunktion welche ein Object in einerm Array durch ein neues ersetzt, sie gibt dabei ein komplett neues Array zurück, um den state frei von Mutationen zu halten
  replaceAtIndex(originalArray, newItem, itemIndex) {
    return originalArray.map((oldItem, index) => {
      return index === itemIndex ? newItem : oldItem;
    });
  }

  render() {
    // für jedes mood Objekt im state soll die Anwendung eine Komponente "Mood" rendern. Diese Komponente braucht dafür die Eigenschaften des jeweiligen Mood als Parameter
    const { moods, selected } = this.state;

    const moodComponents = this.state.moods.map((mood, index) => {
      return (
        <Mood
          key={index}
          {...mood}
          handler={() => {
            this.showMoodDetails(index);
          }}
        />
      );
    });

    const getDetails = () => {
      const { selectedMood, moods } = this.state;
      if (selectedMood === undefined) return null;

      const mood = moods[selectedMood];
      return (
        <Details
          mood={mood}
          moodIndex={selectedMood}
          createSound={() => {
            return this.createSound();
          }}
          addSound={(file, moodIndex) => {
            return this.addSound(file, moodIndex);
          }}
        />
      );
    };

    // rendere den bisherigen "Container", aber ersetze den Inhalt des "player" Elements, durch die Komponente "NewMood" und der zuvor zusammengebaute List an "Mood" Elementen
    return (
      <div id="container">
        <header>
          <img src="bin/img/title.png" alt="Troubadour" />
        </header>

        <div id="player">
          <NewMood
            handler={() => {
              this.addEmptyMood();
            }}
          />
          {moodComponents}
        </div>

        <div id="eigenschaften">{getDetails()}</div>
      </div>
    );
  }
}
