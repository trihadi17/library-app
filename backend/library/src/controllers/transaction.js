// connection database
const pool = require("../config/database");

// Perpinjaman Buku (Bisa Lebih Dari 1 Buku)
const borrow = async (request, response) => {
  try {
    // request =
    const { nim, buku } = request.body;

    // DATE
    // Mendapatkan tanggal hari ini
    const today = new Date();

    // Mendapatkan max batas peminjaman 2 minggu
    const twoWeeks = new Date();
    twoWeeks.setDate(twoWeeks.getDate() + 14);

    // Mengonversi tanggal menjadi string dalam format "YYYY-MM-DD"
    const tanggalPinjam = today.toISOString().split("T")[0];
    const batasTanggalPinjam = twoWeeks.toISOString().split("T")[0];

    // query
    // cek mahasiswa aktif/tidak
    const student = await pool.query("SELECT * FROM mahasiswa WHERE nim = $1", [
      nim,
    ]);

    if (student.rows[0].status_mahasiswa == "Tidak Aktif") {
      // response
      return response.status(404).json({
        success: true,
        message: "Status Mahasiswa Tidak Aktif",
      });
    }

    // menampung status pinjam
    let statusPinjam = [];

    // loop data buku (buku bisa dipinjam lebih dari 1)
    for (const data of buku) {
      // get data buku
      const book = await pool.query("SELECT * FROM buku WHERE id=$1", [data]);
      // cek stok buku
      if (book.rows[0].stok >= 1) {
        // create data transaksi peminjaman buku
        const createTransaction = await pool.query(
          "INSERT INTO transaksi_peminjaman (nim, buku_id, status, tanggal_peminjaman, batas_tanggal_pinjam) VALUES ($1, $2, $3, $4, $5)",
          [nim, data, "Dipinjam", tanggalPinjam, batasTanggalPinjam]
        );

        // update stock
        const updateStock = await pool.query(
          "UPDATE buku SET stok = $1 WHERE id = $2",
          [book.rows[0].stok - 1, data]
        );

        // push status pinjaman to array
        statusPinjam.push(`Buku ${book.rows[0].judul} berhasil dipinjam`);
      } else {
        // push status pinjaman to array
        statusPinjam.push(
          `Buku ${book.rows[0].judul} tidak berhasil dipinjam karena stok buku habis`
        );
      }
    }

    // response
    return response.status(200).json({
      success: true,
      message: statusPinjam,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Perpanjang Buku (Bisa Lebih Dari 1 Buku)
const extend = async (request, response) => {
  try {
    // request
    const { transaction_id } = request.body;

    // DATE
    // Mendapatkan tanggal hari ini
    const today = new Date();

    // Mendapatkan max batas peminjaman 2 minggu
    const twoWeeks = new Date();
    twoWeeks.setDate(twoWeeks.getDate() + 14);

    // Mengonversi tanggal menjadi string dalam format "YYYY-MM-DD"
    // sementara waktu nya masih menggunakan waktu UTC
    const tanggalPerpanjang = today.toISOString().split("T")[0];
    const batasTanggalPinjam = twoWeeks.toISOString().split("T")[0];

    // menampung status pinjam
    let statusPerpanjang = [];

    // loop data
    for (const transaction of transaction_id) {
      //get data transaction
      const getTransaction = await pool.query(
        "SELECT * FROM transaksi_peminjaman WHERE id=$1",
        [transaction]
      );

      //get data buku untuk status message
      const getBook = await pool.query("SELECT * FROM buku WHERE id=$1", [
        getTransaction.rows[0].buku_id,
      ]);

      //update data transaksi peminjaman (menambahkan tanggal perpanjang)
      const updateTransaction = await pool.query(
        "UPDATE transaksi_peminjaman SET status = $1, batas_tanggal_pinjam = $2, tanggal_perpanjang = $3 WHERE id = $4",
        ["Diperpanjang", batasTanggalPinjam, tanggalPerpanjang, transaction]
      );

      // push status pinjaman to array
      statusPerpanjang.push(
        `Buku ${getBook.rows[0].judul} berhasil diperpanjang`
      );
    }
    // response
    return response.status(200).json({
      success: true,
      message: statusPerpanjang,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Pengembalian Buku (Bisa Lebih Dari 1 Buku)
const bookReturn = async (request, response) => {
  try {
    // request
    const { transaction_id } = request.body;

    // DATE
    // Mendapatkan tanggal hari ini
    const today = new Date();

    // Mengonversi tanggal menjadi string dalam format "YYYY-MM-DD"
    const tanggalKembali = today.toISOString().split("T")[0];

    // menampung status kembali
    let statusKembali = [];

    // loop data request
    for (const transaction of transaction_id) {
      // get data transaction
      const getTransaction = await pool.query(
        "SELECT * FROM transaksi_peminjaman WHERE id=$1",
        [transaction]
      );

      // get data buku
      const getBook = await pool.query("SELECT * FROM buku WHERE id=$1", [
        getTransaction.rows[0].buku_id,
      ]);

      // get data mahasiswa
      const getStudent = await pool.query(
        "SELECT * FROM mahasiswa WHERE nim=$1",
        [getTransaction.rows[0].nim]
      );
      console.log(getStudent.rows[0]);

      //update data (menambahkan tanggal kembali)
      const updateTransaction = await pool.query(
        "UPDATE transaksi_peminjaman SET status = $1, tanggal_kembali = $2 WHERE id = $3",
        ["Dikembalikan", tanggalKembali, transaction]
      );

      // insert to history
      const createHistory = await pool.query(
        "INSERT INTO history_peminjaman (nim, nama, buku_id, buku, tanggal_peminjaman, tanggal_kembali) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          getStudent.rows[0].nim,
          getStudent.rows[0].nama,
          getBook.rows[0].id,
          getBook.rows[0].judul,
          getTransaction.rows[0].tanggal_peminjaman,
          tanggalKembali,
        ]
      );

      // update data book (menambahkan stok buku yang telah dikembalikan)
      const updateBookStock = await pool.query(
        "UPDATE buku SET stok=$1 WHERE id=$2",
        [getBook.rows[0].stok + 1, getTransaction.rows[0].buku_id]
      );

      // push status pinjaman to array
      statusKembali.push(`Buku ${getBook.rows[0].judul} berhasil dikembalikan`);
    }

    // response
    return response.status(200).json({
      success: true,
      message: statusKembali,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// History Peminjaman Buku
const historyTransaction = async (request, response) => {
  try {
    // query
    const getHistory = await pool.query(
      "SELECT * FROM history_peminjaman ORDER BY id ASC"
    );

    // response
    return response.status(200).json({
      success: true,
      message: "Data History Peminjaman Buku",
      data: getHistory.rows,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  borrow,
  extend,
  bookReturn,
  historyTransaction,
};
