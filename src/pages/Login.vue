<template>
  <div class="md-layout md-alignment-center-center">
    <notifications></notifications>

    <md-card
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-40"
      style="margin-top:10%"
    >
      <md-card-header data-background-color="purple">
        <h2 class="title">Login</h2>
        <p class="category"></p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Username</label>
              <md-input v-model="username"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Passowrd</label>
              <md-input v-model="password" type="password"></md-input>
            </md-field>
          </div>
          <span class="md-layout-item pull-right">
            Don't have an account?
            <a href="/#/register" class="text-primary">Create</a>
          </span>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-button class="md-primary pull-right" @click="userLogin()">
              &nbsp;&nbsp;&nbsp;&nbsp;登录&nbsp;&nbsp;&nbsp;&nbsp;
            </md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { login } from "@/api/user";
import store from "@/store/store";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    userLogin() {
      let that = this;
      login(that.username, that.password).then(function(resp) {
        store.token = resp.data.data.token;
        sessionStorage.setItem("token", store.token);
        that.$router.push("/dashboard");
      });
    }
  }
};
</script>
