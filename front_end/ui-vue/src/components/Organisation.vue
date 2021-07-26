<template>
  <div class="org" @click="renderBills">
    <h2>
      {{ org.o_name }}
      {{ org.o_location }}
      {{ org.o_gst }}
    </h2>
    <Button @click="deleteOrg" color="red" title="Delete" />
  </div>
</template>
<script>
import Button from "./Button.vue";
export default {
  name: "Organisation",
  components: {
    Button,
  },
  props: {
    org: Object,
  },
  methods: {
    renderBills() {
      this.$router.push({
        name: "Bills",
        params: { o_id: this.org.o_id, o_name: this.org.o_name },
      });
      localStorage.setItem("org_id", this.org.o_id);
      localStorage.setItem("org_name", this.org.o_name);
    },
    deleteOrg() {
      if(confirm('Are You sure'))
      {
        console.log('Delete');
      }
    },
  },
};
</script>

<style scope>
.fas {
  color: rgb(0, 38, 255);
}
.org {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>