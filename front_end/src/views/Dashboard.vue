<template>
  <div class="containers">
    <h1 class="org-name">Organisations</h1>
    <Button
      @click="addorg"
      title="Add Organisation"
      v-if="!addOrg"
      color="green"
      :style="{ float: 'right' }"
    />
    <br />
    <br />
    <AddOrg @refresh="pushOrg" @cancel="cancel" v-if="addOrg" />
    <div>
      <Organisations @deleteOrg="deleteOrg" v-if="logged" :Orgs="Orgs" />
    </div>
    <!-- <Button @click="" title="Cancel" color="red" /> -->
    <p v-if="true"></p>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import Organisations from "../components/Organisations.vue";
import AddOrg from "../components/AddOrg.vue";
export default {
  name: "Dashboard",
  data() {
    return {
      Orgs: Array,
      logged: false,
      addOrg: false,
    };
  },
  components: {
    Button,
    Organisations,
    AddOrg,
  },
  methods: {
    async deleteOrg(org_id) {
      const data = {
        u_id: localStorage.getItem("u_id"),
        o_id: org_id,
      };
      const response = await fetch(
        `api/users/${localStorage.getItem("u_id")}/orgs/${org_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        this.fetchorg();
      }
    },
    logout() {
      localStorage.removeItem("u_id");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("org_id");
      this.$router.push({ name: "Login" });
    },

    addorg() {
      this.addOrg = !this.addOrg;
    },
    cancel() {
      this.addOrg = false;
    },
    async fetchorg() {
      this.addOrg = false;
      const response = await fetch(
        `api/users/${localStorage.getItem("u_id")}/orgs`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      if (response.status === 200) {
        let result = await response.json();
        this.logged = true;
        this.Orgs = result.data;
      }
    },
    pushOrg(data) {
      this.Orgs.push(data[0]);
    },
    getUserId() {
      return localStorage.getItem("u_id");
    },

    getJwtToken() {
      return localStorage.getItem("jwtToken");
    },
  },
  created() {
    if (!this.getUserId() || !this.getJwtToken()) {
      this.$router.push("Login");
    }
    this.fetchorg();
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

.org-name {
  margin-left: 30%;
  margin-right: 45%;
  color: black;
}
</style>