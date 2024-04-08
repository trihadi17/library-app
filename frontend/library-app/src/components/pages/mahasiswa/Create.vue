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
                      <label for="nim">Nim</label>
                      <input
                        v-model="student.nim"
                        class="form-control"
                        placeholder="Nim"
                      />
                    </div>

                    <div class="form-group mb-2">
                      <label for="nama">Nama</label>
                      <input
                        v-model="student.nama"
                        class="form-control"
                        placeholder="Nama"
                      />
                    </div>

                    <div class="form-group mb-2">
                      <label for="nohp">No Hp</label>
                      <input
                        v-model="student.nohp"
                        class="form-control"
                        placeholder="No Hp"
                      />
                    </div>

                    <div class="form-group mb-2">
                      <label for="alamat">Alamat</label>
                      <input
                        v-model="student.alamat"
                        class="form-control"
                        placeholder="Alamat"
                      />
                    </div>

                    <div class="form-group mb-2">
                      <label for="status_mahasiswa">Status Mahasiswa</label>
                      <select
                        v-model="student.status_mahasiswa"
                        class="form-control"
                      >
                        <option value="Aktif">Aktif</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                      </select>
                    </div>

                    <div class="form-group mt-2" style="float: right">
                      <router-link
                        :to="{ name: 'student.index' }"
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
      student: {},
    };
  },
  methods: {
    onSubmit() {
      this.axios
        .post(`http://localhost:3000/student`, this.student)
        .then((response) => {
          this.$router.push({ name: "student.index" });
          this.$notify({ title: response.data.message, type: "success" });
        })
        .catch((err) => {});
    },
  },
};
</script>