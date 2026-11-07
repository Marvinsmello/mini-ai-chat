// ---------------------------------------------
// Mini AI Chat - app.js
// ---------------------------------------------

// An object to keep my settings together
const settings = {
  keyName: "openrouter_api_key",
  url: "https://openrouter.ai/api/v1/chat/completions",
  model: "openrouter/free"
};

// Find the elements on the page (getElementById)
const keyInput = document.getElementById("api-key");
const saveButton = document.getElementById("save-key");
const forgetButton = document.getElementById("forget-key");
const keyMessage = document.getElementById("key-message");
const conversation = document.getElementById("conversation");
const statusText = document.getElementById("status");
const form = document.getElementById("question-form");
const questionBox = document.getElementById("question");
const sendButton = document.getElementById("send");

// The key is also kept in memory in this variable
let apiKey = "";

// ----- Functions that change the page -----

// Show a message under the status label
function setStatus(text, isError) {
  statusText.innerHTML = "Status: " + text;
  if (isError) {
    statusText.className = "status error";
  } else {
    statusText.className = "status";
  }
}

// Show a message under the key input
function setKeyMessage(text, isError) {
  keyMessage.innerHTML = text;
  if (isError) {
    keyMessage.className = "note error";
  } else {
    keyMessage.className = "note";
  }
}

// Add a question or an answer to the conversation
// role is "user" or "assistant"
function addMessage(role, text) {
  const box = document.createElement("div");
  box.className = "message " + role;

  const who = document.createElement("span");
  who.className = "who";
  if (role === "user") {
    who.textContent = "You";
  } else {
    who.textContent = "Assistant";
  }

  const body = document.createElement("span");
  // textContent instead of innerHTML so the answer is shown as plain text
  body.textContent = text;

  box.appendChild(who);
  box.appendChild(body);
  conversation.appendChild(box);
}

// Turn an HTTP status number into a message people can understand
function getErrorMessage(statusNumber) {
  if (statusNumber === 401 || statusNumber === 403) {
    return "Your API key was rejected. Check the key and save it again.";
  } else if (statusNumber === 429) {
    return "Too many requests or the free limit was reached. Wait a bit and try again.";
  } else if (statusNumber >= 500) {
    return "The service is not available right now. Try again later.";
  } else {
    return "The request failed (error " + statusNumber + "). Try again.";
  }
}

// ----- API key: save, forget, load -----

function saveKey() {
  const value = keyInput.value.trim();

  if (value === "") {
    setKeyMessage("Please enter your API key before saving.", true);
    return;
  }

  localStorage.setItem(settings.keyName, value);
  apiKey = value;
  setKeyMessage("Key saved in this browser (it is not shown here).", false);
}

function forgetKey() {
  localStorage.removeItem(settings.keyName);
  apiKey = "";
  keyInput.value = "";
  setKeyMessage("Key removed from this browser.", false);
}

function loadKey() {
  const saved = localStorage.getItem(settings.keyName);

  // If nothing was saved, getItem gives null
  if (saved !== null) {
    apiKey = saved;
    keyInput.value = saved;   // it is a password input so it shows dots
    setKeyMessage("Saved key restored in this browser.", false);
  }
}

// ----- Sending a question -----

async function sendQuestion(event) {
  // stop the form from reloading the page
  event.preventDefault();

  const question = questionBox.value.trim();

  // Checks before sending
  if (question === "") {
    setStatus("Please type a question first.", true);
    return;
  }
  if (apiKey === "") {
    setStatus("Please save your API key first.", true);
    return;
  }

  // Show the question, clear the box, show Thinking...
  addMessage("user", question);
  questionBox.value = "";
  setStatus("Thinking...", false);
  sendButton.disabled = true;   // so I can't click Send twice

  try {
    // Send the question to OpenRouter
    const response = await fetch(settings.url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: settings.model,
        messages: [{ role: "user", content: question }],
        stream: false
      })
    });

    // response.ok is false when the server sends an error
    if (!response.ok) {
      throw new Error(getErrorMessage(response.status));
    }

    // Turn the answer from JSON text into a JavaScript object
    const data = await response.json();
    const answer = data.choices[0].message.content;

    if (!answer) {
      throw new Error("The model sent an empty answer. Try again.");
    }

    addMessage("assistant", answer);
    setStatus("Ready", false);

  } catch (error) {
    // fetch gives a TypeError when there is no network
    if (error instanceof TypeError) {
      setStatus("Network problem. Check your connection and try again.", true);
    } else {
      setStatus(error.message, true);
    }

  } finally {
    // finally always runs, so Send never stays disabled
    sendButton.disabled = false;
  }
}

// ----- Connect the buttons to the functions -----
saveButton.addEventListener("click", saveKey);
forgetButton.addEventListener("click", forgetKey);
form.addEventListener("submit", sendQuestion);

// Run once when the page opens
loadKey();
