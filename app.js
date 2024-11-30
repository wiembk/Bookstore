const express = require('express');
const bodyParser = require('body-parser');
const {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBookReview,
    addOrModifyBookReview,
    deleteBookReview
} = require('./controllers/bookController');
const { registerUser, loginUser } = require('./controllers/userController');

const app = express();
app.use(bodyParser.json());

// Book Routes
app.get('/books', getAllBooks); // Get all books
app.get('/books/:isbn', getBookByISBN); // Get book by ISBN
app.get('/books/author/:author', getBooksByAuthor); // Get books by author
app.get('/books/title/:title', getBooksByTitle); // Get books by title
app.get('/books/review/:isbn', getBookReview); // Get book review
app.put('/books/review/:isbn', addOrModifyBookReview); // Add/modify book review
app.delete('/books/review/:isbn', deleteBookReview); // Delete book review

// User Routes
app.post('/register', registerUser); // Register user
app.post('/login', loginUser); // Login user

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
