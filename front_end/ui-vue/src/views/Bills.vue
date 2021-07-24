<template>
  <ListBills :org_id="org_id"></ListBills>
  
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
};
</script>