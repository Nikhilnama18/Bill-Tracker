<template>
  <div>
    <Header title="/Billing App" />
    <!-- <UserCredentails @signin="login" v-if="showuser" /> -->
    <!-- <Signup
      @signup="signup"
      v-if="showuser"
      :title="showuser ? 'Signup' : 'Cancel'"
    />
    <NewUser @goBack="signup" @create="create" v-if="!showuser" /> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "App",
  data() {
    return {
      showuser: true,
    };
  },
  components: {
    Header,
  },
  methods: {
    async login(data) {
      const res = await fetch("http://localhost:3001/v1/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status == 200) {
        const result = await res.json();
        console.log(result);
      } else {
        alert("Unable to login.");
      }
    },
    signup() {
      this.showuser = !this.showuser;
    },
    async create(data) {
      const res = await fetch("http://localhost:3001/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 5px 5px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>   
