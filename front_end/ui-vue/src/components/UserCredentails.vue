<template>
  <div class="userDetails">
    UserName:
    <input v-model="u_name" type="text" id="u_name" placeholder="User Name" />
    <br />
    Password :
    <input
      v-model="u_password"
      type="password"
      id="u_password"
      placeholder="Password"
    />
    <Button @signin="signin" title="SignIn" />
  </div>
</template>


<script>
import Button from "./Button.vue";
export default {
  name: "UserCredentails",
  data() {
    return {
      u_name: "",
      u_password: "",
    };
  },
  components: {
    Button,
  },
  methods: {
    signin() {
      this.$emit("signin", {
        u_name: this.u_name,
        u_password: this.u_password,
      });
    },
  },
};
</script>



<style >
.userDetails {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>