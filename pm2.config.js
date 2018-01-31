module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
  apps: [
    {
      name: 'best-node',
      script: 'index.js',
      env: {   // all environment
      },
      'instances': 'max',   // 如果是fork, 不用配置
      'exec_mode': 'cluster'  // cluster or fork
    }
  ]
}
