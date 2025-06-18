import { wizardData, mockAPI } from './wizard-data.js';

export function createSetupWizard() {
  return {
    // Wizard state
    currentStep: 1,
    totalSteps: 4,
    isLoading: false,
    error: null,
    success: null,
    
    // Form data
    formData: {
      cacheOptions: [...wizardData.cacheOptions],
      minifyOptions: [...wizardData.minifyOptions],
      selectedPlugins: wizardData.recommendedPlugins.filter(p => p.selected)
    },
    
    // Available options
    availablePlugins: [...wizardData.recommendedPlugins],
    
    // Computed properties
    get progressPercentage() {
      return (this.currentStep / this.totalSteps) * 100;
    },
    
    get canGoNext() {
      return this.currentStep < this.totalSteps && !this.isLoading;
    },
    
    get canGoBack() {
      return this.currentStep > 1 && !this.isLoading;
    },
    
    get isLastStep() {
      return this.currentStep === this.totalSteps;
    },
    
    get selectedPluginCount() {
      return this.formData.selectedPlugins.length;
    },
    
    // Navigation methods
    nextStep() {
      if (this.canGoNext) {
        this.clearMessages();
        this.currentStep++;
      }
    },
    
    prevStep() {
      if (this.canGoBack) {
        this.clearMessages();
        this.currentStep--;
      }
    },
    
    goToStep(step) {
      if (step >= 1 && step <= this.totalSteps && !this.isLoading) {
        this.clearMessages();
        this.currentStep = step;
      }
    },
    
    // Form handling methods
    toggleCacheOption(optionId) {
      const option = this.formData.cacheOptions.find(opt => opt.id === optionId);
      if (option) {
        option.enabled = !option.enabled;
      }
    },
    
    toggleMinifyOption(optionId) {
      const option = this.formData.minifyOptions.find(opt => opt.id === optionId);
      if (option) {
        option.enabled = !option.enabled;
      }
    },
    
    togglePlugin(pluginId) {
      const plugin = this.availablePlugins.find(p => p.id === pluginId);
      if (plugin) {
        plugin.selected = !plugin.selected;
        
        // Update selected plugins array
        if (plugin.selected) {
          this.formData.selectedPlugins.push(plugin);
        } else {
          this.formData.selectedPlugins = this.formData.selectedPlugins.filter(p => p.id !== pluginId);
        }
      }
    },
    
    // API methods
    async finishSetup() {
      this.isLoading = true;
      this.clearMessages();
      
      try {
        // First install selected plugins
        if (this.formData.selectedPlugins.length > 0) {
          await mockAPI.installPlugins(this.formData.selectedPlugins);
        }
        
        // Then save all setup data
        const result = await mockAPI.saveSetupData(this.formData);
        
        this.success = result.message;
        
        // Redirect after a brief delay
        setTimeout(() => {
          if (result.redirect_url) {
            // Replace with actual redirect in WordPress
            // window.location.href = result.redirect_url;
            console.log('Would redirect to:', result.redirect_url);
          }
        }, 2000);
        
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Utility methods
    clearMessages() {
      this.error = null;
      this.success = null;
    },
    
    getStepTitle(step) {
      const titles = {
        1: 'Cache Options',
        2: 'Minify Options', 
        3: 'Plugin Installer',
        4: 'Setup Complete'
      };
      return titles[step] || '';
    },
    
    getStepDescription(step) {
      const descriptions = {
        1: 'Configure caching settings to improve your site performance',
        2: 'Optimize your site by minifying CSS, JavaScript, and HTML files',
        3: 'Install recommended plugins to enhance your site functionality',
        4: 'Your WordPress site has been successfully optimized!'
      };
      return descriptions[step] || '';
    },
    
    // Initialize component
    init() {
      console.log('Setup Wizard initialized');
      // Any initialization logic here
    }
  };
}