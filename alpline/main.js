import './style.css'
import Alpine from 'alpinejs'
import { createSetupWizard } from './src/wizard-component.js'

// Register Alpine.js component
Alpine.data('setupWizard', createSetupWizard)

// Start Alpine.js
Alpine.start()

// Create the wizard HTML structure
document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-wp-gray py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-wp-text mb-2">Plugin Setup Wizard</h1>
        <p class="text-wp-text-light">Configure your plugin settings to get started</p>
      </div>

      <!-- Setup Wizard Component -->
      <div x-data="setupWizard" x-init="init()" class="bg-white rounded-lg shadow-lg overflow-hidden">
        
        <!-- Progress Bar -->
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-wp-text-light">Step <span x-text="currentStep"></span> of <span x-text="totalSteps"></span></span>
            <span class="text-sm font-medium text-wp-text-light" x-text="progressPercentage.toFixed(0) + '%'"></span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-wp-blue h-2 rounded-full progress-bar" :style="'width: ' + progressPercentage + '%'"></div>
          </div>
        </div>

        <!-- Step Navigation -->
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <nav class="flex space-x-8">
            <template x-for="step in totalSteps" :key="step">
              <button 
                @click="goToStep(step)"
                :class="[
                  'flex items-center text-sm font-medium transition-colors duration-200',
                  currentStep === step ? 'text-wp-blue' : 'text-wp-text-light hover:text-wp-text',
                  currentStep > step ? 'text-green-600' : ''
                ]"
                :disabled="isLoading"
              >
                <span 
                  :class="[
                    'flex items-center justify-center w-6 h-6 rounded-full border-2 mr-2 text-xs',
                    currentStep === step ? 'bg-wp-blue border-wp-blue text-white' : 'border-gray-300',
                    currentStep > step ? 'bg-green-600 border-green-600 text-white' : ''
                  ]"
                >
                  <span x-show="currentStep > step">✓</span>
                  <span x-show="currentStep <= step" x-text="step"></span>
                </span>
                <span x-text="getStepTitle(step)"></span>
              </button>
            </template>
          </nav>
        </div>

        <!-- Error/Success Messages -->
        <div x-show="error" x-transition class="wp-admin-notice notice-error mx-6 mt-4">
          <p x-text="error"></p>
        </div>
        
        <div x-show="success" x-transition class="wp-admin-notice notice-success mx-6 mt-4">
          <p x-text="success"></p>
        </div>

        <!-- Step Content -->
        <div class="p-6">
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-wp-text mb-2" x-text="getStepTitle(currentStep)"></h3>
            <p class="text-wp-text-light" x-text="getStepDescription(currentStep)"></p>
          </div>

          <!-- Step 1: Cache Options -->
          <div x-show="currentStep === 1" x-transition class="space-y-4">
            <template x-for="option in formData.cacheOptions" :key="option.id">
              <div class="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input 
                  type="checkbox" 
                  :id="option.id"
                  :checked="option.enabled"
                  @change="toggleCacheOption(option.id)"
                  class="wp-checkbox mt-1"
                >
                <div class="flex-1">
                  <label :for="option.id" class="block text-sm font-medium text-wp-text cursor-pointer" x-text="option.name"></label>
                  <p class="text-sm text-wp-text-light mt-1" x-text="option.description"></p>
                </div>
              </div>
            </template>
          </div>

          <!-- Step 2: Minify Options -->
          <div x-show="currentStep === 2" x-transition class="space-y-4">
            <template x-for="option in formData.minifyOptions" :key="option.id">
              <div class="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input 
                  type="checkbox" 
                  :id="option.id"
                  :checked="option.enabled"
                  @change="toggleMinifyOption(option.id)"
                  class="wp-checkbox mt-1"
                >
                <div class="flex-1">
                  <label :for="option.id" class="block text-sm font-medium text-wp-text cursor-pointer" x-text="option.name"></label>
                  <p class="text-sm text-wp-text-light mt-1" x-text="option.description"></p>
                </div>
              </div>
            </template>
          </div>

          <!-- Step 3: Plugin Installer -->
          <div x-show="currentStep === 3" x-transition class="space-y-4">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div class="flex">
                <div class="ml-3">
                  <h4 class="text-sm font-medium text-blue-800">Recommended Plugins</h4>
                  <p class="text-sm text-blue-700 mt-1">
                    We recommend installing these plugins to enhance your site's functionality and security.
                    <span x-text="selectedPluginCount"></span> plugin(s) selected.
                  </p>
                </div>
              </div>
            </div>

            <template x-for="plugin in availablePlugins" :key="plugin.id">
              <div class="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input 
                  type="checkbox" 
                  :id="plugin.id"
                  :checked="plugin.selected"
                  @change="togglePlugin(plugin.id)"
                  class="wp-checkbox mt-1"
                >
                <div class="flex-1">
                  <div class="flex items-center">
                    <span class="text-2xl mr-3" x-text="plugin.icon"></span>
                    <div class="flex-1">
                      <label :for="plugin.id" class="block text-sm font-medium text-wp-text cursor-pointer" x-text="plugin.name"></label>
                      <p class="text-sm text-wp-text-light mt-1" x-text="plugin.description"></p>
                      <p class="text-xs text-wp-text-light mt-1">Size: <span x-text="plugin.size"></span></p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- Step 4: Finish -->
          <div x-show="currentStep === 4" x-transition class="text-center">
            <div class="mb-8">
              <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-wp-text mb-2">Setup Complete!</h3>
              <p class="text-wp-text-light">Your plugin has been configured successfully. You can now start using all the features.</p>
            </div>

            <!-- Setup Summary -->
            <div class="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h4 class="text-sm font-medium text-wp-text mb-4">Configuration Summary:</h4>
              <div class="space-y-3 text-sm">
                <div>
                  <span class="font-medium text-wp-text">Cache Options:</span>
                  <span class="text-wp-text-light ml-2" x-text="formData.cacheOptions.filter(opt => opt.enabled).length + ' enabled'"></span>
                </div>
                <div>
                  <span class="font-medium text-wp-text">Minify Options:</span>
                  <span class="text-wp-text-light ml-2" x-text="formData.minifyOptions.filter(opt => opt.enabled).length + ' enabled'"></span>
                </div>
                <div>
                  <span class="font-medium text-wp-text">Plugins:</span>
                  <span class="text-wp-text-light ml-2" x-text="selectedPluginCount + ' selected for installation'"></span>
                </div>
              </div>
            </div>

            <button 
              @click="finishSetup()"
              :disabled="isLoading"
              class="wp-button-success"
            >
              <span x-show="isLoading" class="spinner mr-2"></span>
              <span x-show="!isLoading">Go to Dashboard</span>
              <span x-show="isLoading">Saving Settings...</span>
            </button>
          </div>
        </div>

        <!-- Navigation Footer -->
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <button 
            @click="prevStep()"
            x-show="canGoBack && !isLastStep"
            :disabled="isLoading"
            class="wp-button-secondary"
          >
            ← Previous
          </button>
          
          <div x-show="!canGoBack && !isLastStep"></div>
          
          <button 
            @click="nextStep()"
            x-show="canGoNext && !isLastStep"
            :disabled="isLoading"
            class="wp-button-primary"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  </div>
`