import axios from "./setting";

export const getStrategies = function() {
  return axios.get("/api/v1/strategy/getStrategies");
};

export const create = function(name, desc, content) {
  return axios.post("/api/v1/strategy/create", {
    name,
    desc,
    content
  });
};

export const update = function(id, desc, content) {
  return axios.post("/api/v1/strategy/update", {
    id,
    desc,
    content
  });
};

export const delet = function(strategyId) {
  return axios.post("/api/v1/strategy/delete", {
    strategyId
  });
};

export const testExec = function(name) {
  return axios.post("/api/v1/strategy/testExec", {
    name
  });
};
