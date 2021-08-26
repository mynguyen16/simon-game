//alert("work");
var buttonColors = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern = [];
var level = 0;
var started = false;
function nextSequence(){
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var chosenButton = "#" +randomChosenColor;
  $(chosenButton).fadeOut(100).fadeIn(100);
  playSound("sounds/"+randomChosenColor+".mp3");
}
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound("sounds/"+userChosenColor+".mp3");
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(source){
  var audio = new Audio(source);
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColor).removeClass("pressed");},100);
}

$(document).on("keypress",function(){
  if(!started){
    $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
  }
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
          console.log("success");

          if(userClickedPattern.length === gamePattern.length)
          {
            setTimeout(function(){
            nextSequence();
          },1000);}

    }else {

    playSound("sounds/wrong.mp3");
    $("h1").text("Over");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    startOver();
}

}
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
