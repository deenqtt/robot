<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg bg-white navbar-light">
    <div class="container">
      <div id="navigation" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <div class="nav1">
            <li class="nav-item">
              <router-link
                class="nav-link d-flex align-items-center me-2 active"
                aria-current="page"
                to="/home"
              >
                <i
                  class="fa fa-chart-pie opacity-6 me-1"
                  aria-hidden="true"
                ></i>
                Dashboard
              </router-link>
            </li>
          </div>

          <div class="nav2">
            <li class="nav-item">
              <router-link class="nav-link me-2" to="/profile">
                <i class="fa fa-user opacity-6 me-1" aria-hidden="true"></i>
                Profile
              </router-link>
            </li>
          </div>
          <div class="nav3">
            <li class="nav-item">
              <router-link class="nav-link me-2" to="/logout">
                <i
                  class="fas fa-user-circle opacity-5 me-1"
                  aria-hidden="true"
                ></i>
                Logout
              </router-link>
            </li>
          </div>
          <div class="nav4">
            <li class="nav-item">
              <router-link class="nav-link me-2" to="/">
                <i class="fas fa-key opacity-6 me-1" aria-hidden="true"></i>
                Sign In
              </router-link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
export default {
  data() {},
};
</script>
<style scoped>
.navbar .nav2 .nav-item {
  font-family: Poppins, sans-serif;
  margin-left: -50px;
  margin-right: 25px;
}
.navbar .nav3 .nav-item {
  font-family: Poppins, sans-serif;
  margin-right: 20px;
}
.navbar .nav4 .nav-item {
  font-family: Poppins, sans-serif;
}
.navbar {
  margin-left: -30px;
  margin-top: -35px;
  width: auto;
}

.nav1 .nav-item {
  font-family: Poppins, sans-serif;
  font-size: 30px;
  margin-right: 550px;
}
</style>
