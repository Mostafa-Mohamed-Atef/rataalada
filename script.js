// Initial Batman messages
var i = 0;
var j = 0;
var txt = ["<?> Haven't a clue?", "<?> Let's play a game", "<?> Just me and you"];
var speed = 100;
var BatmanResponses = {
  default: ["I am Batman.", "Gotham needs me.", "Let's solve a mystery."],
  hello: ["Hello, friend!", "Greetings!", "Hi there!"],
  batman: ["I am the night.", "I'm vengeance.", "Gotham depends on me."],
  game: ["Let's play a riddle.", "You want to challenge me?", "I'm up for a game!"]
};
var typingIndex = 0; // For Batman response typing animation
var typingSpeed = 25; // Speed of Batman typing animation

// Function to start the initial Batman chat
function startChat() {
  if (j < txt.length) {
    if (i < txt[j].length) {
      document.getElementById("startMessage").innerHTML += txt[j].charAt(i);
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

// Start the chat
startChat();

// Event listener for user input
document.getElementById('batmanTalks').addEventListener('change', function() {
  var userInput = this.value; // Get user input
  displayUserInput(userInput); // Display user input in the terminal
  this.value = ''; // Clear the input field
  setTimeout(() => {
    generateBatmanResponse(userInput); // Generate Batman response based on user input
  }, 500); //**el 500 deh m3naha 0.5 seconds kda y3ny my5lesh el Batman ytklm we akno byfkr (for realism)**
  scrollToBatmantom(); // Scroll chat to the Batmantom
});

// Function to display user's input in the terminal
function displayUserInput(input) {
  var userMessage = document.createElement('p');
  userMessage.textContent = '> ' + input;
  document.getElementById('startMessage').appendChild(userMessage);
}

// Function to generate and animate the Batman response typing (Also Adding a new line)
function generateBatmanResponse(userInput) {
  var BatmanMessage = document.createElement('p');
  document.getElementById('startMessage').appendChild(BatmanMessage); // Append new <p> for Batman response
  
  // Determine the Batman's response based on keywords
  var response = getBatmanResponse(userInput.toLowerCase());
  typeBatmanResponse(response, BatmanMessage); // Pass the new <p> element for typing animation
}

// Function to select a response based on user input
function getBatmanResponse(input) {
  if (input.includes('hello')) {
    return BatmanResponses.hello[Math.floor(Math.random() * BatmanResponses.hello.length)];
  } else if (input.includes('batman')) {
    return BatmanResponses.batman[Math.floor(Math.random() * BatmanResponses.batman.length)];
  } else if (input.includes('game')) {
    return BatmanResponses.game[Math.floor(Math.random() * BatmanResponses.game.length)];
  } else {
    return BatmanResponses.default[Math.floor(Math.random() * BatmanResponses.default.length)];
  }
}

// Function to type out the Batman's response character by character
function typeBatmanResponse(response, element) {
  if (typingIndex < response.length) {
    element.innerHTML += response.charAt(typingIndex);
    typingIndex++;
    setTimeout(function() {
      typeBatmanResponse(response, element); // Continue typing the next character
    }, typingSpeed);
  } else {
    typingIndex = 0; // Reset index for the next message
  }
}

// Function to scroll to the Batmantom of the chatbox as new messages are added
function scrollToBatmantom() {
  var chatbox = document.getElementById('chatbox');
  chatbox.scrollTop = chatbox.scrollHeight;
}
