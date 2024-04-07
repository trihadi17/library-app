// connection database
const pool = require("../config/database");

//CREATE
const createStudent = async (request, response) => {
  try {
    // request
    const { nim, nama, nohp, alamat, status_mahasiswa } = request.body;

    // query
    const newStudent = await pool.query(
      "INSERT INTO mahasiswa (nim, nama, nohp, alamat, status_mahasiswa) VALUES ($1, $2, $3, $4, $5)",
      [nim, nama, nohp, alamat, status_mahasiswa]
    );

    // response
    return response.status(200).json({
      success: true,
      message: "Data Mahasiswa Berhasil Ditambah",
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ
const readStudents = async (request, response) => {
  try {
    // query
    const getStudents = await pool.query(
      "SELECT * FROM mahasiswa ORDER BY id ASC"
    );

    // response
    return response.status(200).json({
      success: true,
      message: "Data Mahasiswa",
      data: getStudents.rows,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ BY ID
const readStudentByNim = async (request, response) => {
  try {
    // parameter
    const nim = request.params.id;

    // query
    const getStudent = await pool.query(
      "SELECT * FROM mahasiswa WHERE nim= $1",
      [nim]
    );

    // response
    return response.status(200).json({
      success: true,
      message: "Data Mahasiswa By Nim",
      data: getStudent.rows[0],
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateStudent = async (request, response) => {
  try {
    // parameter
    const nimMahasiswa = request.params.id;

    //request
    const { nim, nama, nohp, alamat, status_mahasiswa } = request.body;

    //query
    const update = await pool.query(
      "UPDATE mahasiswa SET  nim = $1, nama = $2, nohp = $3, alamat = $4, status_mahasiswa = $5 WHERE nim = $6",
      [nim, nama, nohp, alamat, status_mahasiswa, nimMahasiswa]
    );

    // response
    return response.status(200).json({
      success: true,
      message: "Data Mahasiswa Berhasil Diubah",
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteStudent = async (request, response) => {
  try {
    // parameter
    const nim = request.params.id;

    //query
    const deleteMahasiswa = await pool.query(
      "DELETE FROM mahasiswa WHERE nim = $1",
      [nim]
    );

    // response
    return response.status(200).json({
      success: true,
      message: "Data Mahasiswa Berhasil Dihapus",
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  readStudents,
  createStudent,
  readStudentByNim,
  updateStudent,
  deleteStudent,
};
