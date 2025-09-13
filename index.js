const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = 8080;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'site')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API route for calculation
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;

    // Convert input to numbers
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    // Perform the requested operation
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

    // Send the result back to the frontend
    res.send({ result });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});