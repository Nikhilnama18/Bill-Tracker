<template>
  <div>
    <h1>
      Welcome to DT , a digital way of tracking your business to business
      transcations.
    </h1>

    <div class="containers">
      <div class="userDetails">
        Already a member, click here to
        <router-link tag="h4" to="/login">
          <Button title="Login" color="black" />
        </router-link>
      </div>

      <div class="userDetails">
        Not a member yet?
        <br />
        <router-link to="/signup">
          <Button title="Signup" color="blue" />
        </router-link>
        its simple.
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
export default {
  name: "Home",
  components: {
    Button,
  },
};
</script>

<style scoped>
.userDetails {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.containers {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 100px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 10px;
}
</style>