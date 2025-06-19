<template>
  <div class="options">
    <div class="options__header">
      <h2 class="options__title">Minify Options</h2>
      <p class="options__description">Optimize your website by minifying various file types</p>
    </div>
    <div class="options__grid">
      <label 
        v-for="option in minifyOptions" 
        :key="option.key"
        class="option-card"
      >
        <input 
          type="checkbox" 
          :checked="modelValue[option.key]"
          @change="updateValue(option.key, $event.target.checked)"
          class="option-card__checkbox"
        >
        <div class="option-card__content">
          <div class="option-card__label">{{ option.label }}</div>
          <div class="option-card__description">{{ option.description }}</div>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const minifyOptions = [
  {
    key: 'html',
    label: 'Minify HTML',
    description: 'Remove unnecessary whitespace from HTML'
  },
  {
    key: 'css',
    label: 'Minify CSS',
    description: 'Compress CSS files for faster loading'
  },
  {
    key: 'js',
    label: 'Minify JavaScript',
    description: 'Compress JavaScript files'
  },
  {
    key: 'images',
    label: 'Optimize Images',
    description: 'Automatically optimize image files'
  },
  {
    key: 'fonts',
    label: 'Optimize Fonts',
    description: 'Compress and optimize web fonts'
  }
]

const updateValue = (key, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}
</script> 