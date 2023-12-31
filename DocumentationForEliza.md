Documentation for Therapist Bot
Below is the documentation for Valerie's Therapist Bot, Eliza. 

## Constants

| Name     | Description     | Type     |
| -------- | --------------- | -------- |
| **exclamationResponses**    | Responses for when the user’s line ends with an exclamation point.  | Array of Strings  |
| **genericResponses**  | Responses to use when there is no better option.  | Array of strings  |
| **povSwitches**   | Mapping between first person and second person words. | Object    |
| **questionResponses** | Responses for when the user’s line ends with a question mark. | Array of strings |
| **questionStarts**    | First few words of a question.    | Array of strings  |

## Functions

**createQuestion(patientLine)**
Returns a question based on the patient’s line.
- Parameters:
    - patientLine
    Type: String
    Patient’s text to respond to
- Returns:
    Type: String
    Question based on the patient’s line

**lastChar(myString)**
Returns the last character in a string.
- Parameters:
    - myString
    Type: String
    String to return last character for
- Returns:
    Type: String
    Last character of the string

**randomElement(myArray)**
Returns a random element of an array
- Parameters:
    - myArray
    Type: Array
    Array with one or more elements
- Returns:
    Type: Whatever is in the array
    Random element from the array


## Enumeration
| Property Name     | Description     | Value     |
| -------- | --------------- | -------- |
| **Generic**   | Generic answer that does not make use of the patient response | 0 |
| **Question**  | Answer to a question  | 1 |
| **Exclamation**   | Answer to a patient response that ends with an exclamation point  | 2 |
| **PointOfView**   | Answer that makes use of the patient response by switching the point of view from first person to second person   | 3 |