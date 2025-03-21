import Book from "../models/book.js";

async function createNewBook(book) {
    try {

        const newBook = new Book({
            url: book.url,
            title: book.title,
            author: book.author,
            price: book.price,
            description: book.description,
            language: book.language,
        });
        await newBook.save();
        return { success: true, message: "New Book Added" };

    } catch (error) {
        return { success: false, message: "Internal server error" }
    }
}

async function updateBookById(book_id, book) {
    try {

        await Book.findByIdAndUpdate(book_id, {
            url: book.url,
            title: book.title,
            author: book.author,
            price: book.price,
            description: book.description,
            language: book.language,
        });
        return { success: true, message: "Book Updated Successfully" };

    } catch (error) {
        return { success: false, message: "Internal server error" }
    }
}

async function deleteBookById(book_id) {
    try {

        await Book.findByIdAndDelete(book_id);
        return { success: true, message: "Book Deleted Successfully" };

    } catch (error) {
        return { success: false, message: "Internal server error" }
    }
}

export {
    createNewBook,
    updateBookById,
    deleteBookById,
}