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
        generateBatmanResponse(userInput); 
      }, 500); 
    }
  }
});

// Function to display user's input in the terminal
function displayUserInput(input) {
  var userMessage = document.createElement('p');
  userMessage.textContent = '> ' + input;
  document.getElementById('startMessage').appendChild(userMessage);
}

// Function to generate and animate the Batman response typing
async function generateBatmanResponse(userInput) {
  var BatmanMessage = document.createElement('p');
  document.getElementById('startMessage').appendChild(BatmanMessage); 
  
  // Get the response asynchronously
  const response = await getBatmanResponse(userInput);
  typeBatmanResponse(response, BatmanMessage); 
}

// Function to get Batman's response using the Groq API
const groq = new Groq({ apiKey: "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"});
async function getBatmanResponse(input) {
  console.log(input);

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are the Riddler in the Batman movie (2022), responding to inputs from Batman with dark riddles.",
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
    return "An error occurred while processing your request"; 
  }
}

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