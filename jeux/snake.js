const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

const cellSize = 20; // Taille d'une cellule
let snake = [{ x: 200, y: 200 }]; // Position initiale du serpent
let food = { x: 100, y: 100 }; // Position initiale de la nourriture
let direction = { x: 0, y: 0 }; // Direction actuelle
let gameInterval;
let score = 0;

// Dessiner le damier
function drawCheckerboard() {
  const rows = canvas.height / cellSize;
  const cols = canvas.width / cellSize;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? "#76C546" : "#80CF50"; // Alternance vert et vert clair
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

// Dessiner une cellule
function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cellSize, cellSize);
}

// Générer une position aléatoire pour la nourriture
function generateFood() {
  let newFoodPosition;
  let isOnSnake;

  do {
    isOnSnake = false;
    newFoodPosition = {
      x: Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize,
      y: Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize,
    };

    // Vérifier si la nouvelle position est sur le serpent
    for (let segment of snake) {
      if (segment.x === newFoodPosition.x && segment.y === newFoodPosition.y) {
        isOnSnake = true;
        break;
      }
    }
  } while (isOnSnake);

  food = newFoodPosition;
}

// Vérifier si la position est hors des limites
function isCollision(x, y) {
  return (
    x < 0 ||
    y < 0 ||
    x >= canvas.width ||
    y >= canvas.height ||
    snake.some((segment, index) => index > 0 && segment.x === x && segment.y === y)
  );
}

// Boucle du jeu
function gameLoop() {
  const head = { x: snake[0].x + direction.x * cellSize, y: snake[0].y + direction.y * cellSize };

  // Vérifie si le serpent se mord lui-même ou touche le bord
  if (isCollision(head.x, head.y)) {
    alertbox.render({
        alertIcon: 'error',
        title: 'Tu as Perdu! ',
        message: `Ton score est ${score}.`,
        btnTitle: 'Rejouer',
        border:true
    });;
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        console.log("Enter");
      }
    })
    clearInterval(gameInterval);
    return;
  }

  snake.unshift(head); // Ajouter une nouvelle tête

  // Vérifie si le serpent mange la nourriture
  if (head.x === food.x && head.y === food.y) {
    score++; // Augmenter le score
    scoreCounter.textContent = score; // Met à jour le score
    generateFood();
  } else {
    snake.pop(); // Supprimer la queue si aucune nourriture n'est mangée
  }

  // Dessiner le damier en arrière-plan
  drawCheckerboard();

  // Dessiner la nourriture et le serpent
  drawCell(food.x, food.y, "red"); // Nourriture
  snake.forEach((segment) => drawCell(segment.x, segment.y, "blue")); // Serpent
}

// Gérer les touches directionnelles
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -1 };
  if (e.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 1 };
  if (e.key === "ArrowLeft" && direction.x === 0) direction = { x: -1, y: 0 };
  if (e.key === "ArrowRight" && direction.x === 0) direction = { x: 1, y: 0 };
});

// Afficher le damier dès le chargement de la page
drawCheckerboard(); // Ajouté ici pour afficher le damier immédiatement

// Démarrer le jeu
document.getElementById("startButton").addEventListener("click", () => {
  snake = [{ x: 200, y: 200 }]; // Réinitialise le serpent
  direction = { x: 0, y: 0 }; // Réinitialise la direction
  score = 0; // Réinitialise le score
  generateFood(); // Génère une nouvelle nourriture
  clearInterval(gameInterval); // Stoppe toute partie en cours
  gameInterval = setInterval(gameLoop, 100); // Lance une nouvelle partie
});
