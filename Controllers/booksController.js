const user=require("../models/userModel")//לתת אח"כ את הקוד לjpt try catch
const book=require("../models/bookModel")
async function getBook(req,res) {
    let bookId=req.params
    const c=await book.find({id:bookId})
    res.send(c)
   
}
async function postBook(req,res) {
    const c=await new book(req.body)
        console.log(req.body)
    await c.save()
    res.send(c)
   
}
async function putBook(req,res) {//משנה את המשאיל //לשלוח את   של המשאילobjectid
    let {bookId,userId}=req.params
    const c=await book.findByIdAndUpdate({id:bookId},{$set:{Lender:userId}})
    res.send(c)
   
}
async function deleteBook(req,res) {
    let bookId=req.params
    await book.findByIdAndDelete(bookId)
    .then(()=>res.send("deleted"))

    
   
}