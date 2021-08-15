<template>
  <div>
    <!-- title="showAddBill === false ? 'Add Bill' : 'Cancel'" -->
    <button @click="showAddBill = !showAddBill" v-if="!showAddBill" class="add-bill" :style="[{'margin-left':'84%'}]" title="Add Bill">
      Add Bill
    </button>
    <!-- color="showAddBill === false ? 'green' : 'red'" -->
    <div v-show="showAddBill">
        <input
          v-model="ammount"
          class="textField"
          type="number"
          name="ammount"
          id="ammount"
          placeholder="Bill Amout"
          required
        />
        <!-- TODO : Change Due to Paid Ammount  -->
        <input
          v-model="paidAmount"
          class="textField"
          type="number"
          name="paidAmount"
          id="paidAmount"
          placeholder="Bill Paid Amount"
          required
        />

        <input
          v-model="billTimestamp"
          class="textField"
          type="datetime-local"
          name="billTimestamp"
          id="billTimestamp"
          required
        />
 
        <p v-if="errors.length">
           <b>Please correct the following error(s):</b>
           <ul>
             <li :key="error" v-for="error in errors">{{ error }}</li>
           </ul>
         </p>
         <br/>
          <button @click="showAddBill = !showAddBill" class="add-bill" :style="{background:'black'}">Cancel</button>
          <button @click="createBill" class="add-bill">Add </button>
    </div>

    <p>Total Bills : {{ bills.length }}</p>
    <p>Total Ammount : {{ totalAmmount }} &#x20B9;</p>
    <p>Total Paid Ammount : {{ totoalPaidAmmount }} &#x20B9;</p>
    <p>Total Due Ammount : {{ totalDueAmmount }} &#x20B9;</p>
    <p>Open bills Paid : {{ (100 - openDuePercent).toFixed(2) }} %</p>
    <p>Open bills Due : {{ openDuePercent }} %</p>
    <div :key="bill.o_id" v-for="bill in bills">
      <Bill
        @delete-bill="deleteBill"
        @update-bill="updateBill"
        :bill="bill"
      ></Bill>
    </div>
  </div>
</template>

<script>
import Bill from "./Bill.vue";
import Button from "../components/Button.vue";

export default {
  name: "ListBills",
  props: {
    org_id: String,
  },
  data() {
    return {
      errors: [],
      bills: [],
      showAddBill: false,
      paidAmount: Number,
      ammount: Number,
      billTimestamp: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
    };
  },
  components: { Bill, Button },
  methods: {
    async fetchBills() {
      const response = await fetch(
        `api/users/${this.getUserId()}/orgs/${this.getOrgId()}/bills`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${this.jwtToken}`,
          },
        }
      );
      if (response.status === 200) {
        let result = await response.json();
        console.log(result.data);
        this.bills = result.data;
      }
    },

    async createBill(event) {
      event.preventDefault();

      // Validation
      this.errors = [];

      if (!this.ammount || parseInt(this.ammount) <= 0) {
        this.errors.push("Bill amount is too low.");
      }
      if (
        !this.paidAmount ||
        parseInt(this.paidAmount) < 0 ||
        parseInt(this.paidAmount) > parseInt(this.ammount)
      ) {
        this.errors.push("Invalid Paid Amount identified.");
      }

      if (this.errors.length > 0) return;

      const response = await fetch(
        `api/users/${this.getUserId()}/orgs/${this.getOrgId()}/bills`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            u_id: parseInt(this.getUserId()),
            o_id: parseInt(this.getOrgId()),
            ammount: parseInt(this.ammount),
            due_ammount: parseInt(this.ammount) - parseInt(this.paidAmount),
            issue_timestamp: this.billTimestamp,
          }),
        }
      );

      if (response.status == 200) {
        let result = await response.json();
        if (result.statusCode == "10000") {
          this.bills = [result.data[0], ...this.bills];
          this.showAddBill = false;
        } else {
          alert("Unable to create bill.");
        }
      } else {
        alert("Unable to create bill.");
      }
    },

    async deleteBill(b_id) {
      if (
        confirm(`Are you sure , you want to delete the bill with id : ${b_id}`)
      ) {
        const response = await fetch(
          `api/users/${this.getUserId()}/orgs/${this.getOrgId()}/bills/${b_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              authorization: `Bearer ${this.getJwtToken()}`,
            },
          }
        );

        if (response.status == 200) {
          let result = await response.json();
          if (result.statusCode == "10000") {
            this.bills = this.bills.filter((bill) => bill.b_id != b_id);
          } else {
            alert("Unable to delete bill.");
          }
        } else {
          alert("Unable to delete bill.");
        }
      }
    },

    updateBill(updated_bill) {
      console.log(updated_bill);
      //   No need to update here , updating just in the bill component is enough.
      //   const updatedBillIndex = this.bills.findIndex(
      //     (bill) => bill.b_id == updated_bill.b_id
      //   );
      //   // Get a new object.
      //   const toUpdateBill = { ...this.bills[updatedBillIndex] };
      //   // Now remove the to update object.
      //   this.bills = this.bills.filter((bill) => {
      //     return bill.b_id != updated_bill.b_id;
      //   });
      //   toUpdateBill["ammount"] = parseInt(updated_bill.ammount);
      //   toUpdateBill["due_ammount"] = parseInt(updated_bill.due_ammount);
      //   this.bills.splice(updatedBillIndex, 0, { ...toUpdateBill });
      //   console.table(this.bills);
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

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  computed: {
    totalAmmount() {
      const sumAmmount = this.bills.reduce((sum, bill) => {
        return sum + bill.ammount;
      }, 0);
      return this.numberWithCommas(sumAmmount);
    },

    totoalPaidAmmount() {
      const sumAmmount = this.bills.reduce((sum, bill) => {
        return sum + bill.ammount;
      }, 0);

      const sumDueAmmount = this.bills.reduce((sum, bill) => {
        return sum + bill.due_ammount;
      }, 0);
      return this.numberWithCommas(sumAmmount - sumDueAmmount);
    },

    totalDueAmmount() {
      //   console.log("totalDueAmmount :", JSON.stringify(this.bills));
      const sumDueAmmount = this.bills.reduce((sum, bill) => {
        return sum + bill.due_ammount;
      }, 0);
      return this.numberWithCommas(sumDueAmmount);
    },

    openDuePercent() {
      const openBills = this.bills.filter((bill) => {
        return bill.due_ammount != 0;
      });
      const sumDueAmmount = this.bills.reduce((sum, bill) => {
        return sum + bill.due_ammount;
      }, 0);

      if (openBills.length > 0) {
        const openBillsSum = openBills.reduce((sum, bill) => {
          return sum + bill.ammount;
        }, 0);

        return openBillsSum > 0
          ? ((parseInt(sumDueAmmount) / parseInt(openBillsSum)) * 100).toFixed(
              2
            )
          : 0;
      }
      return 0;
    },
  },
  created() {
    this.fetchBills();
  },
};
</script>

<style  scoped>
.textField {
  width: 70%;
  padding: 10px 10px;
  margin: 5px 0;
  display: inline-block;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
}

.add-bill {
  display: inline-block;
  background: rgb(35, 139, 35);
  color: #fff;
  border: none;
  padding: 8px 8px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
</style>
