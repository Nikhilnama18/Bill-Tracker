<template>
  <div>
    <router-link to="/dashboard">
      <button class="btns" title="Dashboard" color="purple">Dashboard</button>
      <!-- TODO: Move Dashboard to the right side  -->
    </router-link>
    <div class="containers">
      <h1 class="org-name">{{ getOrgName() }}</h1>
      <ListBills :org_id="org_id"></ListBills>
    </div>
  </div>
</template>

<script>
import ListBills from "../components/ListBills.vue";
import Button from "../components/Button.vue";

export default {
  name: "Bills",
  data() {
    return {
      org_id: this.$route.params.o_id,
    };
  },
  components: { ListBills, Button },
  // created() {
  //   console.log(`Bills vue created ${this.$route.params.o_id}`);
  // },
  methods: {
    getOrgName() {
      return this.$route.params.o_name || localStorage.getItem("org_name");
    },
  },
};
</script>

<style scoped>
.org-name {
  position: sticky;
  top: 0%;
}
.containers {
  max-width: 600px;
  margin: 50px auto;
  overflow: auto;
  min-height: 100px;
  border: 1px solid steelblue;
  padding: 50px;
  border-radius: 10px;
}
.btns {
  top: 2%;
  left: 80%;
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
  position: fixed;
}
</style>