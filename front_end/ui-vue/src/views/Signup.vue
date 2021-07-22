<template>
  <div class="container">
    <h1>Creating A New Account</h1>
    <br />
    New UserName
    <br />
    <input v-model="u_name" type="text" id="u_name" placeholder="User Name" />
    <br />
    <p v-if="validuser">Please Enter a Valid User Name</p>
    Password
    <br />
    <input
      v-model="u_pwd"
      type="password"
      id="u_password1"
      placeholder="Password"
    />
    <br />
    Re-Enter Password
    <br />
    <input
      v-model="u_re_pwd"
      type="password"
      id="u_password2"
      placeholder="Re-Enter Password"
    />
    <br />
    <p v-if="wrongpwd">Password are not same</p>
    <p v-if="pwdlength">Password is weak</p>
    Your Organization Name
    <br />
    <input
      v-model="u_org_name"
      type="text"
      id="u_org_name"
      placeholder="Organization Name"
    />
    <br />
    Your Organization GSTIN:
    <br />
    <input
      v-model="u_org_gst"
      type="text"
      id="u_org_gst"
      placeholder="GSTIN Number"
    /><br />
    You Organization Address
    <br />
    <input
      v-model="u_org_address"
      type="text"
      id="u_org_address"
      placeholder="Organization Address"
    />
    <Button @click="signup" title="SignUp" color="black" />
    <router-link to="/">
      <Button title="Cancel" color="red" />
    </router-link>
    <router-link to="/login" v-if="usercreated">I</router-link>
  </div>
</template>
<script>
import Button from "../components/Button.vue";
export default {
  name: "Signup",
  data() {
    return {
      u_name: "",
      u_pwd: "",
      u_re_pwd: "",
      u_org_name: "",
      u_org_gst: "",
      u_org_address: "",
      wrongpwd: false,
      validuser: false,
      pwdlength: false,
      usercreated: false,
    };
  },
  methods: {
    async signup() {
      // if (this.u_pwd != this.u_re_pwd) {
      //   this.wrongpwd = true;
      //   return;
      // }
      // if (this.u_name == "" || this.u_pwd == "") {
      //   this.validuser = true;
      //   return;
      // }
      // if (this.u_pwd.length <= 5) {
      //   this.pwdlength = true;
      //   return;
      // }
      this.pwdlength = false;
      this.wrongpwd = false;
      this.validuser = false;
      const data = {
        u_name: this.u_name.trim(),
        u_password: this.u_pwd.trim(),
        u_org_name: this.u_org_name.trim(),
        u_org_gst: this.u_org_gst.trim(),
        u_org_address: this.u_org_address.trim(),
      };
      const res = await fetch("api/users/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(res.status);
      if (res.status === 200) {
        this.$router.push("login");
      }
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