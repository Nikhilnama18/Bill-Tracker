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
        <input type="submit" @click="createBill" />
      </form>
    </div>

    Total Bills : {{ bills.length }}
    <div :key="bill.o_id" v-for="bill in bills">
      <Bill :bill="bill"></Bill>
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
    };
  },
  components: { Bill, Button },
  methods: {
    async fetchBills() {
      this.u_id = localStorage.getItem("u_id");
      this.jwtToken = localStorage.getItem("jwtToken");
      this.o_id = localStorage.getItem("org_id") || this.$route.params.o_id;
      if (!this.o_id) {
        this.$router.push("Dashboard");
      }
      const response = await fetch(
        `api/users/${this.u_id}/orgs/${this.o_id}/bills`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${this.jwtToken}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        let result = await response.json();
        console.log("fetched bill are :", result.data);
        this.bills = result.data;
      }
    },

    async createBill(event) {
      event.preventDefault();

      this.u_id = localStorage.getItem("u_id");
      this.jwtToken = localStorage.getItem("jwtToken");
      this.o_id = localStorage.getItem("org_id") || this.$route.params.o_id;

      if (!this.o_id) {
        console.log("Sending to Dashboard from ListBills.vue");
        this.$router.push("Dashboard");
      }

      if (!this.u_id || !this.jwtToken) {
        console.log("Sending to Login from ListBills.vue");
        this.$router.push("Login");
      }

      const response = await fetch(
        `api/users/${this.u_id}/orgs/${this.o_id}/bills`,
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
        console.log("result: :", result);
        if (result.statusCode == "10000") {
          console.log("create res:", result);
          this.bills = [...this.bills, result.data[0]];
          this.showAddBill = false
          
        } else {
          alert("Unable to create bill.");
        }
      } else {
        alert("Unable to create bill.");
      }
    },
  },
  created() {
    console.log("Comp Listbills created");
    this.fetchBills();
  },
};
</script>