const user = require("../Models/usersModel");
const book = require("../Models/booksModel");
const xlsx = require('xlsx');
const path=require("path");

const { error } = require("console");
/**
 * Retrieves a book by its ID.
 * @param {Object} req - The request object containing bookId.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function getBook(req, res) {
    try {
        let bookId = req.params.bookId; // Assuming the parameter is named bookId
        console.log(bookId);
        const c = await book.find({ bookId: bookId }).populate('Lender'); // Search for the book by ID
        if (!c) {
            return res.status(404).send({ message: "Book not found" }); // Handle case where the book is not found
        }
        res.send(c);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving book", error });
    }
}

async function getBooksFields(req, res) {  
      try {
        const fields = Object.keys(book.schema.paths)
            .filter(key => !["_id", "__v"].includes(key)); // מסנן שדות פנימיים

        res.json(fields);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch field names" });
    }
}

async function getAllBooks(req, res) {
    try {
       
        const c = await book.find({ }).populate('Lender'); // Search for the book by ID
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
        const c = await new book(req.body); // Create a new book instance with the request body
        console.log(req.body);
        await c.save(); // Save the new book to the database
        res.status(201).send(c); // Return a 201 status code for successful creation
    } catch (error) {
        res.status(500).send({ message: "Error saving book", error });
    }
}
// async function postCsv(req,res) {
//     console.log("")
//         if (!req.file) {
//           return res.status(400).send({ message: 'No file uploaded' });
//         }
      
//         const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
      
//         try {
//           const workBook = xlsx.readFile(filePath);
//           const workSheet = workBook.Sheets[workBook.SheetNames[0]];
//           const data = xlsx.utils.sheet_to_json(workSheet);
      
//           for (let d of data) {
//             const b = new book(d);
//             await b.save();
//           }
      
//           res.status(201).send({ message: 'Books uploaded successfully', data });
//         } catch (error) {
//           console.error(error);
//           res.status(500).send({ message: "Error saving books", error });
//         }
//       };
/**
 * Updates the lender of a book by its ID.
 * @param {Object} req - The request object containing parameters for bookId and userId.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function putBook(req, res) {//להוסיף עדכון שמעדכן כל דבר שרוצים
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
 * Updates the lender of a book by its ID.
 * @param {Object} req - The request object containing parameters for bookId and userId.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function putBookLender(req, res) {//להוסיף עדכון שמעדכן כל דבר שרוצים
    try {
        let { bookId, userId } = req.params; // Extract bookId and userId from request parameters
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
 * Updates the lender of a book by its ID.
 * @param {Object} req - The request object containing parameters for bookId and userId.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function putBook(req, res) {// שמעדכן כל דבר שרוצים
    try {
        const bookId=req.params.bookId;
        let update = req.body; // Extract bookId and userId from request parameters
        let c = await book.findOneAndUpdate({ bookId: bookId }, { $set: update},{new :true}).populate("Lender");
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
        const _id = req.params._id; 
        console.log(_id)
        const deletedBook = await book.findByIdAndDelete (_id);
        console.log(deleteBook)
        if (!deletedBook) {
            return res.status(404).send({ message: "Book not found for deletion" });
        }

        const books = await book.find().populate("Lender"); // שליפת הספרים הנותרים
        res.send(books); // מחזיר את הרשימה המעודכנת
    } catch (error) {
        res.status(500).send({ message: "Error deleting book", error });
    }
}

module.exports = {getBooksFields, postBook ,getBook, putBook,putBookLender, deleteBook ,getAllBooks};
