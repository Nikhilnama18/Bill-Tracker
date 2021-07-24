<template>
  <div :key="org.o_id" v-for="org in Orgs">
    <Organisation :org="org" />
  </div>
</template>
<script>
import Organisation from "./Organisation.vue";
export default {
  name: "Organisations",
  data() {
    return {};
  },
  components: {
    Organisation,
  },
  props: {
    Orgs: Array,
  },
};
</script>

<style scope>
.fas {
  color: rgb(0, 38, 255);
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

</style>