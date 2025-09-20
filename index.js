// Initial variables
var debug = false;

// constants
const PORT = 8080;
const STATE_FILE_PATH = "data/state.txt";

// Parse arguements
const args = process.argv;
args.forEach(arg => {
  if (arg.includes('=')) {
    const [key, value] = arg.split('=');
    if (key == 'debug') {
        debug = value == 'true';
    }
  }
});

// Configure Node JS
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'site')));

// Render main page
app.get('/', (req, res) => {
    fs.readFile(STATE_FILE_PATH, 'utf8', (err, state) => {
        if (err) {
            if (debug) {
                console.error("Error reading state file: " + STATE_FILE_PATH, err);
            }
            return res.status(500).send("Error reading state file: " + STATE_FILE_PATH);
        }
        if (debug) {
            console.log("Value from state value: " + state);
        }
        res.render('index', { state: state.trim() });
    });
});

// Handle calculation API requests
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;

    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    // Perform the requested operation
    fs.readFile("data/state.txt", 'utf8', (err, state) => { 
        if (err) {
            console.error("Error reading file:", err);
            return;
            }
        switch (operation) {
            case 'add':
                result = number1 + number2;
                break;
            case 'subtract':
                result = number1 - number2;
                break;
            case 'multiply':
                result = number1 * number2;
                break;
            case 'divide':
                if (number2 !== 0) {
                    result = number1 / number2;
                } else {
                    result = "Error: Division by zero";
                }
                break;
            default:
                result = "Invalid operation";
        }
        if (state == '1') {
            console.log("Retain result")
        }
        // Send the result back to the frontend
        res.send({ result, state });
    });
});

// Handle retain value toggle button API requests
app.post('/retain', (req, res) => {

    let state = '0'

    fs.readFile("data/state.txt", 'utf8', (err, data) => { 
        if (err) {
            console.error("Error reading file:", err);
            return;
            }
        switch (data) {
            case '0':
                console.log("value is 0");
                state = '1';
                break;
            case '1':
                console.log("value is 1");
                state = '0';
                break;
        }
        fs.writeFile("data/state.txt", state, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
            }
        console.log("File written successfully!");
        res.send({ state });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});