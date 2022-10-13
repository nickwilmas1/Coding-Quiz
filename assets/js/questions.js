// This is the question funstions that contain questions and the answers. They are in multidimensional array with inner array elements
var questions = [
    { 
        question: "What does console.log do?", 
        answers: [
            { text: "Prompts the user with question", correct: false },
            { text: "logs in console" , correct: true },
            { text: "alerts on page", correct: false },
            { text: "writes to document", correct: false }
        ]
    },
    { 
        question: "What symbol is used for arrays?", 
        answers: [
            { text: "{ }", correct: false },
            { text: "( )", correct: false },
            { text: "[ ]", correct: true },
            { text: "' '", correct: false }
        ]
    },
    { 
        question: "What does this command do: prompt('What is your name') ", 
        answers: [
            { text: "Pops up a box where user can type", correct: true },
            { text: "asks a question in the console", correct: false },
            { text: "Invalid statement", correct: false },
            { text: "Alerts user of this question", correct: false }
        ]
    },
    { 
        question: "What is a for loop?", 
        answers: [
            { text: "It is used to loop through the function", correct: false },
            { text: "It is used to loop through arrays", correct: true },
            { text: "It is used to loop through css", correct: false },
            { text: "None of the above", correct: false }
        ]
    }
];
