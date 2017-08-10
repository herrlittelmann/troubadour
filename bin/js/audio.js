const dragula = require('dragula');
const React = require('react');
const ReactDOM = require('react-dom');

//Unser Alles-speichern-Objekt - bisher noch unbenutzt
const state = {
	moods: [],
	highlighted: null
};

//abstrakte Klasse Mood, die von React erbt
class Mood extends React.Component {
	//Zeichnet folgendes
	render() {
		//Ein Div mit folgenden Eigenschaften
		return React.createElement("div", {
			className:"stimmung",
			//Die Syntax muss so sein, weil ich eine Fkt übergebe und nicht ausführe!
			onClick: this.focus,
			//Mit this.props. ... greife ich auf die Eigenschaften des Objektes zu!
			tabIndex: this.props.tabIndex,
			//JS6-Schreibweise für function () {...}
			//Durch das "=>" wird das "this" auf die Komponente Mood referenziert und nicht auf das Div
			onFocus: () => showAttributes(this.props.id),
			onBlur: () => hideAttributes()
			//Inline-Parameter
		},"Dies ist eine Stimmung!");
	}
}

//Hier rendert React unsere Klasse mit dem Parameter "id" und "tabIndex" als json-objekt-eigenschaft
//Zugriff später über this.props.xyz
//Funktion bekommt als Parameter das Objekt und den Einstiegspunkt im DOM
ReactDOM.render(
  React.createElement(Mood, {id:"waldipups",tabIndex:1}),
  document.getElementById('neuerplayer')
);

//Eine neue Stimmung erstellen
function newMood() {
	//Neues DIV anlegen, mit Play-Button füllen und anhängen
	var m = document.createElement("div");
	m.className = "stimmung";
	//Neue Mood in den DOM einfügen
	moods = document.getElementsByClassName("stimmung");
	var anz = moods.length;
	document.getElementById("player").insertBefore(m, moods[anz-1]);
	//Id setzen
	m.id = "stimmung" + anz;
	//TabIndex ist für den focus wichtig!
	m.setAttribute("tabindex", anz);
	//Namen eingeben, Input erstellen
	m.innerHTML = ('<input type=\'text\' onblur=\"cancelMood(this);\"></input>');
	var inp = m.firstChild;
	inp.focus();
	//Tastatureingaben abfangen
	m.addEventListener ('keydown', function (event) {
		//Wenn Enter gedrückt wird
		if (event.which == 13) {
			if (inp.value == "") {
				//Wenn der Useruser nichts eingegeben hat...
				m.firstChild.removeAttribute("onblur");
				m.parentNode.removeChild(m);
			} else {
				//Wenn der user was eingegeben hat: Onblur ausschalten und initialisieren
				m.firstChild.removeAttribute("onblur");
				initMood(m, inp.value);
			}
		}
		if (event.which == 27) {
			//Falls ESC gedrückt wurde
			m.firstChild.removeAttribute("onblur");
			m.parentNode.removeChild(m);
		}
	});
}

//Stimmungserstellungsabbruch bei Fokusverlust
function cancelMood(inp) {
	if (inp.value == "") {
		inp.parentNode.parentNode.removeChild(inp.parentNode);
	} else {
		//m.removeAttribute("onblur");
		initMood(inp.parentNode, inp.value);
	}
}

//Wenn eine Stimmung den Fokus bekommt
function showAttributes(id) {
	document.getElementById("eigenschaften").innerHTML = ("<h1>" + id + "</h1>");
}

//Wenn eine Stimmmung den Fokus verliert
function hideAttributes() {
	document.getElementById("eigenschaften").innerHTML = ("");
}

//Initialisierung der Stimmung
function initMood(m, name) {
	m.innerHTML = ("<p class=\'moodname\'>" + name + "</p>");
	//Attribute der Mood setzen
	m.setAttribute("onClick", "this.focus();");
	m.setAttribute("onFocus", "showAttributes(this)");
	m.setAttribute("onBlur", "hideAttributes(this)");
	//Play-Button erstellen
	var play = document.createElement("i");
	play.setAttribute("class", "fa fa-play");
	play.setAttribute("aria-hidden", "true");
	//Play-Button anhängen
	m.appendChild(play);
}
