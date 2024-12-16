let nombreADeviner;
    let essais = 0;
    let numMax;
    let button_difficulty = document.getElementById('choix-difficulté');


    function choisirDifficulte(max) {
      numMax = max;
      nombreADeviner = Math.floor(Math.random() * numMax) + 1; // Générer un nombre aléatoire
      essais = 0;

      // Afficher le jeu
      document.getElementById('difficulte').style.display = 'none';
      document.getElementById('game').style.display = 'block';
      document.getElementById('max-number').textContent = numMax;
      button_difficulty.style.display = 'block';
    }

    function verifierReponse() {
      const userInput = parseInt(document.getElementById('user-input').value);
      const messageElement = document.getElementById('message');
      if (isNaN(userInput) || userInput < 1 || userInput > numMax) {
        messageElement.textContent = `Veuillez entrer un nombre valide entre 1 et ${numMax}.`;
        messageElement.style.color = 'red';
        return;
      }

      essais++;

      if (userInput === nombreADeviner) {
        messageElement.textContent = `Bravo ! Vous avez trouvé le nombre ${nombreADeviner} en ${essais} essais.`;
        messageElement.style.color = 'green';
      } else {
        const difference = Math.abs(nombreADeviner - userInput);
        
        if (difference > 10) {
          messageElement.textContent = 'Froid';
          messageElement.style.color = 'blue';
        } else if (difference > 5) {
          messageElement.textContent = 'Chaud';
          messageElement.style.color = 'orange';
        } else {
          messageElement.textContent = 'Très chaud';
          messageElement.style.color = 'red';
        }
      }

      // Limite d'essais
      if ((numMax === 50 && essais >= 10) || (numMax === 100 && essais >= 15) || (numMax === 200 && essais >= 20)) {
        messageElement.textContent = `Vous avez atteint le nombre maximum d'essais. Le nombre à deviner était ${nombreADeviner}.`;
        messageElement.style.color = 'red';
      }
    }