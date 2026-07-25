module.exports = {
  apps: [
    {
      name: 'aidocs-backend',
      script: './server.js',
      instances: 'max', // Use maximum CPUs for clustering
      exec_mode: 'cluster', // Enables Node.js cluster module
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};
