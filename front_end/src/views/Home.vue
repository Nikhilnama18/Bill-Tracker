<template>
  <div>
    <h1>
      Welcome to DT , a digital way of tracking your business to business
      transcations.
    </h1>

    <div class="box">
      <div class="userDetails">
        Already a member, click here to
        <br />
        <router-link tag="h4" to="/login">
          <button class="loginbtn">Login</button>
          <!-- <Button title="Login" color="black" /> -->
        </router-link>
      </div>

      <div class="userDetails">
        Not a member yet?
        <br />
        <router-link to="/signup">
          <button class="loginbtn" :style="[{ background: 'blue' }]">
            Signup
          </button>
          <!-- <Button title="Signup" color="blue" /> -->
        </router-link>
        <br />
        its simple.
      </div>
    </div>
  </div>
</template>

<script>
// import Button from "../components/Button.vue";
export default {
  name: "Home",
  // components: {
  //   Button,
  // },
};
</script>

<style scoped>
.userDetails {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
}
.box {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 100px;
  border: 1px solid steelblue;
  padding: 50px;
  border-radius: 10px;
  position: static;
}
.loginbtn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 5px 5px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
  position: static;
  /* left: 138px; */
}
</style>