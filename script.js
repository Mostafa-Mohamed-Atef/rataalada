// Initial Batman messages
// var i = 0;
// var j = 0;
// var speed = 100;
// var typingIndex = 0; // For Batman response typing animation
// var typingSpeed = 50; // Speed of Batman typing animation

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
document.getElementById('batmanTalks').addEventListener('input', function() { // Changed 'change' to 'input'
  var userInput = this.value; // Get user input
  displayUserInput(userInput); // Display user input in the terminal
  this.value = ''; // Clear the input field
  setTimeout(() => {
    generateBatmanResponse(userInput); // Generate Batman response based on user input
  }, 500); // Simulate thinking time
});

// Function to display user's input in the terminal
function displayUserInput(input) {
  var userMessage = document.createElement('p');
  userMessage.textContent = '> ' + input;
  document.getElementById('startMessage').appendChild(userMessage);
}

// var BatmanResponses = {
//   default: ["I am Batman.", "Gotham needs me.", "Let's solve a mystery."],
//   hello: ["Hello, friend!", "Greetings!", "Hi there!"],
//   batman: ["I am the night.", "I'm vengeance.", "Gotham depends on me."],
//   game: ["Let's play a riddle.", "You want to challenge me?", "I'm up for a game!"]
// };

// Function to generate and animate the Batman response typing (Also Adding a new line)
function generateBatmanResponse(userInput) {
  var BatmanMessage = document.createElement('p');
  document.getElementById('startMessage').appendChild(BatmanMessage); // Append new <p> for Batman response
  
  // Determine the Batman's response based on keywords
  var response = getBatmanResponse(userInput.toLowerCase());
  typeBatmanResponse(response, BatmanMessage); // Pass the new <p> element for typing animation
}

const groq = new Groq({ apiKey: "m3aya key bs 3aiz azbt el input w eloutput"});

function getBatmanResponse(input) {
  try {
    const chatCompletion = groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are the riddler in the batman movie that released in 2022 answering inputs from batman and answering with dark riddles",
        },
        {
          role: "user",
          content: input,
        },
      ],
      model: "llama3-8b-8192",
    });

    return chatCompletion.choices[0]?.message?.content || "No response generated";
  } catch (error) {
    console.error("Error getting response:", error);
    return "An error occurred while processing your request"; // Improved user feedback
  }
}

// Function to type out the Batman's response character by character
function typeBatmanResponse(response, element) {
  if (chatState.typingIndex < response.length) {
    element.innerHTML += response.charAt(chatState.typingIndex);
    chatState.typingIndex++;
    setTimeout(function() {
      typeBatmanResponse(response, element); // Continue typing the next character
    }, chatState.typingSpeed);
  } else {
    chatState.typingIndex = 0; // Reset index for the next message
  }
}

// Function to scroll to the Batmantom of the chatbox as new messages are added
function scrollToBatmantom() {
  var chatbox = document.getElementById('chatbox');
  chatbox.scrollTop = chatbox.scrollHeight;
}
