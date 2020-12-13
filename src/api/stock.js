import axios from "./setting";

const getMonitoringStocks = function() {
  return axios.get("/api/v1/stock/getMonitoringStocks");
};

export default getMonitoringStocks;
