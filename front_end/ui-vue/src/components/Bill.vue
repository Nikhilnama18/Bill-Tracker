<template>
  <div class="org">
    <label> Org ID : </label>
    {{ bill.o_id }}
    <p></p>
    <label> Bill ID : </label>
    {{ bill.b_id }}
    <p></p>
    <label> Ammount : $</label>
    {{ bill.ammount }}
    <p></p>
    <label> Due Ammount : $</label>
    {{ bill.due_ammount }}
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
};
</script>

<style scope>
.fas {
  color: rgb(0, 38, 255);
}
.bill {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.bill h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>