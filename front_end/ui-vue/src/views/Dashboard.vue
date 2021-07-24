<template>
  <div class="containers">
    <Button @click="logout" title="Logout" color="red" />
    <h1>Organisations</h1>
    <Button @click="addorg" title="Add Organisation" color="green" />
    <Organisations v-if="logged" :Orgs="Orgs" />
    <!-- <Button @click="" title="Cancel" color="red" /> -->
    <p v-if="true"></p>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import Organisations from "../components/Organisations.vue";
export default {
  name: "Dashboard",
  data() {
    return {
      u_id: Number,
      jwtToken: String,
      Orgs: Array,
      logged: false,
    };
  },
  components: {
    Button,
    Organisations,
  },
  methods: {
    logout() {
      localStorage.removeItem("u_id");
      localStorage.removeItem("jwtToken");
      this.$router.push({ name: "Login" });
    },

    addorg() {
      console.log("Entred");
    },
    async fetchorg() {
      this.u_id = localStorage.getItem("u_id");
      this.jwtToken = localStorage.getItem("jwtToken");
      const response = await fetch(`api/users/${this.u_id}/orgs`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${this.jwtToken}`,
        },
      });
      if (response.status === 200) {
        let result = await response.json();
        this.logged = true;
        this.Orgs = result.data;
      }
    },
  },
  created() {
    this.fetchorg();
    console.log("Dashboard comp created.");
  },
};
</script>

<style scoped>
.containers {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 100px;
  border: 1px solid steelblue;
  padding: 20px;
  border-radius: 10px;
}
</style>