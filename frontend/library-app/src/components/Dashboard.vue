<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <!-- Header -->
            <section>
              <span class="title-header"
                >History Peminjaman Buku Mahasiswa</span
              >
            </section>
            <section>
              <!-- Table -->
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nim</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Buku Id</th>
                    <th scope="col">Buku</th>
                    <th scope="col">Tanggal Pinjam</th>
                    <th scope="col">Tanggal Kembali</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(history, index) in histories" :key="index">
                    <td scope="row">{{ history.id }}</td>
                    <td scope="row">{{ history.nim }}</td>
                    <td scope="row">{{ history.nama }}</td>
                    <td scope="row">{{ history.buku_id }}</td>
                    <td scope="row">{{ history.buku }}</td>
                    <td scope="row">
                      {{
                        new Date(history.tanggal_peminjaman)
                          .toISOString()
                          .split("T")[0]
                      }}
                    </td>
                    <td scope="row">
                      {{
                        new Date(history.tanggal_kembali)
                          .toISOString()
                          .split("T")[0]
                      }}
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
      histories: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.axios.get(`http://localhost:3000/history`).then((response) => {
        this.histories = response.data.data;
      });
    },
  },
};
</script>