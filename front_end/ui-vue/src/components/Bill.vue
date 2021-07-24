<template>
  <div class="org">
    <button style="font-size: 120%;" class="delete-button" @click="$emit('delete-bill', bill.b_id)">
      <i class="fa fa-trash " aria-hidden="true"></i>
    </button>
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
  emits: ["delete-bill"],
};
</script>

<style scope>
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

.delete-button {
  position: absolute;
  left: 97%;
  cursor: pointer;
  font: 15px/1.4 "Poppins", sans-serif;
  color: black;
  transition: all 0.3s linear;
  outline: none;

}
</style>