<template>
  <div>
    UserName :
    <input v-model="u_name" type="text" id="u_name" placeholder="User Name" />
    <br />
    Password :
    <input
      v-model="u_password"
      type="password"
      id="u_password"
      placeholder="Password"
    />
    <Button @click="signup" title="SignUp" color="black" />
  </div>
</template>
<script>
import Button from "../components/Button.vue";
export default {
  name: "Signup",
  methods: {
    signup() {
      // TODO: Need to rewrite this.
      this.$emit("signup");
    },
  },
  components: {
    Button,
  },
  props: {
    title: String,
  },
  emits: ["signup"],
};
</script>