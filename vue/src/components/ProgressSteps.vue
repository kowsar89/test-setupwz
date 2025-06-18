<template>
  <div class="mb-8">
    <div class="flex items-center justify-center">
      <div class="flex items-center space-x-4">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="flex items-center"
        >
          <div 
            class="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200"
            :class="[
              currentStep === index + 1 
                ? 'bg-wordpress-blue border-wordpress-blue text-white' 
                : currentStep > index + 1 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'bg-white border-gray-300 text-gray-400'
            ]"
          >
            <svg v-if="currentStep > index + 1" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span v-else class="text-sm font-medium">{{ index + 1 }}</span>
          </div>
          <div v-if="index < steps.length - 1" class="w-20 h-0.5 bg-gray-300"></div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-4">
      <div class="flex space-x-8">
        <span 
          v-for="(step, index) in steps" 
          :key="index"
          class="text-sm font-medium transition-colors duration-200"
          :class="currentStep === index + 1 ? 'text-wordpress-blue' : 'text-gray-500'"
        >
          {{ step.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    required: true
  },
  currentStep: {
    type: Number,
    required: true
  }
})
</script> 