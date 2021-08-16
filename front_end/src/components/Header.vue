<template>
  <div class="navigation">
    <header>
      <!-- <button v-if="$route.fullPath != '/'">Dashboard</button> -->
      <button
        v-if="getJwtToken != '/' && getJwtToken != '/login'"
        class="logout-btn"
        :style="{
          background: 'red',
          float: 'right',
        }"
        @click="logout"
      >
        Logout
      </button>
      <button
        @click="dashboard"
        v-if="getJwtToken === '/bills'"
        class="logout-btn"
        :style="{
          background: 'purple',
          float: 'right',
        }"
      >
        Dashboard
      </button>
      <h1>{{ title }}</h1>
    </header>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    title: String,
  },
  methods: {
    dashboard() {
      this.$router.push({ name: "Dashboard" });
    },
    logout() {
      localStorage.removeItem("u_id");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("org_id");
      this.$router.push({ name: "Login" });
    },
  },
  computed: {
    getJwtToken() {
      return this.$route.fullPath;
    },
  },
};
</script>

<style scoped>
.navigation {
  position: sticky;
  top: 0%;
  margin: 0%;
  color: whitesmoke;
  background: black;
  height: 10vh;
}

.logout-btn {
  top: 10%;
  display: inline-block;
  background: purple;
  color: #fff;
  border: none;
  padding: 5px 5px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
</style>
