<template>
  <div>
    Create a New Account
    <Button @signin="signup" title="SignUp" color="black" />
  </div>
</template>
<script>
import Button from "./Button.vue";
export default {
  name: "Signup",
  methods: {
    signup() {
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