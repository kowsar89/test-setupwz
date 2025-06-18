<template>
  <div class="space-y-6">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Minify Options</h2>
      <p class="text-gray-600">Optimize your website by minifying various file types</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label 
        v-for="option in minifyOptions" 
        :key="option.key"
        class="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <input 
          type="checkbox" 
          :checked="modelValue[option.key]"
          @change="updateValue(option.key, $event.target.checked)"
          class="mt-1 h-4 w-4 text-wordpress-blue focus:ring-wordpress-blue border-gray-300 rounded"
        >
        <div class="flex-1">
          <div class="text-sm font-medium text-gray-900">{{ option.label }}</div>
          <div class="text-sm text-gray-500">{{ option.description }}</div>
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