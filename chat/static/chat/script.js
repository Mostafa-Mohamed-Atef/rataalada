// import Groq from "groq-sdk/src/index.js";
// Initial Batman messages
var txt = ["<?> Haven't a clue?", "<?> Let's play a game", "<?> Just me and you"];

// Encapsulate variables within an object
const chatState = {
  i: 0,
  j: 0,
  typingIndex: 0,
  speed: 100,
  typingSpeed: 50,
};

// Function to start the initial Batman chat
function startChat() {
  if (chatState.j < txt.length) {
    if (chatState.i < txt[chatState.j].length) {
      document.getElementById("startMessage").innerHTML += txt[chatState.j].charAt(chatState.i);
      chatState.i++;
      setTimeout(startChat, chatState.speed);
    } else {
      document.getElementById("startMessage").innerHTML += "<br>";
      chatState.j++;
      chatState.i = 0;
      setTimeout(startChat, chatState.speed);
    }
  }
}

// Start the chat
startChat();

// Event listener for user input
document.getElementById('batmanTalks').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    var userInput = this.value.trim();
    if (userInput) {
      displayUserInput(userInput); 
      this.value = ''; 
      setTimeout(() => {
        // Send the user input to the server
        sendUserInputToServer(userInput);
      }, 500); 
    }
  }
});

// Function to send user input to the server
function sendUserInputToServer(input) {
  fetch("{% url 'home' %}", { // Adjust the URL to match your Django URL configuration
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken") // Ensure CSRF token is included
    },
    body: JSON.stringify({ user_input: input })
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    displayServerResponse(data.result);
  })
  .catch(error => console.error("Error sending input to server:", error));
}

// Function to display the server response
function displayServerResponse(response) {
  var serverMessage = document.createElement('p');
  serverMessage.textContent = response;
  document.getElementById('startMessage').appendChild(serverMessage);
}

// Function to get CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if this cookie string begins with the name we want
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Function to display user's input in the terminal
function displayUserInput(input) {
  var userMessage = document.createElement('p');
  userMessage.textContent = '> ' + input;
  document.getElementById('startMessage').appendChild(userMessage);
}

// Function to generate and animate the Batman response typing
// async function generateBatmanResponse(userInput) {
//   var BatmanMessage = document.createElement('p');
//   document.getElementById('startMessage').appendChild(BatmanMessage); 
  
//   // Get the response asynchronously
//   const response = await getBatmanResponse(userInput);
//   typeBatmanResponse(response, BatmanMessage); 
// }

// Function to type out the Batman's response character by character
function typeBatmanResponse(response, element) {
  if (chatState.typingIndex < response.length) {
    element.innerHTML += response.charAt(chatState.typingIndex);
    chatState.typingIndex++;
    setTimeout(function() {
      typeBatmanResponse(response, element); 
    }, chatState.typingSpeed);
  } else {
    chatState.typingIndex = 0; 
  }
}

// Function to scroll to the bottom of the chatbox as new messages are added
function scrollToBatmantom() {
  var chatbox = document.getElementById('chatbox');
  chatbox.scrollTop = chatbox.scrollHeight;
}
