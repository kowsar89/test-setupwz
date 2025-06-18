// Mock data for the setup wizard
export const wizardData = {
  cacheOptions: [
    {
      id: 'page_cache',
      name: 'Enable Page Cache',
      description: 'Cache rendered pages to improve site speed',
      enabled: true
    },
    {
      id: 'object_cache',
      name: 'Enable Object Cache',
      description: 'Cache database queries and API responses',
      enabled: true
    },
    {
      id: 'browser_cache',
      name: 'Enable Browser Cache',
      description: 'Set cache headers for static assets',
      enabled: true
    },
    {
      id: 'gzip_compression',
      name: 'Enable Gzip Compression',
      description: 'Compress files before sending to browser',
      enabled: false
    }
  ],
  
  minifyOptions: [
    {
      id: 'minify_html',
      name: 'Minify HTML',
      description: 'Remove unnecessary whitespace from HTML',
      enabled: true
    },
    {
      id: 'minify_css',
      name: 'Minify CSS',
      description: 'Compress CSS files to reduce file size',
      enabled: true
    },
    {
      id: 'minify_js',
      name: 'Minify JavaScript',
      description: 'Compress JavaScript files',
      enabled: true
    },
    {
      id: 'combine_css',
      name: 'Combine CSS Files',
      description: 'Merge multiple CSS files into one',
      enabled: false
    },
    {
      id: 'combine_js',
      name: 'Combine JavaScript Files',
      description: 'Merge multiple JavaScript files into one',
      enabled: false
    }
  ],
  
  recommendedPlugins: [
    {
      id: 'security_plugin',
      name: 'WordPress Security Plugin',
      description: 'Comprehensive security features including firewall, malware scanning, and login protection',
      icon: '🛡️',
      selected: true,
      size: '2.1 MB'
    },
    {
      id: 'backup_plugin',
      name: 'Automated Backup Solution',
      description: 'Automated daily backups with cloud storage integration',
      icon: '💾',
      selected: true,
      size: '1.8 MB'
    },
    {
      id: 'seo_plugin',
      name: 'SEO Optimization Tool',
      description: 'Complete SEO toolkit with meta tags, sitemaps, and analytics',
      icon: '📊',
      selected: true,
      size: '3.2 MB'
    }
  ]
};

// Mock API functions
export const mockAPI = {
  async saveSetupData(data) {
    // Replace with actual PHP endpoint or AJAX action
    // Example: await fetch('/wp-json/my-plugin/v1/setup', { method: 'POST', body: JSON.stringify(data) })
    
    console.log('Saving setup data:', data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate occasional errors for testing
    if (Math.random() < 0.1) {
      throw new Error('Network error occurred. Please try again.');
    }
    
    return {
      success: true,
      message: 'Setup completed successfully!',
      redirect_url: '/wp-admin/admin.php?page=my-plugin-dashboard'
    };
  },
  
  async installPlugins(plugins) {
    // Replace with actual WordPress plugin installation endpoint
    // Example: await fetch('/wp-admin/admin-ajax.php', { method: 'POST', body: formData })
    
    console.log('Installing plugins:', plugins);
    
    // Simulate installation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      installed: plugins.length,
      message: `Successfully installed ${plugins.length} plugins`
    };
  }
};