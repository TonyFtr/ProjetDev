// Initialisation des variables
let currentPlayer = 'X'; // Joueur actuel ('X' ou 'O')
let board = ['', '', '', '', '', '', '', '', '']; // Plateau de jeu
let isGameActive = true; // Indique si le jeu est en cours

// Récupération des cases et du message
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

// Messages personnalisés
const playerTurn = (player) => `C'est au tour de ${player}`;
const winMessage = (player) => `${player} a gagné ! 🎉`;
const drawMessage = () => `Match nul !`;

// Combinaisons gagnantes
const winningCombinations = [
  [0, 1, 2], // Ligne du haut
  [3, 4, 5], // Ligne du milieu
  [6, 7, 8], // Ligne du bas
  [0, 3, 6], // Colonne de gauche
  [1, 4, 7], // Colonne du milieu
  [2, 5, 8], // Colonne de droite
  [0, 4, 8], // Diagonale principale
  [2, 4, 6], // Diagonale secondaire
];

// Mise à jour du plateau visuel
function updateBoard() {
  cells.forEach((cell, index) => {
    cell.textContent = board[index]; // Met le contenu du plateau
    if (board[index] === 'X') {
      cell.classList.add('x');
    } else if (board[index] === 'O') {
      cell.classList.add('o');
    }
  });
}

// Vérifie les conditions de victoire ou de match nul
function checkGameState() {
  // Vérifie les combinaisons gagnantes
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      message.textContent = winMessage(board[a]);
      isGameActive = false; // Arrête le jeu
      return;
    }
  }

  // Vérifie si le plateau est plein
  if (!board.includes('')) {
    message.textContent = drawMessage();
    isGameActive = false;
    return;
  }

  // Change de joueur si aucune victoire ou nul
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = playerTurn(currentPlayer);
}

// Gérer le clic sur une case
function handleCellClick(event) {
  const cell = event.target; // Case cliquée
  const cellIndex = Array.from(cells).indexOf(cell); // Index de la case

  // Si le jeu est terminé ou si la case est déjà jouée, on ne fait rien
  if (!isGameActive || board[cellIndex]) return;

  // Met à jour le plateau de jeu
  board[cellIndex] = currentPlayer;
  updateBoard();
  checkGameState();
}

// Réinitialiser le jeu
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  message.textContent = playerTurn(currentPlayer);
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
}

// Ajouter des événements de clic sur les cases
cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

// Bouton de réinitialisation
document.getElementById('restart').addEventListener('click', resetGame);

// Message initial
message.textContent = playerTurn(currentPlayer);
