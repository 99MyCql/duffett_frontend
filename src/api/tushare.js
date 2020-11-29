import axios from "./setting";

const tushareApi = function(api_name, params, fields) {
  return axios.post("/api/v1/data/tushare", {
    api_name: api_name,
    params: params,
    fields: fields
  });
};

export default tushareApi;
