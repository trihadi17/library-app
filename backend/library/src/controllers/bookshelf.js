// connection database
const pool = require("../config/database");

//CREATE
const createBookShelf = async (request, response) => {
  try {
    // request
    const { nama_rak, deskripsi } = request.body;

    // query
    const newBookShelf = await pool.query(
      "INSERT INTO rak (nama_rak, deskripsi) VALUES ($1, $2)",
      [nama_rak, deskripsi]
    );

    // response
    return response.status(200).json({
      success: true,
      message: "Data Rak Berhasil Ditambah",
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ
const readBookShelf = async (request, response) => {
  try {
    // query
    const getBookShelf = await pool.query("SELECT * FROM rak ORDER BY id ASC");

    // response
    return response.status(200).json({
      success: true,
      message: "Data Rak Buku",
      data: getBookShelf.rows,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ BY ID
const readBookShelfById = async (request, response) => {
  try {
    // parameter
    const id = request.params.id;

    // query
    const getBookShelf = await pool.query("SELECT * FROM rak WHERE id= $1", [
      id,
    ]);

    // response
    return response.status(200).json({
      success: true,
      message: "Data Rak Buku By ID",
      data: getBookShelf.rows[0],
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateBookShelf = async (request, response) => {
  try {
    // parameter
    const id = request.params.id;

    //request
    const { nama_rak, deskripsi } = request.body;

    //query
    const update = await pool.query(
      "UPDATE rak SET  nama_rak = $1, deskripsi = $2 WHERE id = $3",
      [nama_rak, deskripsi, id]
    );

    // response
    return response.status(200).json({
      success: true,
      message: "Data Rak Buku Berhasil Diubah",
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteBookShelf = async (request, response) => {
  try {
    // parameter
    const id = request.params.id;

    //query
    const deleteRakBuku = await pool.query("DELETE FROM rak WHERE id = $1", [
      id,
    ]);

    // response
    return response.status(200).json({
      success: true,
      message: "Data Rak Buku Berhasil Dihapus",
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBookShelf,
  readBookShelf,
  readBookShelfById,
  updateBookShelf,
  deleteBookShelf,
};
