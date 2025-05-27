const User = require("../Models/usersModel");
const Book = require("../Models/booksModel");

const axios = require('axios');

/**
 * Retrieves a User by its ID.
 * @param {Object} req - The request object containing UserId.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function getUser(req, res) {//מתוך הלקוח נוכל לשלוף ספרים נוכחיים והסטורית ספרים
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ userId: userId }); // Search for the User by ID
        if (!user) {
            return res.status(404).send({ message: "User not found" }); // Handle case where the User is not found
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving User", error });
    }
}

/**
 * Creates a new User entry in the database.
 * @param {Object} req - The request object containing the User data in the body.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function postUser(req, res) {
    try {
        const user = new User(req.body); // Create a new User instance with the request body
        await user.save(); // Save the new User to the database
        res.status(201).send(user); // Return a 201 status code for successful creation
    } catch (error) {
        res.status(500).send({ message: "Error saving User", error });
    }
}

/**
 * Allows a User to borrow a book.
 * @param {Object} req - The request object containing userId and bookId in query parameters.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */

async function BorrowUsersBooks(req, res) {//😂😂😂😂😂😂😂😂😂🤣🤣🤣🤣🤣🤣
    try {
        const { userId, book_id } = req.params; 
        console.log(userId)
        console.log(book_id)
        const user = await User.findOne({userId:userId});
        console.log(user+"user")
        const bookExists = await Book.findOne({_id:book_id});
        console.log(bookExists+"b")
        
        if (!user) {
            return res.status(404).send({ message: "User not found for borrow" }); 
        }

        if (!bookExists) {
            return res.status(404).send({ message: "No such book" }); 
        }
        if (user.subscriptionQuantity * process.env.SUBSCRIPTION_QUANTITY === user.curBorrowedbooks.length) {
            return res.status(400).send({ message: "The book quota is full" }); 
        }
        //debugger
        user.curBorrowedbooks.push(book_id); // Add the book to current borrowed books
        await user.save(); // Save the updated user

        await Book.updateOne({_id:book_id},{Lender:user._id})
        await console.log(Book.findOne({_id:book_id}))
        

        res.send(user);
    } catch (error) {
        res.status(500).send({ message: "Error updating user's books", error });
    }
}

/**
 * Allows a User to return a borrowed book.
 * @param {Object} req - The request object containing userId and bookId in query parameters.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function ReturnUsersBooks(req, res) {
    try {
        const { userId, bookId } = req.params; 
       // debugger
        const user = await User.findOne({userId:userId});
        if (!user) {
            return res.status(404).send({ message: "User not found for return" }); 
        }
        if (!user.curBorrowedbooks.includes(bookId)) {
            return res.status(404).send({ message: "No such borrowed book" }); 
        }

        await User.findOneAndUpdate(
            { userId: userId },
            { $push: { historyBorrowedbooks: { bookId: bookId, date: new Date() } } }
        );
        
        //debugger
        await User.findOneAndUpdate(
            { userId: userId },
            { $pull: { curBorrowedbooks: bookId } } // הסרת bookId מרשימת curBorrowedbooks
        );
        const updatedUser = await User.findOne({ userId: userId });//טוען שוב על מנת להחזיר את המשתמש המעודכן

        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: "Error updating user's books", error });
    }
}

/**
 * Updates a User's subscriptions by its ID and quantity to update.
 * If the user deletes all its subscriptions, the user will be deleted.
 * @param {Object} req - The request object containing the userId and quantity in parameters.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function updateUserSubscriptions(req, res) {
    try {
        let { userId, quantity } = req.params; 
        //debugger
        quantity = parseInt(quantity); // Convert quantity to a number
        const user = await User.findOne({userId:userId});

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        if (user.subscriptionQuantity + quantity < 0) {
            return res.status(400).send({ message: "No such number of subscriptions" }); 
        }

        user.subscriptionQuantity += quantity; // Update subscription quantity
        await user.save(); // Save the updated user
       // debugger
        if (user.subscriptionQuantity === 0) {
                 
            try {
                // await axios.delete(`/users/deleteUser/${userId}`); זה לא עובד כרגע Delete the user through API call  
                const deletedUser = await User.findOneAndDelete({ userId: userId }); // Use userId in the query
                if (!deletedUser) {
                    return res.status(404).send({ message: "User not found for deletion" }); // Handle case where user is not found
                }
                res.send({ message: "User deleted successfully", deletedUser });

            } catch (error) {
                return res.status(500).send({ message: "Error deleting user", error });
            }
            
        }
      
        res.send(`${quantity} subscriptions updated successfully`);
    } catch (error) {
        res.status(500).send({ message: "Error updating subscriptions", error });
    }
}

/**
 * Deletes a User by its ID.
 * @param {Object} req - The request object containing the UserId parameter.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 */
async function deleteUser(req, res) {
    debugger
    try {
        const userId = req.params.userId; // Get the userId from the parameters
        const deletedUser = await User.findOneAndDelete({ userId: userId }); // Use userId in the query
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found for deletion" }); // Handle case where user is not found
        }
        res.send({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        res.status(500).send({ message: "Error deleting User", error });
    }
}

module.exports = { postUser, getUser, BorrowUsersBooks,ReturnUsersBooks, updateUserSubscriptions, deleteUser };
