// const path = require('path');

// function resolve(dir) {

//   return path.join(__dirname, dir);
// }
module.exports = {
    devServer: {
      port: 8080, // 端口号配置

      //cga

      historyApiFallback: true,
      proxy:{
           '/test':{
            target: 'http://localhost:5000/testt',  // 代理跨域目标接口
            changeOrigin: true,
            secure: false,  // 当代理某些https服务报错时用
            cookieDomainRewrite:false, // 可以为false，表示不修改
            pathRewrite:{
              '^/test':''
            }
           }
        },
        noInfo: true
        //
    },
    configureWebpack: {
      externals: {
        'AMap': 'AMap', // 高德地图配置
        'google':'google'
      },
      
      
    },
   

  }


//   module.exports = {
//     entry: {},
//     module: {},
//     ...
//     devServer: {
//         historyApiFallback: true,
//         proxy: [{
//             context: '/login',
//             target: 'http://www.domain2.com:8080',  // 代理跨域目标接口
//             changeOrigin: true,
//             secure: false,  // 当代理某些https服务报错时用
//             cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
//         }],
//         noInfo: true
//     }
// }


