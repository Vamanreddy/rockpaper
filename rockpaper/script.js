const choices = ['Rock', 'Paper', 'Scissors'];

const userImages = {
  Rock: 'images/png-transparent-rock-paper-scissors-computer-icons-scissors-game-white-face-thumbnail.png',
  Paper: 'images/paper.png',
  Scissors: 'images/sisor.png',
};

const computerImages = {
  Rock: './images/rock.png',
  Paper: 'images/paper2.png',
  Scissors: 'images/sissor2.png',
};

let userScore = 0;
let computerScore = 0;

// Set initial images to Rock when the page loads
window.onload = function() {
  resetImagesToInitial();
};

document.querySelectorAll('.choice').forEach(choice => {
  choice.addEventListener('click', function () {
    const userChoice = this.alt;
    const computerChoice = generateComputerChoice();

    // Shake both images
    shakeImages();

    // After the shake animation, reset the images and determine the winner
    setTimeout(() => {
      updateImages(userChoice, computerChoice);
      determineWinner(userChoice, computerChoice);

      // After the result is displayed, reset the images to Rock
      setTimeout(resetImagesToInitial, 1500);
    }, 500);  // Match the duration of the shake animation
  });
});

function generateComputerChoice() {
  const randomChoice = choices[Math.floor(Math.random() * choices.length)];
  return randomChoice;
}

function updateImages(userChoice, computerChoice) {
  document.getElementById('user-choice-img').src = userImages[userChoice];
  document.getElementById('computer-choice-img').src = computerImages[computerChoice];
}

function shakeImages() {
  const userImage = document.getElementById('user-choice-img');
  const computerImage = document.getElementById('computer-choice-img');

  // Reset both images to the Rock image during the shake
  userImage.src = userImages['Rock'];
  computerImage.src = computerImages['Rock'];

  // Add the shake-up-down animation
  userImage.classList.add('shake');
  computerImage.classList.add('shake');

  // Remove the shake class after the animation completes
  setTimeout(() => {
    userImage.classList.remove('shake');
    computerImage.classList.remove('shake');
  }, 500);  // Match the duration of the shake animation
}

function determineWinner(userChoice, computerChoice) {
  let resultText = '';

  if (userChoice === computerChoice) {
    resultText = "It's a draw!";
    playSound('draw-sound');
  } else if (
    (userChoice === 'Rock' && computerChoice === 'Scissors') ||
    (userChoice === 'Scissors' && computerChoice === 'Paper') ||
    (userChoice === 'Paper' && computerChoice === 'Rock')
  ) {
    resultText = 'You win!';
    userScore++;
    playSound('win-sound');
  } else {
    resultText = 'Computer wins!';
    computerScore++;
    playSound('lose-sound');
  }

  document.getElementById('result-text').textContent = resultText;
  document.getElementById('user-score').textContent = userScore;
  document.getElementById('computer-score').textContent = computerScore;
}

function resetImagesToInitial() {
  // Reset both images to Rock position
  document.getElementById('user-choice-img').src = userImages['Rock'];
  document.getElementById('computer-choice-img').src = computerImages['Rock'];
}

function playSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.play();
}
