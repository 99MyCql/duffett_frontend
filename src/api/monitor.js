import store from "@/store/store";
import VUE from "../main";

const wsuri = "ws://localhost:8080/api/v1/monitor/ws";

var ws;

const newWS = function(ws_onmessage) {
  ws = new WebSocket(wsuri);
  ws.onopen = ws_onopen;
  ws.onmessage = ws_onmessage;
  ws.onerror = ws_onerror;
  ws.onerror = ws_onclose;
  return ws;
};

const ws_onopen = function() {
  ws.send(store.token);
};

const ws_onerror = function() {
  VUE.$notify({
    message: "websocket 连接发生了异常",
    icon: "add_alert",
    horizontalAlign: "center",
    verticalAlign: "top",
    type: "danger"
  });
};

const ws_onclose = function(e) {
  console.log(e);
  VUE.$notify({
    message: "websocket 连接断开",
    icon: "add_alert",
    horizontalAlign: "center",
    verticalAlign: "top",
    type: "info"
  });
};

export default newWS;
