import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import StockList from "@/pages/StockList.vue";
import OrderList from "@/pages/OrderList.vue";
import Typography from "@/pages/Typography.vue";
import Notifications from "@/pages/Notifications.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "dashboard",
        name: "统计面板",
        component: Dashboard
      },
      {
        path: "user",
        name: "个人信息",
        component: UserProfile
      },
      {
        path: "stockList",
        name: "监听记录",
        component: StockList
      },
      {
        path: "orderList/:stockId",
        name: "交易记录",
        component: OrderList,
        props: true
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "notifications",
        name: "通知",
        component: Notifications
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

export default routes;
