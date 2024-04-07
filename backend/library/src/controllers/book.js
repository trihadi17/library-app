// connection database
const pool = require("../config/database");

//CREATE
const createBook = async (request, response) => {
  try {
    // request
    const { judul, pengarang, penerbit, tahun_terbit, deskripsi, stok } =
      request.body;

    // query
    const newBook = await pool.query(
      "INSERT INTO buku (judul, pengarang, penerbit, tahun_terbit, deskripsi, stok) VALUES ($1, $2, $3, $4, $5, $6)",
      [judul, pengarang, penerbit, tahun_terbit, deskripsi, stok]
    );

    // response
    return response.status(200).json({
      success: true,
      message: "Data Buku Berhasil Ditambah",
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ
const readBooks = async (request, response) => {
  try {
    // query
    const getBooks = await pool.query(
      "SELECT buku.*, rak.nama_rak FROM buku LEFT JOIN rak on buku.rak_id = rak.id ORDER BY buku.id ASC"
    );

    // response
    return response.status(200).json({
      success: true,
      message: "Data Buku",
      data: getBooks.rows,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ BY ID
const readBookById = async (request, response) => {
  try {
    // parameter
    const id = request.params.id;

    // query
    const getBook = await pool.query(
      "SELECT buku.*, rak.nama_rak FROM buku LEFT JOIN rak on buku.rak_id = rak.id WHERE buku.id= $1",
      [id]
    );

    // response
    return response.status(200).json({
      success: true,
      message: "Data Buku By ID",
      data: getBook.rows[0],
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE (Proses ini termasuk juga masukin buku ke dalam rak/inventory)
const updateBook = async (request, response) => {
  try {
    // parameter
    const id = request.params.id;

    //request
    const {
      judul,
      pengarang,
      penerbit,
      tahun_terbit,
      deskripsi,
      rak_id,
      stok,
    } = request.body;

    //query
    const update = await pool.query(
      "UPDATE buku SET  judul = $1, pengarang = $2, penerbit = $3, tahun_terbit = $4, deskripsi = $5, rak_id = $6, stok = $7 WHERE id = $8",
      [judul, pengarang, penerbit, tahun_terbit, deskripsi, rak_id, stok, id]
    );

    // response
    return response.status(200).json({
      success: true,
      message: "Data Buku Berhasil Diubah",
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteBook = async (request, response) => {
  try {
    // parameter
    const id = request.params.id;

    //query
    const deleteBuku = await pool.query("DELETE FROM buku WHERE id = $1", [id]);

    // response
    return response.status(200).json({
      success: true,
      message: "Data Buku Berhasil Dihapus",
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBook,
  readBooks,
  readBookById,
  updateBook,
  deleteBook,
};
