<template>
  <div class="space-y-6">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Cache Options</h2>
      <p class="text-gray-600">Choose which caching features to enable for better performance</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label 
        v-for="option in cacheOptions" 
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

const cacheOptions = [
  {
    key: 'pageCache',
    label: 'Enable Page Cache',
    description: 'Cache entire pages to improve loading speed'
  },
  {
    key: 'objectCache',
    label: 'Enable Object Cache',
    description: 'Cache database queries and objects'
  },
  {
    key: 'browserCache',
    label: 'Enable Browser Cache',
    description: 'Tell browsers to cache static files locally'
  },
  {
    key: 'gzipCompression',
    label: 'Enable Gzip Compression',
    description: 'Compress files to reduce bandwidth usage'
  },
  {
    key: 'databaseCache',
    label: 'Enable Database Cache',
    description: 'Cache frequent database queries'
  }
]

const updateValue = (key, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}
</script> 