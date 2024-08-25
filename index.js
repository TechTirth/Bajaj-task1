const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve the frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Variable to store the processed data
let processedData = null;

// POST method to process the data
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = "john_doe_17091999";
    const email = "john@xyz.com";
    const roll_number = "ABCD123";

    let numbers = [];
    let alphabets = [];
    let highest_lowercase_alphabet = '';

    // Validate input data
    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            user_id,
            message: "Invalid input, 'data' should be an array."
        });
    }

    try {
        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (/^[a-zA-Z]$/.test(item)) {
                alphabets.push(item);
                if (item === item.toLowerCase()) {
                    if (!highest_lowercase_alphabet || item > highest_lowercase_alphabet) {
                        highest_lowercase_alphabet = item;
                    }
                }
            }
        });

        // Prepare the response data
        processedData = {
            is_success: true,
            user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : []
        };

        res.json(processedData);
    } catch (error) {
        res.status(500).json({
            is_success: false,
            user_id,
            message: "An error occurred while processing data."
        });
    }
});

// GET method to return the operation code
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
