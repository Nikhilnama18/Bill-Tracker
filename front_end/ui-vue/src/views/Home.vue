<template>
  <h1>
    Welcome to DT , a digital way of tracking your business to business
    transcations.
  </h1>

  <div>
    Already a member, click here to
    <router-link tag="h4" to="/login"> login. </router-link>
  </div>

  <div>
    Not a member yet? <router-link to="/signup">Signup</router-link>
    its simple.
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>