const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  // 根据请求路径选择不同的目标地址和代理配置
  let target = '';
  let pathRewrite = {};

  if (req.url.startsWith('/api1')) {
    target = 'https://vop.baidu.com/server_api';
    pathRewrite['^/api1'] = '/';
  } else if (req.url.startsWith('/api2')) {
    target = 'https://aip.baidubce.com/oauth/2.0/token';
    pathRewrite['^/api2'] = '/';
  } else if (req.url.startsWith('/api3')) {
    target = 'http://tsn.baidu.com/text2audio';
    pathRewrite['^/api3'] = '/';
  } else if (req.url.startsWith('/api4')) {
    target = 'https://open.bigmodel.cn/api/paas/v3/model-api/';
    pathRewrite['^/api4'] = '/';
  } else {
    // 如果没有匹配的请求路径，你可以根据需要进行其他处理或返回错误
    res.status(404).send('Not Found');
    return;
  }

  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite,
  })(req, res);
};
