<template>
  <div class="org" @click="renderBills">
    <h2>
      {{ org.o_name }}
      {{ org.o_location }}
      {{ org.o_gst }}
    </h2>
  </div>
</template>
<script>
export default {
  name: "Organisation",
  props: {
    org: Object,
  },
  methods: {
    renderBills() {
      this.$router.push({ name: "Bills", params: { o_id: this.org.o_id } });
      localStorage.setItem("org_id", this.org.o_id);
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