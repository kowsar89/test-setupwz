<template>
  <div class="wizard">
    <div class="wizard__container">
      <div class="wizard__header">
        <h1 class="wizard__title">Plugin Setup Wizard</h1>
        <p class="wizard__description">Configure your plugin settings in just a few steps</p>
      </div>

      <ProgressSteps :steps="steps" :current-step="currentStep" />

      <div class="wizard__content">
        <CacheOptions v-if="currentStep === 1" v-model="formData.cache" />

        <MinifyOptions v-if="currentStep === 2" v-model="formData.minify" />

        <PluginInstaller v-if="currentStep === 3" v-model="formData.plugins" />

        <SetupSummary v-if="currentStep === 4" :form-data="formData" @go-to-dashboard="goToDashboard" />
      </div>

      <div class="wizard__navigation" v-if="currentStep < 4">
        <button @click="previousStep" :disabled="currentStep === 1" class="wizard__button wizard__button--secondary">
          ← Previous
        </button>
        <button @click="nextStep" :disabled="isLoading" class="wizard__button wizard__button--primary">
          <span v-if="isLoading">Saving...</span>
          <span v-else>{{ currentStep === 3 ? 'Finish Setup' : 'Next →' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ProgressSteps from './ProgressSteps.vue'
import CacheOptions from './CacheOptions.vue'
import MinifyOptions from './MinifyOptions.vue'
import PluginInstaller from './PluginInstaller.vue'
import SetupSummary from './SetupSummary.vue'

// Step management
const currentStep = ref(1)
const isLoading = ref(false)

const steps = [
  { title: 'Cache Options' },
  { title: 'Minify Options' },
  { title: 'Plugin Installer' },
  { title: 'Finish' }
]

// Form data
const formData = reactive({
  cache: {
    pageCache: true,
    objectCache: false,
    browserCache: true,
    gzipCompression: true,
    databaseCache: false
  },
  minify: {
    html: true,
    css: true,
    js: true,
    images: false,
    fonts: false
  },
  plugins: {
    'security-plugin': true,
    'seo-plugin': true,
    'backup-plugin': true
  }
})

// Mock API response helper
const createMockResponse = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(data)
      })
    }, 500) // Simulate network delay
  })
}

// Navigation methods
const nextStep = async () => {
  if (currentStep.value < steps.length) {
    isLoading.value = true
    await saveStepData()
    isLoading.value = false
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Data persistence with mock response
const saveStepData = async () => {
  try {
    const stepData = {
      step: currentStep.value,
      data: formData
    }
    
    // Mock response simulating successful PHP endpoint call
    const response = await createMockResponse({
      success: true,
      message: 'Step data saved successfully',
      step: currentStep.value,
      timestamp: new Date().toISOString()
    })
    
    if (!response.ok) {
      throw new Error('Failed to save step data')
    }
    
    console.log('Step data saved successfully')
  } catch (error) {
    console.error('Error saving step data:', error)
    // Handle error appropriately
  }
}

// Completion methods with mock response
const goToDashboard = async () => {
  try {
    // Mock response simulating successful PHP endpoint call
    const response = await createMockResponse({
      success: true,
      message: 'Plugin setup completed successfully',
      redirect_url: '/wp-admin/admin.php?page=your-plugin-dashboard',
      configuration: formData,
      timestamp: new Date().toISOString()
    })
    
    if (!response.ok) {
      throw new Error('Failed to complete setup')
    }
    
    // In a real WordPress environment, this would redirect to the actual dashboard
    // For demo purposes, we'll just show an alert
    alert('Setup completed successfully! In a real WordPress environment, you would be redirected to the plugin dashboard.')
    console.log('Setup completed with configuration:', formData)
    
  } catch (error) {
    console.error('Error completing setup:', error)
  }
}
</script>