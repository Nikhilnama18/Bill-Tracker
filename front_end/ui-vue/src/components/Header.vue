<template>
  <div >
    <header>
      <h1>{{ title }}</h1>
    </header>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    title: String,
  },
};
</script>



