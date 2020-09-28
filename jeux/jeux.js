/* Méthode principale du plugin
	Params:
	- data: objet state provenant de <plugin>.action.js
		- data.client: Le client qui a passé la règle
	- callback: lien entre plugin
*/
exports.action = function(data, callback){
	
	// Info console
	info("jeux: " + data.action.command + " From: " + data.client);
	
	var tblCommand = {
	
		jeuxcarte: function() {  // Règle command1 (objet rule) dans le fichier de propriétés
			// point d'entrée - Méthode à exécuter
			// Exemple avec l'exécution d'un speak
			var valeur = ["le 2","le 3","le 4","le 5","le 6","le 7","le 8","le 9","le 10","le valet","la dame","le roi","l'as"];
			var couleur = ["coeur","carreau","trèfle","pique"];
			var tts_valeur = valeur[Math.floor(Math.random() * valeur.length)];
			var tts_couleur = couleur[Math.floor(Math.random() * couleur.length)];
				Avatar.play(__dirname + '/medias/carte.mp3', data.client, function(){
					Avatar.speak("La carte tiré est " + tts_valeur + " de " + tts_couleur, data.client, function(){
						Avatar.Speech.end(data.client);
					});
				});
		},
		jeux1de: function() {  // Règle command1 (objet rule) dans le fichier de propriétés
			// point d'entrée - Méthode à exécuter
			// Exemple avec l'exécution d'un speak
			var valeur = ["1","2","3","4","5","6"];
			var tts_valeur = valeur[Math.floor(Math.random() * valeur.length)];
				Avatar.play(__dirname + '/medias/de.mp3', data.client, function(){
					Avatar.speak("Le résultat est : " + tts_valeur, data.client, function(){
						Avatar.Speech.end(data.client);
					});
				});
		},
		jeux2de: function() {  // Règle command1 (objet rule) dans le fichier de propriétés
			// point d'entrée - Méthode à exécuter
			// Exemple avec l'exécution d'un speak
			var valeurde1 = ["1","2","3","4","5","6"];
			var valeurde2 = ["1","2","3","4","5","6"];
			var tts_valeurde1 = valeurde1[Math.floor(Math.random() * valeurde1.length)];
			var tts_valeurde2 = valeurde2[Math.floor(Math.random() * valeurde2.length)];
				Avatar.play(__dirname + '/medias/de.mp3', data.client, function(){
					Avatar.speak("Le résultat est : " + tts_valeurde1 + " pour le dé 1 et " + tts_valeurde2 + " pour le dé 2.", data.client, function(){
						Avatar.Speech.end(data.client);
					});
				});
		},
		jeuxpileface: function() {  // Règle command1 (objet rule) dans le fichier de propriétés
			// point d'entrée - Méthode à exécuter
			// Exemple avec l'exécution d'un speak
				Avatar.askme("okay on joue à pile ou face à toi l\'honneur que choisi tu?|super j\'adore ce jeu je te laisse choisir tu prend pile? ou face|avec plaisir choisi le côté que tu veux", data.client, 
					{
						  "pile": "pile",
						  "battery": "pile",
						  "face": "face",
						  "head": "face",
						  "annuler" : "done",
						  "non" : "done",
						  "retour" : "done"
					}, 0, function(answer, end) {
						switch (answer) {
							case 'pile':
									var txtchoix = ["voila. c\'est face. pas de chance, tu as perdu.","voila. c\'est pile. bravo, c\'est toi qui gagne.","c\'est face. super, j\'ai gagné.","c\'est pile. ho zut, j\'ai perdu."];
									var tts_choix = txtchoix[Math.floor(Math.random() * txtchoix.length)];
									Avatar.speak("okay, alors c\'est moi qui prend face|D\'accord, du coup, moi je prend face", data.client, function() {
										Avatar.play(__dirname + '/medias/piece.mp3', data.client, function(){
											Avatar.speak(tts_choix, data.client, function() {
												Avatar.Speech.end(data.client);
											});
										});
									});
								break;
							case 'face':
									var txtchoix = ["voila. c\'est pile. pas de chance, tu as perdu.","voila. c\'est face. bravo, c\'est toi qui gagne.","c\'est pile. super, j\'ai gagné.","c\'est face. ho zut, j\'ai perdu."];
									var tts_choix = txtchoix[Math.floor(Math.random() * txtchoix.length)];
									Avatar.speak("okay,  alors c\'est moi qui prend pile|D\'accord, du coup, moi je prend pile", data.client, function() {
										Avatar.play(__dirname + '/medias/piece.mp3', data.client, function(){
											Avatar.speak(tts_choix, data.client, function() {
												Avatar.Speech.end(data.client);
											});
										});
									});
								break;
							default:
							case 'done' :
									end(data.client);
								break;
						}
				});
		}
	};
		
		
		
	info("Jeux command:", data.action.command, "From:", data.client);
	tblCommand[data.action.command]();
	
	// Fonction de callback, lien entre plugins (Obligatoire, toujours renvoyé en fin de méthode)
	return callback();
 
}