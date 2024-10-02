//start chat
var i = 0;
var j = 0;
var txt = ["<?> Haven't a clue?", "<?> let's play a game", "<?> just me and you"];
var speed = 100;

function startChat() {
  if (j < txt.length) {
    if (i < txt[j].length) {
      document.getElementById("startMessage").innerHTML +=  txt[j].charAt(i);
      i++;
      setTimeout(startChat, speed);
    } else {
      document.getElementById("startMessage").innerHTML += "<br>";
      j++;
      i = 0;
      setTimeout(startChat, speed);
    }
  }
}
startChat(); 
document.getElementById('batmanTalks').addEventListener('change', function() {
  var userInput = this.value; // Assign input value to variable
  console.log(userInput);
});

