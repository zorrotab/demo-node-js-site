const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8080;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded data (forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., CSS, JS) from the 'site' directory
app.use(express.static(path.join(__dirname, 'site')));

// Route for rendering the main page
app.get('/', (req, res) => {
    // Read state from the 'state.txt' file
    fs.readFile('data/state.txt', 'utf8', (err, state) => {
        if (err) {
            console.error("Error reading state file:", err);
            return res.status(500).send('Error reading state file.');
        }

        // Render the EJS view and pass the 'state' value
        res.render('index', { state: state.trim() });
    });
});

// API route for calculation
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;

    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    // Perform the requested operation
    fs.readFile('data/state.txt', 'utf8', (err, state) => { 
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
                    result = 'Error: Division by zero';
                }
                break;
            default:
                result = 'Invalid operation';
        }
        if (state == "1") {
            console.log("Retain result")
        }
        // Send the result back to the frontend
        res.send({ result, state });
    });
});

// API route for calculation
app.post('/retain', (req, res) => {

    let state = "0"

    fs.readFile('data/state.txt', 'utf8', (err, data) => { 
        if (err) {
            console.error("Error reading file:", err);
            return;
            }
        switch (data) {
            case '0':
                console.log('value is 0');
                state = "1";
                break;
            case '1':
                console.log('value is 1');
                state = "0";
                break;
        }
        fs.writeFile('data/state.txt', state, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
            }
        console.log('File written successfully!');
        res.send({ state });
        });
    });
});

app.get('/check-for-reload', (req, res) => {
    // Determine if a reload is needed based on server-side logic

    const state = req.body;
    console.log(state)

    const shouldReload = true; 
    res.json({ shouldReload });
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});