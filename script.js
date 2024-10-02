var i = 0;
var j = 0;
var txt = ['<?> what is black and blue and DEAD all over?', "<?> YOU"];
var speed = 100;

function typeWriter() {
  if (j < txt.length) {
    if (i < txt[j].length) {
      document.getElementById("message").innerHTML += txt[j].charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      document.getElementById("message").innerHTML += "<br>";
      j++;
      i = 0;
      speed = 500;
      setTimeout(typeWriter, speed);
    }
  }
}
typeWriter();