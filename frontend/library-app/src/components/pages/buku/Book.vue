<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <!-- Header -->
            <section>
              <span class="title-header">Daftar Buku</span>
            </section>

            <section>
              <!-- Tambah -->
              <router-link
                :to="{ name: 'book.create' }"
                class="btn btn-sm btn-success mt-3 mb-0"
              >
                Tambah Buku
              </router-link>
              <!-- Table -->
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Judul</th>
                    <th scope="col">Pengarang</th>
                    <th scope="col">Penerbit</th>
                    <th scope="col">Tahun Terbit</th>
                    <th scope="col">Deskripsi</th>
                    <th scope="col">Rak Buku</th>
                    <th scope="col">Stok</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(book, index) in books" :key="index">
                    <td scope="row">{{ book.id }}</td>
                    <td scope="row">{{ book.judul }}</td>
                    <td scope="row">{{ book.pengarang }}</td>
                    <td scope="row">{{ book.penerbit }}</td>
                    <td scope="row">{{ book.tahun_terbit }}</td>
                    <td scope="row">{{ book.deskripsi }}</td>
                    <td scope="row">{{ book.nama_rak }}</td>
                    <td scope="row">{{ book.stok }}</td>
                    <td>
                      <div class="btn-group btn-group-toggle">
                        <router-link
                          :to="{
                            name: 'book.update',
                            params: { id: book.id },
                          }"
                          class="btn btn-success btn-sm mt-2"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Update Buku"
                        >
                          Edit</router-link
                        >
                        <button
                          class="btn btn-sm btn-danger mt-2"
                          title="Hapus Buku"
                          @click="deleteData(book.id)"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.axios.get(`http://localhost:3000/book`).then((response) => {
        this.books = response.data.data;
      });
    },
    deleteData(id) {
      //* Delete Data
      this.axios
        .delete(`http://localhost:3000/book/` + id)
        .then((response) => {
          this.loadData();
          this.$notify({ title: response.data.message, type: "error" });
        })
        .catch((errors) => {
          this.$notify({ title: errors.response.data.message, type: "error" });
          console.log(errors.response.status);
        });
    },
  },
};
</script>