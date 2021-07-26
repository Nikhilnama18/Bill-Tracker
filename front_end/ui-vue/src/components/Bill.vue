<template>
  <div
    class="bill"
    :style="[
      bill.due_ammount == 0
        ? { background: 'LightGreen' }
        : bill.due_ammount < bill.ammount / 2
        ? { background: 'Lavender' }
        : { background: 'Pink' },
    ]"
  >
    <div class="bill-buttons">
      <button
        class="edit-button"
        :style="[
          bill.due_ammount == 0
            ? { background: 'LightGreen' }
            : bill.due_ammount < bill.ammount / 2
            ? { background: 'Lavender' }
            : { background: 'Pink' },
          'font-size: 120%',
        ]"
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
        :style="[
          bill.due_ammount == 0
            ? { background: 'LightGreen' }
            : bill.due_ammount < bill.ammount / 2
            ? { background: 'Lavender' }
            : { background: 'Pink' },
          'font-size: 120%',
        ]"
        @click="$emit('delete-bill', bill.b_id)"
        alt="Delete Bill"
      >
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
    <h3 v-show="bill.due_ammount == 0"> Bill Closed</h3>
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
    <label> Bill Added on : </label>
    {{ new Date(bill.issue_timestamp).toDateString() }} @
    {{ new Date(bill.issue_timestamp).toLocaleTimeString("en") }}
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

            this.$emit("update-bill", {
              ammount: parseInt(this.updateAmmount),
              due_ammount: parseInt(this.updateDueAmmount),
              b_id: this.bill.b_id,
            });
            // Update the bill in UI.
            this.bill.ammount = parseInt(this.updateAmmount);
            this.bill.due_ammount = parseInt(this.updateDueAmmount);
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
  overflow: hidden;
  min-height: 100px;
  padding: 20px;
  border-radius: 10px;
}

/* .options-div {
  position: relative;
} */
.edit-button {
  position: relative;
  margin-right: 10px;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  border: 0ch;
}

.delete-button {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  border: 0ch;
}
.bill-buttons {
  position: relative;
  left: 97%;
  font: 15px/1.4 "Poppins", sans-serif;
  color: black;
  transition: all 0.3s linear;
  outline: none;
}
</style>