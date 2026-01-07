let gamePattern = [];

let gameStart = false;
let level = 0;

let userClickedPattern = [];

const buttonColours = ['red', 'blue', 'green', 'yellow'];

function nextSequence() {
  const randomNumber = Math.round(Math.random() * 3);

  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour)
    .fadeIn(100)
    .fadeOut(1000)
    .fadeIn(1000);
  //   console.log(btnClick);
  console.log(randomChosenColour);

  playSound(randomChosenColour);

  level++;
  $('#level-title').text('Level ' + level);
}
// nextSequence();

$('.btn').click(function () {
  const userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  // console.log(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  const audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  setTimeout(function () {
    $('.btn').removeClass('pressed');
  }, 100);
}

$(document).keypress(function () {
  if (!gameStart) {
    $('#level-title').text('Level ' + level);
    nextSequence();

    gameStart = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log('Success!!');

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    // console.log('Wrong!!');

    const audio = new Audio('sounds/' + 'wrong' + '.mp3');
    audio.play();

    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);

    $('#level-title').text('Game Over, Press Any Key to Restart');

    startOver();
  }
}

function startOver() {
  console.log('Restart');
  level = 0;
  gamePattern = [];
  gameStart = false;
  userClickedPattern = [];
}

// 1. Create a new function called startOver().

// 2. Call startOver() if the user gets the sequence wrong.

// 3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
