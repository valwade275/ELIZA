# 📄 Documentation for ELIZA Chatbot Project  
Valerie Wade

This document provides technical documentation for *Valerie's ELIZA-inspired chatbot*, a conversational agent built using HTML, CSS, and JavaScript. Inspired by Joseph Weizenbaum’s original ELIZA program, this project simulates a non-directive therapist using simple natural language processing techniques.

---

## 🧠 Constants

The following constants define the bot's response logic and conversation strategy:

| Name | Description | Type |
|------|-------------|------|
| **clarificationResponses** | Responses used when ELIZA needs to prompt the user for more detail or rephrase their message. | Array of Strings |
| **exclamationResponses** | Predefined responses for user input ending in an exclamation mark. These aim to defuse high emotional input. | Array of Strings |
| **genericResponses** | Default responses used when no specific rule is matched. These ensure the conversation keeps flowing. | Array of Strings |
| **pointOfViewSwitches** | Dictionary mapping first-person pronouns to second-person equivalents and vice versa to simulate reflective listening. | Object |
| **questionResponses** | Responses triggered when the user's input ends with a question mark. These aim to turn questions back on the user. | Array of Strings |
| **questionStarts** | A list of common interrogative phrases that help ELIZA detect a question even without punctuation. | Array of Strings |

---

## 🔧 Functions

### `createQuestion(patientLine)`
Generates a reflective question based on user input. This function often uses the original line, transformed with point-of-view switches.

- **Parameters**:  
  - `patientLine` (String): The user's input line.  
- **Returns**:  
  - (String) A reflective question for ELIZA to respond with.

### `generateResponse(patientLine)`
Core logic function that determines how to respond based on the structure and tone of user input.

- **Parameters**:  
  - `patientLine` (String): Raw user input.  
- **Returns**:  
  - (String) ELIZA’s response, selected from one of the available strategies.

### `lastChar(myString)`
Returns the final character of a string. This helps ELIZA determine whether the input is a question or exclamation.

- **Parameters**:  
  - `myString` (String): Input string.  
- **Returns**:  
  - (String) The last character of the input.

### `randomElement(myArray)`
Utility function that returns a random item from an array. Used to vary ELIZA’s responses.

- **Parameters**:  
  - `myArray` (Array): Array of strings.  
- **Returns**:  
  - (String) A randomly selected element from the array.

### `swapPOV(sentence)`
Switches first-person pronouns in a sentence to second-person equivalents to simulate empathy.

- **Parameters**:  
  - `sentence` (String): Input string from the user.  
- **Returns**:  
  - (String) Modified string with point-of-view flipped.

---

## 🗂️ Enumeration

This ELIZA bot uses internal flags to categorize user inputs and determine an appropriate response strategy:

| Property Name | Description | Value |
|---------------|-------------|--------|
| **Generic** | Default fallback response with no reference to user content | `0` |
| **Question** | Response selected for user questions | `1` |
| **Exclamation** | Response used for emotionally charged or exclamatory statements | `2` |
| **PointOfView** | Reflective response using user's own words with POV transformation | `3` |

---

## 🖥️ User Interface Overview

- **HTML**: The structure includes labeled sections for the introduction, input form, and conversation log.
- **CSS**: Styling creates a clean, modern interface with attention to color contrast and spacing.
- **JavaScript**: Powers the chatbot logic, response selection, and interaction with the DOM.

---

## 🔍 Example Interaction

**User**: *I feel so frustrated today!*  
**ELIZA**: *Why do you think you're feeling so frustrated?*

**User**: *Do you think I should eat pizza for dinner?*  
**ELIZA**: *Why are you asking if you should eat pizza for dinner?*

---

## 🧩 Opportunities for Extension

This implementation is intentionally simple to demonstrate core logic and clarity. Possible future improvements include:

- Memory-based responses  
- Better natural language parsing  
- Speech recognition and voice output  
- Logging for session transcripts  
- Custom avatars or visual representations  

---

## 🔗 Links

- [ELIZA on Wikipedia](https://en.wikipedia.org/wiki/ELIZA)  
- [Live Demo in Browser](https://valwade275.github.io/ELIZA)  
- [Source Code on GitHub](https://github.com/valwade275/ELIZA)
