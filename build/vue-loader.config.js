module.exports = (isDev) => {
  return {
    preserveWhitespace: true,
    extractCSS: !isDev,
    cssModules: {
      localIdentName: '[path]-[name]-[hash:base64:5]',
      camelCase: true
    },
    // hotReload: false, // 根据环境变量生成
  }
}