<template>
  <div class="text-center space-y-6">
    <div class="mb-8">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Setup Complete!</h2>
      <p class="text-gray-600">Your plugin has been configured successfully</p>
    </div>

    <div class="bg-gray-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Configuration Summary:</h3>
      <div class="space-y-3 text-sm">
        <div>
          <span class="font-medium text-gray-700">Cache Options:</span>
          <span class="ml-2 text-gray-600">{{ enabledCacheOptions }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-700">Minify Options:</span>
          <span class="ml-2 text-gray-600">{{ enabledMinifyOptions }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-700">Plugins to Install:</span>
          <span class="ml-2 text-gray-600">{{ selectedPlugins }}</span>
        </div>
      </div>
    </div>

    <button 
      @click="$emit('goToDashboard')"
      class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-wordpress-blue hover:bg-wordpress-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wordpress-blue transition-colors"
    >
      Go to Dashboard
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['goToDashboard'])

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
})

const cacheOptions = [
  { key: 'pageCache', label: 'Enable Page Cache' },
  { key: 'objectCache', label: 'Enable Object Cache' },
  { key: 'browserCache', label: 'Enable Browser Cache' },
  { key: 'gzipCompression', label: 'Enable Gzip Compression' },
  { key: 'databaseCache', label: 'Enable Database Cache' }
]

const minifyOptions = [
  { key: 'html', label: 'Minify HTML' },
  { key: 'css', label: 'Minify CSS' },
  { key: 'js', label: 'Minify JavaScript' },
  { key: 'images', label: 'Optimize Images' },
  { key: 'fonts', label: 'Optimize Fonts' }
]

const recommendedPlugins = [
  { slug: 'security-plugin', name: 'Security Pro' },
  { slug: 'seo-plugin', name: 'SEO Optimizer' },
  { slug: 'backup-plugin', name: 'Backup Master' }
]

const enabledCacheOptions = computed(() => {
  const enabled = Object.entries(props.formData.cache)
    .filter(([key, value]) => value)
    .map(([key]) => cacheOptions.find(opt => opt.key === key)?.label)
    .filter(Boolean)
  return enabled.length > 0 ? enabled.join(', ') : 'None selected'
})

const enabledMinifyOptions = computed(() => {
  const enabled = Object.entries(props.formData.minify)
    .filter(([key, value]) => value)
    .map(([key]) => minifyOptions.find(opt => opt.key === key)?.label)
    .filter(Boolean)
  return enabled.length > 0 ? enabled.join(', ') : 'None selected'
})

const selectedPlugins = computed(() => {
  const selected = Object.entries(props.formData.plugins)
    .filter(([key, value]) => value)
    .map(([key]) => recommendedPlugins.find(plugin => plugin.slug === key)?.name)
    .filter(Boolean)
  return selected.length > 0 ? selected.join(', ') : 'None selected'
})
</script> 