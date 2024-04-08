<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <!-- Header -->
            <section>
              <span class="title-header">Daftar Mahasiswa</span>
            </section>

            <section>
              <!-- Tambah -->
              <router-link
                :to="{ name: 'student.create' }"
                class="btn btn-sm btn-success mt-3 mb-0"
              >
                Tambah Mahasiswa
              </router-link>
              <!-- Table -->
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nim</th>
                    <th scope="col">Nama</th>
                    <th scope="col">No Hp</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">Status Mahasiswa</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(student, index) in students" :key="index">
                    <td scope="row">{{ student.id }}</td>
                    <td scope="row">{{ student.nim }}</td>
                    <td scope="row">{{ student.nama }}</td>
                    <td scope="row">{{ student.nohp }}</td>
                    <td scope="row">{{ student.alamat }}</td>
                    <td scope="row">{{ student.status_mahasiswa }}</td>
                    <td>
                      <div class="btn-group btn-group-toggle">
                        <router-link
                          :to="{
                            name: 'student.update',
                            params: { id: student.nim },
                          }"
                          class="btn btn-success btn-sm mt-2"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Update Mahasiswa"
                        >
                          Edit</router-link
                        >
                        <button
                          class="btn btn-sm btn-danger mt-2"
                          title="Hapus Mahasiswa"
                          @click="deleteData(student.nim)"
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
      students: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.axios.get(`http://localhost:3000/student`).then((response) => {
        this.students = response.data.data;
      });
    },
    deleteData(id) {
      //* Delete Data
      this.axios
        .delete(`http://localhost:3000/student/` + id)
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