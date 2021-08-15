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
        @click="
          isUpdateClicked = !isUpdateClicked;
          isMakePaymentClicked = false;
          updateAmmount = bill.ammount;
        "
        alt="Edit Bill"
      >
        <i
          :class="[
            'pos-static',
            'fa',
            isUpdateClicked ? 'fa-times' : 'fa-pencil',
          ]"
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
        <i
          class="fa fa-trash"
          :style="[{ position: 'static' }]"
          aria-hidden="true"
        ></i>
      </button>
    </div>

    <h3 v-show="bill.due_ammount == 0">Bill Closed</h3>
    <p></p>
    <label> Bill ID : </label>
    {{ bill.b_id }}
    <p></p>

    <div v-show="isUpdateClicked">
      <label> Ammount : </label>
      <input
        class="linkField"
        type="number"
        name="update_ammount"
        id="update_ammount"
        v-model="updateAmmount"
      />&#x20B9;
      <p></p>

      <!-- Disabling the abilit to directly update due amount  -->
      <!-- <label> Due Ammount : </label>
      <input
        class="linkField"
        type="number"
        name="update_due_ammount"
        id="update_due_ammount"
        v-model="updateDueAmmount"
      />&#x20B9; -->
    </div>

    <div v-show="!isUpdateClicked">
      <label> Ammount : </label>
      {{ numberWithCommas(bill.ammount) }} &#x20B9;

      <p></p>
    </div>

    <label> Due Ammount : </label>
    {{ numberWithCommas(bill.due_ammount) }} &#x20B9;

    <p></p>
    <label> Bill Added on : </label>
    {{ new Date(bill.issue_timestamp).toDateString() }} @
    {{ new Date(bill.issue_timestamp).toLocaleTimeString("en") }}

    <p></p>
    <div v-show="billUpdatedTime != null">
      <label> Bill Last Updated on : </label>
      {{ new Date(billUpdatedTime).toDateString() }} @
      {{ new Date(billUpdatedTime).toLocaleTimeString("en") }}
    </div>
    <div v-show="billUpdatedTime == null">
      <label> Bill Last Updated on : Not Updated.</label>
    </div>

    <div v-show="isUpdateClicked">
      <Button title="Update" color="purple" @click="updateBill" />
    </div>

    <!-- Make Payment -->
    <div v-show="isMakePaymentClicked">
      <label> Paying Ammount : </label>
      <input
        class="linkField"
        type="number"
        name="payment_ammount"
        id="payment_ammount"
        v-model="paymentAmmount"
      />&#x20B9;
    </div>

    <p></p>
    <div v-show="this.bill.due_ammount != 0">
      <p>
        <b v-show="paymentIsGreater"
          >Payment amount is greater than due amount</b
        >
      </p>
      <button
        @click="
          isMakePaymentClicked = !isMakePaymentClicked;
          paymentIsGreater = false;
          paymentAmmount = 0;
        "
        class="make-payment"
        :style="{ background: 'black' }"
        v-show="isMakePaymentClicked"
      >
        Cancel
      </button>

      <button @click="makePaymentClicked" class="make-payment">
        {{ isMakePaymentClicked == true ? "Pay" : "Make Payment" }}
      </button>
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
      isMakePaymentClicked: false,
      updateAmmount: this.bill.ammount,
      //   updateDueAmmount: this.bill.due_ammount,
      paymentAmmount: 0,
      paymentIsGreater: false,
      billUpdatedTime: this.bill.u_date,
    };
  },
  emits: ["delete-bill", "update-bill"],
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async updateBill() {
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
              due_ammount:
                parseInt(this.bill.due_ammount) +
                parseInt(this.updateAmmount) -
                this.bill.ammount,
            }),
          }
        );

        if (response.status == 200) {
          let result = await response.json();
          if (result.statusCode == "10000") {
            this.isUpdateClicked = false;

            // No dependencies on this event emit currently.
            this.$emit("update-bill", {
              ammount: parseInt(this.updateAmmount),
              //   due_ammount: parseInt(this.updateDueAmmount),
              b_id: this.bill.b_id,
            });
            // Update the bill in UI.
            this.bill.ammount = parseInt(result.data[0].ammount);
            this.bill.due_ammount = result.data[0].due_ammount;
            this.billUpdatedTime = result.data[0].u_date;
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

    async makePaymentClicked() {
      // Close the update fields
      this.isUpdateClicked = false;

      if (!this.isMakePaymentClicked || this.paymentAmmount == 0) {
        this.isMakePaymentClicked = true;
        return;
      }
      this.paymentIsGreater = false;
      if (
        confirm(
          `Are you sure , you want to make payment towards the bill with id : ${this.bill.b_id}`
        )
      ) {
        // To show cancel button
        this.isMakePaymentClicked = true;

        // Validate this.paymentAmmount value
        // Payment is more than due.
        if (this.paymentAmmount > this.bill.due_ammount) {
          //   alert("Your payment is greater than due.");
          this.paymentIsGreater = true;
          return;
        }

        const newDueAmmount = this.bill.due_ammount - this.paymentAmmount;
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
              due_ammount: parseInt(newDueAmmount),
            }),
          }
        );

        if (response.status == 200) {
          let result = await response.json();
          if (result.statusCode == "10000") {
            this.isMakePaymentClicked = false;

            // Update the bill in UI.
            this.bill.due_ammount = parseInt(newDueAmmount);
            this.billUpdatedTime = result.data[0].u_date;
          } else {
            alert("Unable to update payment of bill. Please try again");
          }
        } else {
          alert("Unable to update payment of bill. Please try again");
        }

        this.paymentAmmount = 0;
        this.isMakePaymentClicked = false;
      }
    },
  },
};
</script>

<style scope>
.bill {
  background: #f4f4f4;
  margin-top: 15%;
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
  margin-right: 10px;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  border: 0ch;
}

.delete-button {
  position: static;
  overflow: auto;
  border-radius: 8px;
  cursor: pointer;
  border: 0ch;
}
.bill-buttons {
  left: 97%;
  font: 15px/1.4 "Poppins", sans-serif;
  color: black;
  transition: all 0.3s linear;
  outline: none;
  float: right;
}

.linkField {
  width: 25%;
  padding: 3px 3px;
  margin: 1px 0;
  display: inline-block;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
}

.pos-static {
  position: static;
}

.make-payment {
  display: inline-block;
  background: indigo;
  color: white;
  padding: 5px 5px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
  border: none;
  position: static;
}
</style>
