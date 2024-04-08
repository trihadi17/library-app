<template>
  <section>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <span class="title-header">Update</span>
            <!-- Form Tambah -->
            <section class="my-3">
              <div class="row">
                <div class="col-12">
                  <form @submit.prevent="onSubmit">
                    <div class="form-group mb-2">
                      <label for="judul">Judul</label>
                      <input
                        v-model="book.judul"
                        class="form-control"
                        placeholder="Judul"
                      />
                    </div>

                    <div class="form-group mb-2">
                      <label for="pengarang">Pengarang</label>
                      <input
                        v-model="book.pengarang"
                        class="form-control"
                        placeholder="Pengarang"
                      />
                    </div>

                    <div class="form-group mb-2">
                      <label for="penerbit">Penerbit</label>
                      <input
                        v-model="book.penerbit"
                        class="form-control"
                        placeholder="Penerbit"
                      />
                    </div>

                    <div class="form-group mb-2">
                      <label for="tahun_terbit">Tahun Terbit</label>
                      <input
                        v-model="book.tahun_terbit"
                        class="form-control"
                        placeholder="Tahun Terbit"
                      />
                    </div>

                    <div class="form-group mb-2">
                      <label for="deskripsi">Deskripsi</label>
                      <input
                        v-model="book.deskripsi"
                        class="form-control"
                        placeholder="Deskripsi"
                      />
                    </div>

                    <div class="form-group mb-2">
                      <label for="rak_id">Rak</label>
                      <select v-model="book.rak_id" class="form-control">
                        <option value="1">Teknologi Informasi</option>
                        <option value="2">Astronomi</option>
                        <option value="3">Anak-Anak</option>
                      </select>
                    </div>

                    <div class="form-group mb-2">
                      <label for="stok">Stok</label>
                      <input
                        v-model="book.stok"
                        class="form-control"
                        placeholder="Stok"
                      />
                    </div>

                    <div class="form-group mt-2" style="float: right">
                      <router-link
                        :to="{ name: 'book.index' }"
                        class="btn btn-sm btn-secondary"
                        style="margin-right: 5px"
                        >Cancel</router-link
                      >
                      <button class="btn btn-sm btn-success ml-2" type="submit">
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      book: {},
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      //* Get Data
      this.axios
        .get(`http://localhost:3000/book/${this.$route.params.id}`)
        .then((response) => {
          this.book = response.data.data;
        });
    },
    onSubmit() {
      this.axios
        .patch(`http://localhost:3000/book/${this.$route.params.id}`, this.book)
        .then((response) => {
          this.$router.push({ name: "book.index" });
          this.$notify({ title: response.data.message, type: "success" });
        })
        .catch((err) => {});
    },
  },
};
</script>