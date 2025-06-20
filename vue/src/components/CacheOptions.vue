<template>
  <div class="options">
    <div class="options__header">
      <h2 class="options__title">Cache Options</h2>
      <p class="options__description">Choose which caching features to enable for better performance</p>
    </div>
    <div class="options__grid">
      <label v-for="option in cacheOptions" :key="option.key" class="option-card">
        <input type="checkbox" :checked="modelValue[option.key]" @change="updateValue(option.key, $event.target.checked)" class="option-card__checkbox">
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