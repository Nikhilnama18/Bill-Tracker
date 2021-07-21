<template>
  <div class="containers">
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
      <Button @click="signin" title="SignIn" color="black" />
      <router-link to="/">
        <Button title="Cancel" color="red" />
      </router-link>
    </div>
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
    };
  },
  components: {
    Button,
  },
  methods: {
    async signin() {
      const data = {
        u_name: this.u_name,
        u_password: this.u_password,
      };
      const res = await fetch("api/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json(res);
      console.log(result);
      // if (result.statusCode === "10000") {
      // this.$router.push("Dashboard");
      // }
      // if(result.data)

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