exports.action = function(data, callback){
	
	// Info console
	info("jeux: " + data.action.command + " From: " + data.client);
	
	var tblCommand = {
	
		jeuxcarte: function() {  // Règle pour le jeux de carte
			var valeur = ["le 2","le 3","le 4","le 5","le 6","le 7","le 8","le 9","le 10","le valet","la dame","le roi","l'as"];
			var couleur = ["coeur","carreau","trèfle","pique"];
			var tts_valeur = valeur[Math.floor(Math.random() * valeur.length)];
			var tts_couleur = couleur[Math.floor(Math.random() * couleur.length)];
				Avatar.play(__dirname + '/medias/carte.mp3', data.client, function(){
					Avatar.speak("j\'ai choisi " + tts_valeur + " de " + tts_couleur, data.client, function(){
						Avatar.Speech.end(data.client);
					});
				});
		},
		jeux1de: function() {  // Règle pour le lancer de 1 dé
			var valeur = ["1","2","3","4","5","6"];
			var tts_valeur = valeur[Math.floor(Math.random() * valeur.length)];
				Avatar.play(__dirname + '/medias/de.mp3', data.client, function(){
					Avatar.speak("Le résultat est : " + tts_valeur, data.client, function(){
						Avatar.Speech.end(data.client);
					});
				});
		},
		jeux2de: function() {  /// Règle pour le lancer de 2 dés
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
		jeuxpileface: function() {  // Règle pour le lancer le jeu pile ou face
			var txt = ["okay, on joue à pile ou face. à toi l\'honneur, que choisi tu?","super, j\'adore ce jeu. je te laisse choisir. tu prend pile? ou face.","géniale ton idée. choisi le côté que tu veux.","avec plaisir, choisi ton côté."];
			var tts_txt = txt[Math.floor(Math.random() * txt.length)];
				Avatar.askme(tts_txt, data.client, {
						  "pile": "pile",
						  "battery": "pile",
						  "face": "face",
						  "head": "face"
					}, 0, function(answer, end) {
						case 'pile':
								var txtchoix = ["voila. c\'est face. pas de chance, tu as perdu.","voila. c\'est pile. bravo, c\'est toi qui gagne.","attention. c\'est face. super, j\'ai gagné.","attention. c\'est pile. ho zut, j\'ai perdu."];
								var tts_choix = txtchoix[Math.floor(Math.random() * txtchoix.length)];
									Avatar.speak("okay, alors moi je choisi face.|D'accord, du coup, moi je prend face.", data.client, function() {
										Avatar.play(__dirname + '/medias/piece.mp3', data.client, function(){
											Avatar.speak(tts_choix, data.client, function() {
												Avatar.Speech.end(data.client);
											});
										});
									});
							  break;
							default:
						case 'face':
								var txtchoix = ["voila. c\'est pile. pas de chance, tu as perdu.","voila. c\'est face. bravo, c\'est toi qui gagne.","attention. c\'est pile. super, j\'ai gagné.","attention. c\'est face. ho zut, j\'ai perdu."];
								var tts_choix = txtchoix[Math.floor(Math.random() * txtchoix.length)];
									Avatar.speak("okay, alors moi je choisi pile.|D'accord, du coup, moi je prend pile.", data.client, function() {
										Avatar.play(__dirname + '/medias/piece.mp3', data.client, function(){
											Avatar.speak(tts_choix, data.client, function() {
												Avatar.Speech.end(data.client);
											});
										});
									});
							  break;
							default:
									end(data.client);
								break;
				});
		}
	};
		
		
		
	info("Jeux command:", data.action.command, "From:", data.client);
	tblCommand[data.action.command]();
	
	// Fonction de callback, lien entre plugins (Obligatoire, toujours renvoyé en fin de méthode)
	return callback();
 
}