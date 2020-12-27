import axios from "axios";
import VUE from "../main";
import store from "@/store/store";
import rspDataFilter from "./rspDataFilter";

// 不需要 token 验证的 URL
const NOT_AUTH_URLS = ["/api/v1/user/login", "/api/v1/user/register"];

var myAxios = axios.create();

// 添加请求拦截器
myAxios.interceptors.request.use(
  function(config) {
    console.log("===> request url:", config.url, config);
    // 如果 URL 不在 NOT_AUTH_URLS 中，则需要加上 token
    if (!(config.url in NOT_AUTH_URLS)) {
      config.headers = { Authorization: "Bearer " + store.token };
    }
    return config;
  },
  function(error) {
    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器，对响应信息作处理
myAxios.interceptors.response.use(
  resp => {
    let data = resp.data; // 获取后端返回的数据
    console.log("<=== response url:", resp.config.url, resp.data);

    if (rspDataFilter(data)) {
      return resp; // 转由.then()接收
    } else {
      return Promise.reject(resp); // 转由.catch()接收
    }
  },
  error => {
    console.log("HTTP error:", error);
    VUE.$notify({
      message: "网络请求时发生了一些错误",
      icon: "add_alert",
      horizontalAlign: "center",
      verticalAlign: "top",
      type: "danger"
    });
    return Promise.reject(error);
  }
);

export default myAxios;
