<template>
  <div class="space-y-6">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Recommended Plugins</h2>
      <p class="text-gray-600">Install these recommended plugins to enhance your website</p>
    </div>
    <div class="space-y-4">
      <div 
        v-for="plugin in recommendedPlugins" 
        :key="plugin.slug"
        class="flex items-start space-x-4 p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <input 
          type="checkbox" 
          :checked="modelValue[plugin.slug]"
          @change="updateValue(plugin.slug, $event.target.checked)"
          class="mt-1 h-4 w-4 text-wordpress-blue focus:ring-wordpress-blue border-gray-300 rounded"
        >
        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-2">
            <h3 class="text-lg font-medium text-gray-900">{{ plugin.name }}</h3>
            <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Recommended</span>
          </div>
          <p class="text-gray-600 mb-3">{{ plugin.description }}</p>
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <span>⭐ {{ plugin.rating }}/5</span>
            <span>{{ plugin.downloads }} downloads</span>
          </div>
        </div>
      </div>
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

const recommendedPlugins = [
  {
    slug: 'security-plugin',
    name: 'Security Pro',
    description: 'Comprehensive security solution to protect your website from threats, malware, and brute force attacks.',
    rating: 4.8,
    downloads: '1M+'
  },
  {
    slug: 'seo-plugin',
    name: 'SEO Optimizer',
    description: 'Complete SEO toolkit to improve your search engine rankings and drive more organic traffic.',
    rating: 4.9,
    downloads: '2M+'
  },
  {
    slug: 'backup-plugin',
    name: 'Backup Master',
    description: 'Automated backup solution to keep your website data safe with scheduled backups and easy restoration.',
    rating: 4.7,
    downloads: '800K+'
  }
]

const updateValue = (key, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}
</script> 