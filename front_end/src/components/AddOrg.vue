<template>
    <div class="addorg">
      Organisation Name
      <input
        class="linkField"
        v-model="o_name"
        type="text"
        id="orgName"
        placeholder="Organisation Name"
      />

      <br />
      Organisation Location
      <br />
      <input
      class="linkField"
      v-model="o_location"
      type="text"
      id="orgLocation"
      placeholder="Organisation Location"
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

      <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li :key="error" v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

    <button
      @click="$emit('cancel')"
      class="addOrgbtn"
      :style="[{ background: 'red' }]"
    >
      Cancel
    </button>

    <button @click="add" class="addOrgbtn">Add Organisation</button>
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
      errors: [],
      o_name: "",
      o_gst: "",
      o_location: "",
    };
  },
  methods: {
    async add() {
      // Validation
      this.errors = [];

      if (!this.o_name || this.o_name.length == 0) {
        this.errors.push("Organisation Name required.");
      }
      if (!this.o_gst || this.o_gst.length == 0) {
        this.errors.push("Organisation GST Number required.");
      }
      //   if (this.o_gst.length != 15) {
      //     this.errors.push("Enter a valid Organisation GST Number.");
      //   }
      if (!this.o_location || this.o_location.length == 0) {
        this.errors.push("Organisation Location required.");
      }
      if (this.errors.length > 0) return;

      // Request to backend.
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
      } else if (response.status >= 300) {
        this.errors.push(result.message);
      }
    },
  },
  emits: ["cancel", "refresh"],
};
</script>

<style scoped>
.addorg {
  margin: 5px;
  margin-left: 18%;
  padding: 10px 20px;
  position: static;
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

.addOrgbtn {
  display: inline-block;
  color: #fff;
  background: green;
  border: none;
  padding: 5px 5px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
</style>