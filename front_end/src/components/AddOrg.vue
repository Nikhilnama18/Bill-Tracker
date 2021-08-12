<template>
  <div class="container">
    <div class="addorg">
      Organisation Name
      <input
        class="linkField"
        v-model="o_name"
        type="text"
        id="orgName"
        placeholder="Org Name"
      />
      <br />
      Organisation GST
      <br />
      <input
        class="linkField"
        v-model="o_gst"
        type="text"
        id="orgGst"
        placeholder="Org GST"
      />
      <br />
      Organisation Location
      <br />
      <input
        class="linkField"
        v-model="o_location"
        type="text"
        id="orgLocation"
        placeholder="Org Location"
      />
      <Button @click="add" title="Add" color="blue" />
      <Button @click="$emit('cancel')" title="Cancel" color="red" />
    </div>
  </div>
</template>
<script>
import Button from "./Button.vue";
export default {
  name: "AddOrg",
  components: {
    Button,
  },
  data() {
    return {
      o_name: "",
      o_gst: "",
      o_location: "",
    };
  },
  methods: {
    async add() {
      const data = {
        u_id: localStorage.getItem("u_id"),
        o_name: this.o_name,
        o_gst: this.o_gst,
        o_location: this.o_location,
      };
      const response = await fetch(
        `api/users/${localStorage.getItem("u_id")}/orgs`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        this.$emit("refresh", result.data);
        this.$emit("cancel");
      }
    },
  },
  emits: ["cancel", "refresh"],
};
</script>
<style scoped>
.addorg {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.linkField {
  width: 70%;
  padding: 10px 10px;
  margin: 5px 0;
  display: inline-block;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>