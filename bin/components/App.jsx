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

  render() {
    // für jedes mood Objekt im state soll die Anwendung eine Komponente "Mood" rendern. Diese Komponente braucht dafür die Eigenschaften des jeweiligen Mood als Parameter
    const { moods, selected } = this.state;

    const moodComponents = this.state.moods.map((mood, index) => {
      return (
        <Mood
          key={index}
          {...mood}
          handler={() => {
            console.log(index);
            this.showMoodDetails(index);
          }}
        />
      );
    });

    const getDetails = () => {
      const { selectedMood, moods } = this.state;
      console.log("selected", selectedMood);
      if (selectedMood === undefined) return null;
      console.log(moods);
      const mood = moods[selectedMood];
      console.log(mood);
      return <Details mood={mood} />;
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
