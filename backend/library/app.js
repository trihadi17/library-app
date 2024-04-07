// express
const express = require("express");

// body parser digunakan untuk menangani body pada permintaan HTTP
const bodyParser = require("body-parser");

// controller
const bookController = require("./src/controllers/book");
const bookShelfController = require("./src/controllers/bookshelf");
const studentController = require("./src/controllers/students");
const transactionController = require("./src/controllers/transaction");

const app = express();
const port = 3000;

// hasil HTTP parse to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
app.get("/", (request, response) => {
  response.json({ info: "Node.JS, Express, and Postgres API" });
});

// BUKU
app.get("/book", bookController.readBooks);
app.post("/book", bookController.createBook);
app.get("/book/:id", bookController.readBookById);
app.patch("/book/:id", bookController.updateBook);
app.delete("/book/:id", bookController.deleteBook);

// RAK
app.get("/bookshelf", bookShelfController.readBookShelf);
app.post("/bookshelf", bookShelfController.createBookShelf);
app.get("/bookshelf/:id", bookShelfController.readBookShelfById);
app.patch("/bookshelf/:id", bookShelfController.updateBookShelf);
app.delete("/bookshelf/:id", bookShelfController.deleteBookShelf);

// MAHASISWA
app.get("/student", studentController.readStudents);
app.post("/student", studentController.createStudent);
app.get("/student/:id", studentController.readStudentByNim);
app.patch("/student/:id", studentController.updateStudent);
app.delete("/student/:id", studentController.deleteStudent);

// TRANSAKSI PEMINJAMAN
app.post("/pinjam", transactionController.borrow);
app.post("/perpanjang", transactionController.extend);
app.post("/pengembalian", transactionController.bookReturn);

// HISTORY PEMINJAMAN
app.get("/history", transactionController.historyTransaction);

app.listen(port, () => {
  console.log(`Library app listening on port ${port}`);
});
