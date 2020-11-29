import axios from "axios";
import VUE from "../main";
import store from "@/store/store";

const SUC_CODE = 0; // 成功
const CLIENT_ERR_CODE = 1; // 客户端出现错误
const SERVER_ERR_CODE = 2; // 服务端端出现错误

// 不需要 token 验证的 URL
const NOT_AUTH_URLS = ["/api/v1/user/login", "/api/v1/user/register"];

// 后端返回数据示例
// const exmple = {
//   code: SUCCESS_CODE,
//   msg: "success",
//   data: "{username:dounine}"
// }

var myAxios = axios.create();

// 添加请求拦截器
myAxios.interceptors.request.use(
  function(config) {
    console.log("request url:", config.url);
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
    console.log("response data:", data);

    // 客户端错误
    if (data.code === SUC_CODE) {
      console.log("response: success");
      if (data.msg == "") data.msg = "成功！";
      VUE.$notify({
        message: data.msg,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "success"
      });
      return resp; // 转由.then()接收
    } else if (data.code === CLIENT_ERR_CODE) {
      console.log("response: client error");
      VUE.$notify({
        message: data.msg,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "danger"
      });
      return Promise.reject(resp); // 转由.catch()接收
    } else if (data.code === SERVER_ERR_CODE) {
      console.log("response: server error");
      VUE.$notify({
        message: "服务器发生了一些错误",
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "danger"
      });
      return Promise.reject(resp); // 转由.catch()接收
    } else {
      console.log("response: unknown status code");
      VUE.$notify({
        message: "未知的返回状态码",
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "danger"
      });
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
