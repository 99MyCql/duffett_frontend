module.exports = {
  devServer: {
    // vue项目启动时的ip地址和端口
    host: "localhost",
    port: 8000,
    proxy: {
      // 匹配所有以 /api 开头的url
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true
      }
    }
  }
};
