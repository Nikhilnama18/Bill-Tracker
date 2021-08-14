<template>
  <div class="navigation">
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

<style scoped>
.navigation {
  position: sticky;
  top: 0%;
  margin: 0%;
  color: whitesmoke;
  background: black;
  height: 10vh;
}
</style>
