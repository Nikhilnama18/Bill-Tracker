<template>
  <div>
    <!-- title="showAddBill === false ? 'Add Bill' : 'Cancel'" -->
    <button @click="showAddBill = !showAddBill" class="btns" title="Add Bill">
      Add Bill
    </button>
    <!-- color="showAddBill === false ? 'green' : 'red'" -->
    <div v-show="showAddBill">
      <form>
        <input
          v-model="ammount"
          type="number"
          name="ammount"
          id="ammount"
          placeholder="Bill Ammout"
          required
        />
        <!-- TODO : Change Due to Paid Ammount  -->
        <input
          v-model="dueAmmount"
          type="number"
          name="dueAmmount"
          id="dueAmmount"
          placeholder="Bill Due Ammount"
          required
        />

        <input
          v-model="billTimestamp"
          type="datetime-local"
          name="billTimestamp"
          id="billTimestamp"
          required
        />

        <input
          type="submit"
          @click="createBill"
          value="Add bill"
          :style="{ background: '#458eff' }"
          class="btn"
        />
      </form>
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
      bills: [],
      showAddBill: false,
      dueAmmount: 0,
      ammount: 0,
      billTimestamp: new Date(),
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
            due_ammount: parseInt(this.dueAmmount),
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
      return this.numberWithCommas(
      sumAmmount - sumDueAmmount
      );
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
.btns {
  top: 2%;
  left: 90%;
  display: inline-block;
  background: rgb(35, 139, 35);
  color: #fff;
  border: none;
  padding: 5px 5px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
  position: fixed;
}
</style>