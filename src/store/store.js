var store = {
  token: ""
};

store.token = sessionStorage.getItem("token");

export default store;
