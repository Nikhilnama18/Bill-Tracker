<template>
  <div class="containers">
    <form class="userDetails">
      <label> UserName:</label>
      <input
        v-model="u_name"
        type="text"
        id="u_name"
        placeholder="User Name"
        required
      />
      <br />
      <label>Password :</label>
      <input
        v-model="u_password"
        type="password"
        id="u_password"
        placeholder="Password"
        required
      />
      <br />
      <p v-if="loginFail">Username or password is wrong.</p>
      <p v-if="loginFormEmpty">Please fill Username and password.</p>
      <p v-if="connectionIssue">
        Cannot connect to our service. Please try again in few moments.
      </p>
      <input
        :disabled="!isLoginEnabled"
        type="submit"
        @click="signin"
        value="Login"
        :style="{ background: '#458eff' }"
        class="btn"
      />
      <router-link to="/">
        <Button title="Cancel" color="red" />
      </router-link>
    </form>
  </div>
</template>


<script>
import Button from "../components/Button.vue";
export default {
  name: "Login",
  data() {
    return {
      u_name: "",
      u_password: "",
      loginFail: false,
      loginFormEmpty: false,
      connectionIssue: false,
    };
  },
  components: {
    Button,
  },
  computed: {
    isLoginEnabled() {
      return this.u_name.trim().length > 1 && this.u_password.trim().length > 1;
    },
  },
  methods: {
    async signin(event) {
      event.preventDefault();
      //Reset messages .
      this.loginFail = false;
      this.loginFormEmpty = false;
      this.connectionIssue = false;

      if (this.u_name.trim() === "" || this.u_password.trim() === "") {
        this.loginFormEmpty = true;
        return;
      }
      const data = {
        u_name: this.u_name,
        u_password: this.u_password,
      };
      console.log("In signin :", JSON.stringify(data));
      const response = await fetch("api/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status == 200) {
        const result = await response.json(response);
        // console.log(result);
        // console.log(result.data.token);
        if (result.statusCode === "10000") {
          localStorage.setItem("u_id", JSON.stringify(result.data.u_id));
          localStorage.setItem("jwtToken", JSON.stringify(result.data.token));
          this.$router.push("Dashboard");
        }
      } else if (response.status == 500) {
        this.connectionIssue = true;
      } else {
        // TODO : Need to write a error component.
        this.loginFail = true;
      }
    },
    getUserId() {
      return localStorage.getItem("u_id");
    },

    getJwtToken() {
      return localStorage.getItem("jwtToken");
    },
  },
  created() {
    if (this.getUserId() && this.getJwtToken()) {
      // User id and jwt token are present.
      this.$router.push("Dashboard");
    }
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
.containers {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 100px;
  border: 1px solid steelblue;
  padding: 20px;
  border-radius: 10px;
}
</style>