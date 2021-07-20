<template>
  <div>
    Create a New Account
    <Button @signin="signup" title="SignUp" color="black" />
    <!-- <button
      @click="signup"
      id="signup"
      class="btn"
    >
      {{ title }}
    </button> -->
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