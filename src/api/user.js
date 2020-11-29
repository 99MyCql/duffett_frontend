import axios from "./setting";

export const login = function(username, password) {
  return axios.post("/api/v1/user/login", {
    username: username,
    password: password
  });
};

export const register = function(username, password, email) {
  return axios.post("/api/v1/user/register", {
    username: username,
    password: password,
    email: email
  });
};
