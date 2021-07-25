<template>
  <div class="bill">
    <button
      class="delete-button"
      style="font-size: 120%"
      @click="$emit('delete-bill', bill.b_id)"
    >
      <i class="fa fa-trash" aria-hidden="true"></i>
    </button>
    <label> Org ID : </label>
    {{ bill.o_id }}
    <p></p>
    <label> Bill ID : </label>
    {{ bill.b_id }}
    <p></p>
    <label> Ammount : </label>
    {{ numberWithCommas(bill.ammount) }} &#x20B9;
    <p></p>
    <label> Due Ammount : </label>
    {{ numberWithCommas(bill.due_ammount) }} &#x20B9;
    <p></p>
    <label> Bill Generated at : </label>
    {{ bill.issue_timestamp }}
  </div>
</template>

<script>
export default {
  name: "Bill",
  props: {
    bill: Object,
  },
  emits: ["delete-bill"],
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

.delete-button {
  position: relative;
  left: 99%;
  cursor: pointer;
  font: 15px/1.4 "Poppins", sans-serif;
  color: black;
  transition: all 0.3s linear;
  outline: none;
}
</style>