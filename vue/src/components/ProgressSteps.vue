<template>
  <div class="progress">
    <div class="progress__steps">
      <div class="progress__track">
        <div v-for="(step, index) in steps" :key="index" class="progress__step">
          <div class="progress__circle" :class="{ 'progress__circle--current': currentStep === index + 1, 'progress__circle--completed': currentStep > index + 1, 'progress__circle--pending': currentStep < index + 1 }">
            <svg v-if="currentStep > index + 1" class="progress__check" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span v-else class="progress__number">{{ index + 1 }}</span>
          </div>
          <div v-if="index < steps.length - 1" class="progress__connector"></div>
        </div>
      </div>
    </div>
    <div class="progress__labels">
      <span v-for="(step, index) in steps" :key="index" class="progress__label" :class="{ 'progress__label--current': currentStep === index + 1 }">
        {{ step.title }}
      </span>
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