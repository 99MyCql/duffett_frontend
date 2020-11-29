<template>
  <div class="md-layout md-alignment-center-center">
    <notifications></notifications>

    <md-card
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-40"
      style="margin-top:10%"
    >
      <md-card-header data-background-color="purple">
        <h2 class="title">Register</h2>
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
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Email</label>
              <md-input v-model="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-button class="md-primary pull-right" @click="userRegister()">
              &nbsp;&nbsp;&nbsp;&nbsp;注册&nbsp;&nbsp;&nbsp;&nbsp;
            </md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { register } from "@/api/user";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      email: ""
    };
  },
  methods: {
    userRegister() {
      let that = this;
      register(that.username, that.password, that.email).then(function(
        response
      ) {
        that.$router.push("/login");
      });
    }
  }
};
</script>
