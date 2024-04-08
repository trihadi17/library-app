<template>
  <section>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <span class="title-header">Create</span>
            <!-- Form Tambah -->
            <section class="my-3">
              <div class="row">
                <div class="col-12">
                  <form @submit.prevent="onSubmit">
                    <div class="form-group mb-2">
                      <label for="nama_rak">Nama Rak</label>
                      <input
                        v-model="bookshelf.nama_rak"
                        class="form-control"
                        placeholder="Nama Rak"
                      />
                    </div>

                    <div class="form-group mb-2">
                      <label for="deskripsi">Deskripsi</label>
                      <input
                        v-model="bookshelf.deskripsi"
                        class="form-control"
                        placeholder="Deskripsi"
                      />
                    </div>

                    <div class="form-group mt-2" style="float: right">
                      <router-link
                        :to="{ name: 'bookshelf.index' }"
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
      bookshelf: {},
    };
  },
  methods: {
    onSubmit() {
      this.axios
        .post(`http://localhost:3000/bookshelf`, this.bookshelf)
        .then((response) => {
          this.$router.push({ name: "bookshelf.index" });
          this.$notify({ title: response.data.message, type: "success" });
        })
        .catch((err) => {});
    },
  },
};
</script>