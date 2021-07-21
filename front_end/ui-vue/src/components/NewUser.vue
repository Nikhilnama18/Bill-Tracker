// Didn't understood this comp.
<template>
  <div class="userDetails">
    <h3>Create New User</h3>
    Enter User Name:
    <input v-model="u_name" type="text" id="u_name" placeholder="UserName" />
    <br />
    Enter Password :
    <input
      v-model="u_pwd1"
      type="password"
      id="u_password"
      placeholder="Password"
    />
    <br />
    Re-Enter Password
    <input
      v-model="u_pwd2"
      type="password"
      id="u_password1"
      placeholder="Re-Enter Password"
    />
    <Button @click="create" title="Create" />
    <Button @click="goBack" title="Cancel" color="red" />
  </div>
</template>
<script>
import Button from "./Button.vue";
export default {
  name: "NewUser",
  data() {
    return {
      u_name: "",
      u_pwd1: "",
      u_pwd2: "",
    };
  },
  components: {
    Button,
  },
  methods: {
    create() {
      if (this.u_pwd1 != this.u_pwd2) {
        alert("Passwords are not same ");
        return;
      }
      if (this.u_name == "" || this.u_pwd1 == "") {
        alert("Please Enter all details");
        return;
      }
      if (this.u_pwd1.length <= 5) {
        alert("Password is to weak");
        return;
      }
      this.$emit("create", { u_name: this.u_name, u_password: this.u_pwd1 });
    },
    goBack() {
      this.$emit("goBack");
    },
  },
  emits: ["create", "goBack"],
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