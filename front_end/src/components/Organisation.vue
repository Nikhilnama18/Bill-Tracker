<template>
  <div class="org">
    <div class="bill-buttons">
      <button
        class="edit-button"
        style="font-size: 120%"
        @click="isUpdateClicked = !isUpdateClicked"
        alt="Edit Bill"
      >
        <i
          :class="['fa', isUpdateClicked ? 'fa-times' : 'fa-pencil']"
          aria-hidden="true"
        ></i>
      </button>
      <button
        class="delete-button"
        style="font-size: 120%"
        @click="deleteOrg"
        alt="Delete Bill"
      >
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>

    <div @click="renderBills" v-show="!isUpdateClicked">
      <label>Org Name : </label>
      {{ org.o_name }}
      <p></p>
      <label> Location : </label>
      {{ org.o_location }}
      <p></p>
      <label>GST Number : </label>
      {{ org.o_gst }}
    </div>

    <div v-show="isUpdateClicked">
      <label> Org Name : </label>
      <input
        class="linkField"
        type="text"
        name="update_Name"
        v-model="updateName"
      />
      <p></p>
      <label> Location : </label>
      <input
        class="linkField"
        type="text"
        name="update_Location"
        v-model="updateLocation"
      />
      <label> GST Number: </label>
      <input
        class="linkField"
        type="text"
        name="update_GST_Number"
        v-model="updateGST"
      />
      <Button @click="updateOrg" title="Update" color="purple" />
    </div>
  </div>
</template>


<script>
import Button from "./Button.vue";
export default {
  name: "Organisation",
  data() {
    return {
      isUpdateClicked: false,
      updateName: this.org.o_name,
      updateLocation: this.org.o_location,
      updateGST: this.org.o_gst,
    };
  },
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
      if (confirm("Are You sure ? You wanna delete this Organization")) {
        this.$emit("deleteOrg", this.org.o_id);
      }
    },
    async updateOrg() {
      if (confirm("Are You sure ? You wanna Update this Organization")) {
        const response = await fetch(
          `api/users/${localStorage.getItem("u_id")}/orgs/${this.org.o_id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify({
              u_id: localStorage.getItem("u_id"),
              o_id: this.org.o_id,
              o_name: this.updateName,
              o_gst: this.updateGST,
              o_location: this.updateLocation,
            }),
          }
        );
        if (response.status === 200) {
          this.isUpdateClicked = false;
          this.org.o_name = this.updateName;
          this.org.o_location = this.updateLocation;
          this.org.o_gst = this.updateGST;
        }
      }
    },
  },
  emits: ["deleteOrg", "updateOrg"],
};
</script>

<style  scoped>
.fas {
  color: rgb(0, 38, 255);
}
.org {
  background: #f4f4f4;
  margin: 5px;
  overflow: hidden;
  min-height: 100px;
  padding: 20px;
  border-radius: 10px;
}
.linkField {
  width: 40%;
  padding: 3px 3px;
  margin: 1px 0;
  display: inline-block;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>