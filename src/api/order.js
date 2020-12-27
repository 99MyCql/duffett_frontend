import axios from "./setting";

export const getOrders = function(stockId) {
  return axios.post("/api/v1/order/getOrders", {
    stockId: parseInt(stockId)
  });
};
