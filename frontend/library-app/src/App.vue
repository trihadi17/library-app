<template>
  <div class="wrapper">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link :to="{ name: 'dashboard' }" class="navbar-brand"
          >Library</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link" :to="{ name: 'dashboard' }"
                >History</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'bookshelf.index' }"
                >Rak Buku</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'book.index' }"
                >Buku</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'student.index' }"
                >Mahasiswa</router-link
              >
            </li>
          </ul>
        </div>
      </nav>

      <!-- Notifications -->
      <notifications />

      <!-- ROUTER VIEW -->
      <router-view> </router-view>
    </div>
  </div>
</template>

<style>
body {
  font-family: "Poppins";
}

.title-header {
  font-size: 18px;
}

.card {
  border-radius: 9px;
  border: 1px solid rgba(0, 0, 0, 0.204);
  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.1);
}
</style>