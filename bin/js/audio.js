//bindet die dialog-API ein, die auf die Systemdialoge (speichern, laden, Meldung usw.) Zugriff hat
const {dialog} = require('electron').remote;
console.log(dialog);
const dragula = require('dragula');



//AudioPlayer konfigurieren
/*function setAudioPlayer() {
	//Wenn das Dokument fertig geladen ist...
	$(document).ready(function(){
    	//Füge dem Button eine neue onClick-Funktion hinzu
    	$('#play').click(function(){
    		//Wechsel zwischen Pause und Play-Icon
    		$(this).toggleClass("fa fa-pause fa-2x");
    		$(this).toggleClass("fa fa-play fa-2x");
    		//Audio-Funktionalität auf Button legen
    		if($(this)[0].className == "fa fa-play fa-2x") {
    			$('#m1')[0].pause();
    		} else {
    			$('#m1')[0].play();
    		}
    	});
	});
}*/

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
function showAttributes(m) {
	document.getElementById("eigenschaften").innerHTML = ("<h1>" + m.id + "</h1>");
}

//Wenn eine Stimmmung den Fokus verliert
function hideAttributes(m) {
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
