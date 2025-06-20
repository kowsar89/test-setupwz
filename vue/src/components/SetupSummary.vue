<template>
  <div class="summary">
    <div class="summary__success">
      <div class="summary__icon">
        <svg class="summary__checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 class="summary__title">Setup Complete!</h2>
      <p class="summary__message">Your plugin has been configured successfully</p>
    </div>

    <div class="summary__config">
      <h3 class="summary__config-title">Configuration Summary:</h3>
      <div class="summary__config-list">
        <div class="summary__config-item">
          <span class="summary__config-label">Cache Options:</span>
          <span class="summary__config-value">{{ enabledCacheOptions }}</span>
        </div>
        <div class="summary__config-item">
          <span class="summary__config-label">Minify Options:</span>
          <span class="summary__config-value">{{ enabledMinifyOptions }}</span>
        </div>
        <div class="summary__config-item">
          <span class="summary__config-label">Plugins to Install:</span>
          <span class="summary__config-value">{{ selectedPlugins }}</span>
        </div>
      </div>
    </div>

    <button @click="$emit('goToDashboard')" class="summary__button">
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