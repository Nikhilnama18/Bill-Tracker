<template>
  <div class="bill">
    <div class="edit-button">
      <button
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
        style="font-size: 120%"
        @click="$emit('delete-bill', bill.b_id)"
        alt="Delete Bill"
      >
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>

    <label> Org ID : </label>
    {{ bill.o_id }}
    <p></p>
    <label> Bill ID : </label>
    {{ bill.b_id }}
    <p></p>

    <div v-show="isUpdateClicked">
      <label> Ammount : </label>
      <input
        type="number"
        name="update_ammount"
        id="update_ammount"
        v-model="updateAmmount"
      />&#x20B9;
      <p></p>
      <label> Due Ammount : </label>
      <input
        type="number"
        name="update_due_ammount"
        id="update_due_ammount"
        v-model="updateDueAmmount"
      />&#x20B9;
    </div>

    <div v-show="!isUpdateClicked">
      <label> Ammount : </label>
      {{ numberWithCommas(bill.ammount) }} &#x20B9;

      <p></p>
      <label> Due Ammount : </label>
      {{ numberWithCommas(bill.due_ammount) }} &#x20B9;
    </div>

    <p></p>
    <label> Bill Generated at : </label>
    {{ bill.issue_timestamp }}
    <div v-show="isUpdateClicked">
      <Button title="Update" color="purple" @click="updateBill" />
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "Bill",
  components: { Button },
  props: {
    bill: Object,
  },
  data() {
    return {
      isUpdateClicked: false,
      updateAmmount: this.bill.ammount,
      updateDueAmmount: this.bill.due_ammount,
    };
  },
  emits: ["delete-bill", "update-bill"],
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async updateBill() {
      console.log("update bill :", this.bill.b_id);
      if (
        confirm(
          `Are you sure , you want to update the bill with id : ${this.bill.b_id}`
        )
      ) {
        const response = await fetch(
          `api/users/${this.getUserId()}/orgs/${this.getOrgId()}/bills/${
            this.bill.b_id
          }`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              authorization: `Bearer ${this.getJwtToken()}`,
            },
            body: JSON.stringify({
              ammount: parseInt(this.updateAmmount),
              due_ammount: parseInt(this.updateDueAmmount),
            }),
          }
        );

        if (response.status == 200) {
          let result = await response.json();
          if (result.statusCode == "10000") {
            this.isUpdateClicked = false;
            // Update the bill in UI.
            this.$emit("update-bill", {
              ammount: parseInt(this.updateAmmount),
              due_ammount: parseInt(this.updateDueAmmount),
              b_id: this.bill.b_id,
            });
          } else {
            alert("Unable to update bill.");
          }
        } else {
          alert("Unable to update bill.");
        }
      }
    },

    getUserId() {
      const u_id = localStorage.getItem("u_id");
      if (!u_id) {
        this.$router.push("Login");
      }
      return u_id;
    },

    getJwtToken() {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        this.$router.push("Login");
      }
      return jwtToken;
    },

    getOrgId() {
      const o_id = localStorage.getItem("org_id") || this.$route.params.o_id;
      if (!o_id) {
        this.$router.push("Dashboard");
      }
      return o_id;
    },
  },
};
</script>

<style scope>
.bill {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
}

/* .options-div {
  position: relative;
} */
/* .delete-button {
  position: relative;
  left: 99%;
  cursor: pointer;
  font: 15px/1.4 "Poppins", sans-serif;
  color: black;
  transition: all 0.3s linear;
  outline: none;
} */
.edit-button {
  position: relative;
  left: 97%;
  cursor: pointer;
  font: 15px/1.4 "Poppins", sans-serif;
  color: black;
  transition: all 0.3s linear;
  outline: none;
}
</style>