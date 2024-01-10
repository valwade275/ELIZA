// String to hold the therapy discussion 
var therapySession;

// Generic responses
const genericResponses = [
    "Uh-huh.",
    "Go on.",
    "Why do you say that?",
    "That's very interesting.",
    "Fascinating...",
    "Keep talking."];

// Responses for when the therapist is asked a question
const questionResponses = [
    "Why do you ask that?",
    "What do <em>you</em> think?",
    "That's an interesting question.",
    "How long have you wanted to know that?",
    "That depends on who you ask."];

// Responses for when the user ends a sentence with exclamation
const exclamationResponses = [
    "Please calm down.",
    "No need to get so excited.",
    "You sound very passionate about that.",
    "Would you care to restate that in a more neutral tone?"];

// Mapping between 1st person and 3rd person
    const povSwitches = {
    "I": "you",
    "i": "you",
    "me": "you",
    "myself": "yourself",
    "am": "are",
    "my": "your",
    "My": "your",
    "I'm": "you're",
    "I'd": "you'd",
    "I'll": "you'll",
    "i'm": "you're",
    "i'd": "you'd",
    "i'll": "you'll"
}

// Beginnings of questions
const questionStarts = [
    "Why do you say that",
    "How is it that",
    "Can you tell me more about how",
    "And why is it that",
    "Can you explain why you say that"];

// Create the first line of the conversation.
function initialize() {
    therapySession = "<p> Hello! I am Eliza, your therapist. What is troubling you today? </p>";
    conversation.innerHTML = therapySession;
}

// This function handles the button click.
// It will take the textbox value and add it to the therapySession variable.
function submitLine() {
    var patientLine = textbox.value;
    therapySession += "<p> <em>" + patientLine + "</em> </p>";

    // Create a new variable to hold the therapist’s line and set it to respond to 
    // general statements, questions, and exclamations, using our new function.
    var therapistLine;
    if (lastChar(patientLine) == "?") {
        therapistLine = randomElement(questionResponses);
    } else if (lastChar(patientLine) == "!") {
        therapistLine = randomElement(exclamationResponses);
    } else {
        therapistLine = createQuestion(patientLine);
    }
    // Still no good response, so use a basic response.
    if (therapistLine == null) {
        therapistLine = randomElement(genericResponses);
    }

    // Add that new line to the therapySession array.
    therapySession += "<p>" + therapistLine + "</p>";
    conversation.innerHTML = therapySession;
}

// Generate random responses (random element in an array).
function randomElement(myArray) {
    var index = Math.floor(Math.random() * myArray.length);
    return myArray[index];
}

// Determine a question or exclamation mark to handle responses.
function lastChar(myString) {
    return myString.substring(myString.length - 1);
}

// Generate a more sophisticated response.
function createQuestion(patientLine) {
    // Check if "you" is there. Will also catch "your" and "yourself".
    if (patientLine.toLowerCase().indexOf("you") != -1) {
        // Can't handle this one. Return null.
        return null;
    }

    // If there's a period at the end, remove it.
    if (lastChar(patientLine) == ".") {
        patientLine = patientLine.substring(0, patientLine.length - 1);
    }

    // Add spaces at beginning and end.
    var modifiedLine = " " + patientLine + " ";

    // Loop through all properties and replace 1st person words with 2nd person words.
    var found = false;
    for (var property in povSwitches) {
        if (povSwitches.hasOwnProperty(property)) {
            var modifiedProperty = " " + property + " ";
            if (modifiedLine.indexOf(modifiedProperty) != -1) {
                modifiedLine = modifiedLine.replace(modifiedProperty,
                    " " + povSwitches[property] + " ");
                found = true;
            }
        }
    }

    // If a replacement was made, then return a question.
    if (found) {
        modifiedLine = modifiedLine.substring(0, modifiedLine.length - 1);

        // Create the full question and return it.
        return randomElement(questionStarts) + " " + modifiedLine + "?";
    }
    // No replacement was made, so return null.
    return null;
}
