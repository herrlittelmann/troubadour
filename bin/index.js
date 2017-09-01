// Diese index.js Datei dient als Einstiegspunkt für webpack,
// um die komplette Anwendung mit all ihren Abhängigkeiten laden zu können
import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";

// App ist die Wurzel Komponente. Von ihr aus werden alle anderen Komponenten als Kinder aufgerufen und gerendert
render(<App />, document.getElementById("root"));
