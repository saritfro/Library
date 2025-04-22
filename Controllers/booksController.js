const user = require("../models/usersModel");
const book = require("../models/booksModel");

/**
 * Retrieves a book by its ID.
 * @param {Object} req - The request object containing bookId.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function getBook(req, res) {
    try {
        let bookId = req.params.bookId; // Assuming the parameter is named bookId
        console.log(bookId);
        const c = await book.find({ bookId: bookId }); // Search for the book by ID
        if (!c) {
            return res.status(404).send({ message: "Book not found" }); // Handle case where the book is not found
        }
        res.send(c);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving book", error });
    }
}

async function getAllBooks(req, res) {
    try {
       
        const c = await book.find({ }); // Search for the book by ID
        if (!c) {
            return res.status(404).send({ message: "No books" }); // Handle case where the book is not found
        }
        res.send(c);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving books", error });
    }
}



/**
 * Creates a new book entry in the database.
 * @param {Object} req - The request object containing the book data in the body.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function postBook(req, res) {
    try {
        const c = new book(req.body); // Create a new book instance with the request body
        console.log(req.body);
        await c.save(); // Save the new book to the database
        res.status(201).send(c); // Return a 201 status code for successful creation
    } catch (error) {
        res.status(500).send({ message: "Error saving book", error });
    }
}

/**
 * Updates the lender of a book by its ID.
 * @param {Object} req - The request object containing parameters for bookId and userId.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function putBook(req, res) {
    try {
        let { bookId, userId ,lendingDate} = req.params; // Extract bookId and userId from request parameters
        const c = await book.findOneAndUpdate({ bookId: bookId }, { $set: { Lender: userId ,lendingDate:Date.now} }, { new: true });
        if (!c) {
            return res.status(404).send({ message: "Book not found for update" }); // Handle case where the book is not found
        }
        res.send(c);
    } catch (error) {
        res.status(500).send({ message: "Error updating book", error });
    }
}

/**
 * Deletes a book by its ID.
 * @param {Object} req - The request object containing the bookId parameter.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function deleteBook(req, res) {
    try {
        let bookId = req.params.bookId; 
        const deletedBook = await book.findOneAndDelete({ bookId: bookId });
        if (!deletedBook) {
            return res.status(404).send({ message: "Book not found for deletion" }); // Handle case where the book is not found
        }
        res.send({ message: "Book deleted successfully", deletedBook });
    } catch (error) {
        res.status(500).send({ message: "Error deleting book", error });
    }
}

module.exports = { postBook, getBook, putBook, deleteBook ,getAllBooks};
