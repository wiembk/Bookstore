const fs = require('fs');

// Utility to read and parse users.json
const getUsersData = () => {
    const data = fs.readFileSync('./data/users.json');
    return JSON.parse(data);
};

// Register a user
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = getUsersData();

        if (users.some((u) => u.username === username)) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        users.push({ username, password });
        fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 4));
        res.json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.' });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = getUsersData();

        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
            res.json({ message: 'Login successful.' });
        } else {
            res.status(401).json({ message: 'Invalid credentials.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user.' });
    }
};

module.exports = { registerUser, loginUser };
