<template>
  <div class="app">
    <!-- Sidebar -->
    <Sidebar />
    <!-- Header -->
    <main>
      <Header />
      <!-- Content -->
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
export default {
  name: "App",
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style lang="scss">
:root {
  --primary: #1b4ae7;
  --primary-alt: #5b87e3;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #e1d7d7;
  --sidebar-width: 400px;
}

.app {
  display: flex;
  main {
    flex: 1 1 0;
    padding: 2rem;
  }
}
</style>
