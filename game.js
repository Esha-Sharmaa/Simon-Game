var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var track = false;
var level = 1;

// NEXT SEQUENCE FUNCTUION
function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("LEVEL" + level);
  level++;
}

// TO CHECK CLICK ON THE BUTTONS
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
// PLAY SOUND FUNCTION
function playSound(name) {
  var audioAddress = "/sounds/" + name + ".mp3";
  var audio = new Audio(audioAddress);
  audio.play();
}
/// AMIMATION ON THE BUTTONS
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 50);
}
// TO CHECK KEYPRESS
$(document).keypress(function () {
  if (!track) nextSequence();
  track = true;
});

// TO CHECK FOR WIN OR LOSE
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("h1").text("Game over press any key to restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);
    startOver();
  }
}
function startOver() {
  level = 1;
  track = false;
  gamePattern = [];
}
