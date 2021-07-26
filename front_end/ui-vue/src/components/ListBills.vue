<template>
  <div>
    <Button
      @click="showAddBill = !showAddBill"
      :title="showAddBill === false ? 'Add Bill' : 'Cancel'"
      :color="showAddBill === false ? 'green' : 'red'"
    />
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
        <input
          v-model="dueAmmount"
          type="number"
          name="dueAmmount"
          id="dueAmmount"
          placeholder="Bill Due Ammount"
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
    <p>Total Due Ammount :{{ totalDueAmmount }} &#x20B9;</p>
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
import AppVue from "../App.vue";

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
            u_id: parseInt(this.u_id),
            o_id: parseInt(this.o_id),
            ammount: parseInt(this.ammount),
            due_ammount: parseInt(this.dueAmmount),
            issue_timestamp: new Date().toUTCString(),
          }),
        }
      );
      if (response.status == 200) {
        let result = await response.json();
        if (result.statusCode == "10000") {
          this.bills = [...this.bills, result.data[0]];
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
      const updatedBillIndex = this.bills.findIndex(
        (bill) => bill.b_id == updated_bill.b_id
      );
      // Get a new object.
      const toUpdateBill = { ...this.bills[updatedBillIndex] };
      // Now remove the to update object.
      this.bills = this.bills.filter((bill) => {
        return bill.b_id != updated_bill.b_id;
      });
      toUpdateBill["ammount"] = parseInt(updated_bill.ammount);
      toUpdateBill["due_ammount"] = parseInt(updated_bill.due_ammount);
      this.bills.splice(updatedBillIndex, 0, { ...toUpdateBill });
      console.table(this.bills);
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
    totalDueAmmount() {
      //   console.log("totalDueAmmount :", JSON.stringify(this.bills));
      const sumDueAmmount = this.bills.reduce((sum, bill) => {
        return sum + bill.due_ammount;
      }, 0);
      return this.numberWithCommas(sumDueAmmount);
    },
  },
  created() {
    this.fetchBills();
  },
};
</script>