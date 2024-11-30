const fs = require('fs');

// Utility to read and parse books.json
const getBooksData = () => {
    const data = fs.readFileSync('./data/books.json');
    return JSON.parse(data);
};

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = getBooksData();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books.' });
    }
};

// Get book by ISBN
const getBookByISBN = async (req, res) => {
    try {
        const { isbn } = req.params;
        const books = getBooksData();
        const book = books.find((b) => b.isbn === isbn);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book by ISBN.' });
    }
};

// Get books by author
const getBooksByAuthor = async (req, res) => {
    try {
        const { author } = req.params;
        const books = getBooksData();
        const filteredBooks = books.filter((b) => b.author.toLowerCase().includes(author.toLowerCase()));
        res.json(filteredBooks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books by author.' });
    }
};

// Get books by title
const getBooksByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const books = getBooksData();
        const filteredBooks = books.filter((b) => b.title.toLowerCase().includes(title.toLowerCase()));
        res.json(filteredBooks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books by title.' });
    }
};

// Get book review
const getBookReview = async (req, res) => {
    try {
        const { isbn } = req.params;
        const books = getBooksData();
        const book = books.find((b) => b.isbn === isbn);
        if (book && book.review) {
            res.json({ review: book.review });
        } else {
            res.status(404).json({ message: 'Review not found for this book.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book review.' });
    }
};

// Add/modify book review
const addOrModifyBookReview = async (req, res) => {
    try {
        const { isbn } = req.params;
        const { review } = req.body;

        const books = getBooksData();
        const book = books.find((b) => b.isbn === isbn);
        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        book.review = review;
        fs.writeFileSync('./data/books.json', JSON.stringify(books, null, 4));
        res.json({ message: 'Review added/modified successfully.', book });
    } catch (error) {
        res.status(500).json({ message: 'Error adding/modifying review.' });
    }
};

// Delete book review
const deleteBookReview = async (req, res) => {
    try {
        const { isbn } = req.params;

        const books = getBooksData();
        const book = books.find((b) => b.isbn === isbn);
        if (!book || !book.review) {
            return res.status(404).json({ message: 'Review not found for this book.' });
        }

        delete book.review;
        fs.writeFileSync('./data/books.json', JSON.stringify(books, null, 4));
        res.json({ message: 'Review deleted successfully.', book });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review.' });
    }
};

module.exports = {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBookReview,
    addOrModifyBookReview,
    deleteBookReview
};
