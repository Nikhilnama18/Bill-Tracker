<template>
  <div class="org" @click="bills">
    <h2>
      {{ org.o_name }}
      {{ org.o_location }}
      {{ org.o_gst }}
    </h2>
  </div>
</template>
<script>
export default {
  name: "Organisation",
  props: {
    org: Object,
  },
  methods:{
    bills(){
      console.log('bills')
    }
  }
};
</script>
<style scope>
.fas {
  color: rgb(0, 38, 255);
}
.org {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>