<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <!-- Header -->
            <section>
              <span class="title-header">Daftar Rak Buku</span>
            </section>

            <section>
              <!-- Tambah -->
              <router-link
                :to="{ name: 'bookshelf.create' }"
                class="btn btn-sm btn-success mt-3 mb-0"
              >
                Tambah Rak Buku
              </router-link>
              <!-- Table -->
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nama Rak</th>
                    <th scope="col">Deskripsi</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(bookshelf, index) in bookshelfs" :key="index">
                    <td scope="row">{{ bookshelf.id }}</td>
                    <td scope="row">{{ bookshelf.nama_rak }}</td>

                    <td scope="row">{{ bookshelf.deskripsi }}</td>

                    <td>
                      <div class="btn-group btn-group-toggle">
                        <router-link
                          :to="{
                            name: 'bookshelf.update',
                            params: { id: bookshelf.id },
                          }"
                          class="btn btn-success btn-sm mt-2"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Update Rak Buku"
                        >
                          Edit</router-link
                        >
                        <button
                          class="btn btn-sm btn-danger mt-2"
                          title="Hapus Rak Buku"
                          @click="deleteData(bookshelf.id)"
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
      bookshelfs: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.axios.get(`http://localhost:3000/bookshelf`).then((response) => {
        this.bookshelfs = response.data.data;
      });
    },
    deleteData(id) {
      //* Delete Data
      this.axios
        .delete(`http://localhost:3000/bookshelf/` + id)
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