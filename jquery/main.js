import $ from 'jquery';
import './style.css';

// Make jQuery globally available (WordPress admin expects this)
window.$ = window.jQuery = $;

$(document).ready(function() {
  // Setup Wizard Controller
  const SetupWizard = {
    currentStep: 1,
    totalSteps: 4,
    settings: {
      cache: [],
      minify: [],
      plugins: []
    },

    init: function() {
      this.bindEvents();
      this.updateProgress();
      this.updateNavigation();
    },

    bindEvents: function() {
      // Navigation buttons
      $('#next-btn').on('click', () => this.nextStep());
      $('#prev-btn').on('click', () => this.prevStep());
      
      // Checkbox change events
      $('input[type="checkbox"]').on('change', (e) => this.saveCheckboxState(e));
      
      // Progress bar step clicks
      $('.progress-steps .step').on('click', (e) => {
        const targetStep = parseInt($(e.currentTarget).data('step'));
        if (targetStep <= this.currentStep) {
          this.goToStep(targetStep);
        }
      });
    },

    nextStep: function() {
      if (this.currentStep < this.totalSteps) {
        // Save current step before moving
        this.saveCurrentStep().then(() => {
          this.currentStep++;
          this.showStep(this.currentStep);
          this.updateProgress();
          this.updateNavigation();
          
          // Special handling for finish step
          if (this.currentStep === 4) {
            this.showSummary();
          }
        });
      }
    },

    prevStep: function() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.showStep(this.currentStep);
        this.updateProgress();
        this.updateNavigation();
      }
    },

    goToStep: function(stepNumber) {
      if (stepNumber >= 1 && stepNumber <= this.totalSteps && stepNumber <= this.currentStep) {
        this.currentStep = stepNumber;
        this.showStep(this.currentStep);
        this.updateProgress();
        this.updateNavigation();
      }
    },

    showStep: function(stepNumber) {
      // Hide all steps
      $('.step-content').removeClass('active');
      $('.progress-steps .step').removeClass('active');
      
      // Show current step
      $(`#step-${stepNumber}`).addClass('active');
      $(`.progress-steps .step[data-step="${stepNumber}"]`).addClass('active');
      
      // Update step indicator
      $('#current-step').text(stepNumber);
      
      // Add animation
      $(`#step-${stepNumber}`).hide().fadeIn(300);
    },

    updateProgress: function() {
      const progressWidth = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
      $('.progress-fill').css('width', progressWidth + '%');
      
      // Update completed steps
      $('.progress-steps .step').each((index, element) => {
        const stepNum = parseInt($(element).data('step'));
        if (stepNum < this.currentStep) {
          $(element).addClass('completed');
        } else if (stepNum === this.currentStep) {
          $(element).addClass('active').removeClass('completed');
        } else {
          $(element).removeClass('active completed');
        }
      });
    },

    updateNavigation: function() {
      // Update back button
      if (this.currentStep === 1) {
        $('#prev-btn').prop('disabled', true);
      } else {
        $('#prev-btn').prop('disabled', false);
      }
      
      // Update next button
      if (this.currentStep === this.totalSteps) {
        $('#next-btn').hide();
      } else {
        $('#next-btn').show();
        $('#next-btn').text(this.currentStep === this.totalSteps - 1 ? 'Finish' : 'Next →');
      }
    },

    saveCheckboxState: function(event) {
      const $checkbox = $(event.target);
      const name = $checkbox.attr('name');
      const value = $checkbox.val();
      const checked = $checkbox.is(':checked');
      
      // Determine which settings array to update
      let settingsKey = '';
      if (name === 'cache[]') settingsKey = 'cache';
      else if (name === 'minify[]') settingsKey = 'minify';
      else if (name === 'plugins[]') settingsKey = 'plugins';
      
      if (settingsKey) {
        if (checked) {
          // Add to array if not present
          if (this.settings[settingsKey].indexOf(value) === -1) {
            this.settings[settingsKey].push(value);
          }
        } else {
          // Remove from array
          const index = this.settings[settingsKey].indexOf(value);
          if (index > -1) {
            this.settings[settingsKey].splice(index, 1);
          }
        }
      }
    },

    saveCurrentStep: function() {
      this.showLoading();
      
      return new Promise((resolve) => {
        // Simulate AJAX call to save current step
        const stepData = {
          action: 'my_plugin_save_step', // Replace 'my_plugin_save_step' with actual PHP handler
          step: this.currentStep,
          settings: this.settings,
          nonce: 'your_nonce_here' // Replace with actual WordPress nonce
        };
        
        // Mock AJAX call - replace with actual WordPress AJAX endpoint
        setTimeout(() => {
          console.log('Saving step data:', stepData);
          
          // Simulate successful response
          const mockResponse = {
            success: true,
            data: {
              message: `Step ${this.currentStep} saved successfully`,
              settings: this.settings
            }
          };
          
          this.hideLoading();
          resolve(mockResponse);
          
          // In real implementation, use:
          /*
          $.post('/wp-admin/admin-ajax.php', stepData)
            .done((response) => {
              this.hideLoading();
              if (response.success) {
                resolve(response);
              } else {
                this.showError(response.data.message);
              }
            })
            .fail(() => {
              this.hideLoading();
              this.showError('Failed to save settings. Please try again.');
            });
          */
        }, 800);
      });
    },

    showSummary: function() {
      // Populate cache summary
      const cacheItems = this.settings.cache.map(item => {
        const labels = {
          'page_cache': 'Page Cache',
          'object_cache': 'Object Cache',
          'browser_cache': 'Browser Cache'
        };
        return `<li>${labels[item] || item}</li>`;
      });
      $('#cache-summary').html(cacheItems.length ? cacheItems.join('') : '<li>No cache options selected</li>');
      
      // Populate minify summary
      const minifyItems = this.settings.minify.map(item => {
        const labels = {
          'minify_html': 'HTML Minification',
          'minify_css': 'CSS Minification',
          'minify_js': 'JavaScript Minification',
          'combine_files': 'File Combination'
        };
        return `<li>${labels[item] || item}</li>`;
      });
      $('#minify-summary').html(minifyItems.length ? minifyItems.join('') : '<li>No minification options selected</li>');
      
      // Populate plugins summary
      const pluginItems = this.settings.plugins.map(item => {
        const labels = {
          'security_plugin': 'Security Enhancement Plugin',
          'analytics_plugin': 'Advanced Analytics Plugin',
          'performance_plugin': 'Performance Optimizer'
        };
        return `<li>${labels[item] || item}</li>`;
      });
      $('#plugins-summary').html(pluginItems.length ? pluginItems.join('') : '<li>No plugins selected for installation</li>');
    },

    showLoading: function() {
      $('#loading-overlay').fadeIn(200);
    },

    hideLoading: function() {
      $('#loading-overlay').fadeOut(200);
    },

    showError: function(message) {
      // In a real WordPress environment, you might use wp.notices or admin notices
      alert('Error: ' + message);
    }
  };

  // Initialize the setup wizard
  SetupWizard.init();

  // Add some visual feedback for interactions
  $('.option-card, .plugin-card').hover(
    function() {
      $(this).addClass('hover');
    },
    function() {
      $(this).removeClass('hover');
    }
  );

  // Smooth scrolling for better UX
  $('html').css('scroll-behavior', 'smooth');
});