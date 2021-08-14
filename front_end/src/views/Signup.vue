<template>
  <div class="containers">
    <h1 class="h1">Creating A New Account</h1>
    <br />
    <input
      class="textfields"
      v-model="u_name"
      type="text"
      id="u_name"
      placeholder="User Name"
    />
    <br />
    <p v-if="validuser">Please Enter a Valid User Name</p>
    <input
      class="textfields"
      v-model="u_pwd"
      type="password"
      id="u_password1"
      placeholder="Password"
    />
    <br />
    <input
      class="textfields"
      v-model="u_re_pwd"
      type="password"
      id="u_password2"
      placeholder="Re-Enter Password"
    />
    <p v-if="wrongpwd">Password are not same</p>
    <p v-if="pwdlength">Password is weak</p>
    <p></p>
    <input
      class="textfields"
      v-model="u_org_name"
      type="text"
      id="u_org_name"
      placeholder="Organization Name"
    />
    <br />
    <input
      class="textfields"
      v-model="u_org_gst"
      type="text"
      id="u_org_gst"
      placeholder="GSTIN Number"
    />
    <br />
    <input
      class="textfields"
      v-model="u_org_address"
      type="text"
      id="u_org_address"
      placeholder="Organization Address"
    />
    <br />
    <button class="btns" @click="signup">SignUp</button>
    <router-link to="/" v-if="cancelclicked">
      <button
        class="btns"
        @click="cancel"
        :style="[{ left: '17px' }, { background: 'red' }]"
      >
        Cancel
      </button>
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
      cancelclicked: true,
    };
  },
  methods: {
    async signup() {
      if (this.u_pwd != this.u_re_pwd) {
        this.wrongpwd = true;
        return;
      }
      if (this.u_name == "" || this.u_pwd == "") {
        this.validuser = true;
        return;
      }
      if (this.u_pwd.length <= 5) {
        this.pwdlength = true;
        return;
      }
      if (
        this.u_name === "" ||
        this.u_pwd === "" ||
        this.u_org_address === "" ||
        this.u_org_gst === "" ||
        this.u_org_name === "" ||
        this.u_re_pwd === ""
      ) {
        alert("Please enter all details");
        return;
      }
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
    // cancelclick() {
    //   console.log("Clicked");
    //   this.cancelclicked = true;
    // },
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

<style scoped>
.containers {
  max-width: 600px;
  margin: 50px auto;
  border: 1px solid steelblue;
  padding: 10px;
  border-radius: 10px;
  position: static;
  padding: 50px;
}

.h1 {
  margin-left: 13%;
  position: static;
}

.textfields {
  width: 70%;
  top: 50%;
  left: 14%;
  padding: 10px 20px;
  margin: 7px;
  margin-left: 15%;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  position: static;
}

.btns {
  /* left: 169px; */
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 5px 5px;
  margin: 5px;
  margin-left: 23%;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
  position: static;
}
</style>
