<template>
  <div class="card">
    <div class="p-4 bg-gradient-to-r from-primary-50 to-white border-b border-gray-200">
      <div class="flex items-center">
        <div class="w-8 h-8 rounded-lg bg-white text-center leading-8 shadow-sm mr-3 text-xl">
          {{ icon }}
        </div>
        <div>
          <h2 class="card-title">{{ title }}</h2>
          <p class="card-subtitle">{{ subtitle }}</p>
        </div>
      </div>
    </div>
    <div class="p-6">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '📄'
  }
})
</script>