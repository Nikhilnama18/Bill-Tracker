<template>
  <div>
    <h1 class="org-name">Organisation : {{ getOrgName() }}</h1>
    <ListBills :org_id="org_id"></ListBills>
  </div>
</template>

<script>
import ListBills from "../components/ListBills.vue";
export default {
  name: "Bills",
  data() {
    return {
      org_id: this.$route.params.o_id,
    };
  },
  components: { ListBills },
  created() {
    console.log(`Bills vue created ${this.$route.params.o_id}`);
  },
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
  top:0%
}
</style>