import VUE from "../main";

const SUC_CODE = 0; // 成功
const CLIENT_ERR_CODE = 1; // 客户端出现错误
const SERVER_ERR_CODE = 2; // 服务端端出现错误

// 后端返回数据示例
// const exmple = {
//   code: SUCCESS_CODE,
//   msg: "success",
//   data: "{username:dounine}"
// }

const rspDataFilter = function(data) {
  if (data.code === SUC_CODE) {
    console.log("response: success");
    if (data.msg != "") {
      VUE.$notify({
        message: data.msg,
        icon: "add_alert",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "success"
      });
    }
    return true;
  } else if (data.code === CLIENT_ERR_CODE) {
    // 客户端错误
    console.log("response: client error");
    VUE.$notify({
      message: data.msg,
      icon: "add_alert",
      horizontalAlign: "center",
      verticalAlign: "top",
      type: "danger"
    });
    return false;
  } else if (data.code === SERVER_ERR_CODE) {
    // 服务端错误
    console.log("response: server error");
    VUE.$notify({
      message: "服务器发生了一些错误",
      icon: "add_alert",
      horizontalAlign: "center",
      verticalAlign: "top",
      type: "danger"
    });
    return false;
  } else {
    console.log("response: unknown status code");
    VUE.$notify({
      message: "未知的返回状态码",
      icon: "add_alert",
      horizontalAlign: "center",
      verticalAlign: "top",
      type: "danger"
    });
    return false;
  }
};

export default rspDataFilter;
