// Store the HTML string representing the conversation
let therapySession = "";

// DOM references
const textbox = document.getElementById("textbox");
const conversation = document.getElementById("conversation");

// Generic responses
const genericResponses = [
  "Uh-huh.",
  "Go on.",
  "Why do you say that?",
  "That's very interesting.",
  "Fascinating...",
  "Keep talking.",
  "That sounds important—tell me more.",
  "It seems you’ve been thinking about this a lot.",
  "I’m curious—how long have you felt that way?",
  "That’s an insightful observation.",
  "You're clearly passionate about this.",
  "You’re connecting a few things here. Let’s explore that.",
  "That seems like it really affected you.",
  "It sounds like that’s been on your mind a lot.",
  "You’re thinking deeply—what else comes to mind?"
];

// Clarification responses
const clarificationResponses = [
  "What exactly do you mean by that?",
  "Could you give an example?",
  "How does that usually play out for you?",
  "When did you first notice this?",
  "Does this happen often?",
  "Can you walk me through that?",
  "And how do you typically respond in that situation?",
  "What do you think is at the root of that?"
];

// Responses for when the user asks a question
const questionResponses = [
  "Why do you ask that?",
  "What do <em>you</em> think?",
  "That's an interesting question.",
  "How long have you wanted to know that?",
  "That depends on who you ask."
];

// Responses for exclamations
const exclamationResponses = [
  "Please calm down.",
  "No need to get so excited.",
  "You sound very passionate about that.",
  "Would you care to restate that in a more neutral tone?"
];

// Point-of-view switches for transforming user input
const povSwitches = {
  "I": "you",
  "i": "you",
  "me": "you",
  "myself": "yourself",
  "am": "are",
  "my": "your",
  "My": "your",
  "I'm": "you're",
  "i'm": "you're",
  "I'd": "you'd",
  "i'd": "you'd",
  "I'll": "you'll",
  "i'll": "you'll"
};

// Starter phrases for therapist questions
const questionStarts = [
  "Why do you say that",
  "How is it that",
  "Can you tell me more about how",
  "And why is it that",
  "Can you explain why you say that"
];

// Initialize the chat window
function initialize() {
  therapySession = `<p>Hello! I am Dr. Eliza, your therapist. What is troubling you today?</p>`;
  conversation.innerHTML = therapySession;
  conversation.scrollTop = conversation.scrollHeight;
}

// Handle submission of user input
function submitLine() {
  const patientLine = textbox.value.trim();
  if (!patientLine) return; // Ignore blank input

  // Display user input
  therapySession += `<p><em>${patientLine}</em></p>`;

  // Determine appropriate response
  let therapistLine;
  const last = lastChar(patientLine);

  if (last === "?") {
    therapistLine = randomElement(questionResponses);
  } else if (last === "!") {
    therapistLine = randomElement(exclamationResponses);
  } else {
    therapistLine = createQuestion(patientLine);

    if (!therapistLine) {
      // 20% chance to use a clarification response
      therapistLine = Math.random() < 0.2
        ? randomElement(clarificationResponses)
        : randomElement(genericResponses);
    }
  }

  therapySession += `<p>${therapistLine}</p>`;

  // Limit total lines to prevent bloat
  const lines = therapySession.split("</p>");
  const MAX_LINES = 50;
  if (lines.length > MAX_LINES * 2) {
    therapySession = lines.slice(-MAX_LINES * 2).join("</p>");
  }

  // Update display
  conversation.innerHTML = therapySession;
  textbox.value = "";
  conversation.scrollTop = conversation.scrollHeight;
}

// Select a random item from an array
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Get last character of a string
function lastChar(str) {
  return str.length ? str.slice(-1) : "";
}

// Create a reflective therapist-style question
function createQuestion(patientLine) {
  if (patientLine.toLowerCase().includes("you")) {
    return null; // Avoid responding to direct references to the bot
  }

  let modifiedLine = patientLine.replace(/\.$/, ""); 
  let found = false;

  for (const key in povSwitches) {
    if (Object.prototype.hasOwnProperty.call(povSwitches, key)) {
      const regex = new RegExp(`\\b${key}\\b`, "gi");
      if (regex.test(modifiedLine)) {
        modifiedLine = modifiedLine.replace(regex, povSwitches[key]);
        found = true;
      }
    }
  }

  if (found) {
    return `${randomElement(questionStarts)} ${modifiedLine}?`;
  }

  return null;
}
