import axios from "./setting";

export const getMonitoringStocks = function() {
  return axios.get("/api/v1/stock/getMonitoringStocks");
};

export const getStocks = function() {
  return axios.get("/api/v1/stock/getStocks");
};
