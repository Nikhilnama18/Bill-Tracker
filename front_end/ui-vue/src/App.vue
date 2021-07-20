<template>
  <div class="container">
    <Header title="/Billing App" />
    <UserCredentails @signin="login" v-if="showuser" />
    <Signup
      @signup="signup"
      v-if="showuser"
      :title="showuser ? 'Signup' : 'Cancel'"
    />
    <NewUser @goBack="signup" @create="what" v-if="!showuser" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import UserCredentails from "./components/UserCredentails.vue";
import Signup from "./components/Signup.vue";
import NewUser from "./components/NewUser.vue";
export default {
  name: "App",
  data() {
    return {
      showuser: true,
    };
  },
  components: {
    Header,
    UserCredentails,
    Signup,
    NewUser,
  },
  methods: {
    login(data) {
      console.log(data);
    },
    signup() {
      this.showuser = !this.showuser;
    },
    what() {
      console.log("Okay");
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
