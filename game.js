var gamePattern = [];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];

var level=1;
var stated=true;
$(document).on("keypress",function(){
  if(stated){
    $("#level-title").html("Level "+level);
    nextSequence();
    stated=false;
  }
});
function nextSequence() {

  $("#level-title").html("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4) ;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
    console.log(gamePattern);
  playMusic(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}

function playMusic(randomChosenColour) {
  var audio=new Audio("sounds/"+randomChosenColour+".mp3");
  audio.play();
  }
function callbtn(){
  var userChosenColour =($(this).attr("id"));
  console.log(userClickedPattern);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playMusic(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length)-1);

  console.log(userClickedPattern);
}
$(".btn").on("click",callbtn);

function animatePress(key){
  $("#"+key).addClass("pressed");
  setTimeout(function(){
    $("#"+key).removeClass("pressed");
  },100);
}
function checkAnswer(currentLevel){
  if((gamePattern.length===userClickedPattern.length)&&(gamePattern[gamePattern.length-1]===userClickedPattern[currentLevel]))
  {
    userClickedPattern.length=0;level++;
    nextSequence();
  }
  else{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    // $(".btn").on("click",callbtn);
    }
    else{
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
  }
}
function startOver(){
level=1;stated=true;gamePattern.length=0;
userClickedPattern.length=0;
}
