<template>
  <div class="plugins">
    <div class="plugins__header">
      <h2 class="plugins__title">Recommended Plugins</h2>
      <p class="plugins__description">Install these recommended plugins to enhance your website</p>
    </div>
    <div class="plugins__list">
      <div 
        v-for="plugin in recommendedPlugins" 
        :key="plugin.slug"
        class="plugin-card"
      >
        <input 
          type="checkbox" 
          :checked="modelValue[plugin.slug]"
          @change="updateValue(plugin.slug, $event.target.checked)"
          class="plugin-card__checkbox"
        >
        <div class="plugin-card__content">
          <div class="plugin-card__header">
            <h3 class="plugin-card__name">{{ plugin.name }}</h3>
            <span class="plugin-card__badge">Recommended</span>
          </div>
          <p class="plugin-card__description">{{ plugin.description }}</p>
          <div class="plugin-card__stats">
            <span class="plugin-card__rating">⭐ {{ plugin.rating }}/5</span>
            <span class="plugin-card__downloads">{{ plugin.downloads }} downloads</span>
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