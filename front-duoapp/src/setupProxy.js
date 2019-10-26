// login axios요청 할 때 시도했던 코드
// const proxy = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(
//         proxy('/api', {
//             target:'localhost:4000/api/',
//             secure: false,
//             changeOrigin: true,
//             pathRewrite: { '^/api': ''},
//         })
//     );
// };