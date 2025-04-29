<template>
  <SettingsCard 
    title="AI 写作设置" 
    subtitle="选择合适的 AI 模型用于生成内容"
    icon="⚙️"
  >
    <div class="space-y-4">
      <div>
        <label class="label">AI 模型类型</label>
        <select 
          v-model="localApiType"
          class="select"
          @change="emit('update:apiType', localApiType)"
        >
          <option value="ollama">Ollama (本地)</option>
          <option value="deepseek">DeepSeek</option>
          <option value="custom">自定义接口</option>
        </select>
      </div>
      
      <div v-if="localApiType === 'custom'">
        <label class="label">自定义端点 URL</label>
        <input 
          type="url" 
          v-model="localCustomEndpoint"
          placeholder="https://your-api-endpoint.com/v1/chat/completions"
          class="input"
          @input="emit('update:customEndpoint', localCustomEndpoint)"
        />
      </div>
      
      <div v-if="localApiType !== 'ollama'">
        <label class="label">API 密钥</label>
        <div class="relative">
          <input 
            :type="showApiKey ? 'text' : 'password'"
            v-model="localApiKey"
            placeholder="sk-..."
            class="input pr-10"
            @input="emit('update:apiKey', localApiKey)"
          />
          <button 
            @click="showApiKey = !showApiKey" 
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <span v-if="showApiKey">👁️‍🗨️</span>
            <span v-else>👁️</span>
          </button>
        </div>
      </div>
      
      <div class="flex items-center text-xs text-gray-500 mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
        </svg>
        您的 API 密钥仅在本地使用，不会被存储或传输到其他地方
      </div>
    </div>
  </SettingsCard>
</template>

<script setup>
import { ref, watch } from 'vue'
import SettingsCard from './SettingsCard.vue'

const props = defineProps({
  apiType: {
    type: String,
    default: 'ollama',
  },
  customEndpoint: {
    type: String,
    default: '',
  },
  apiKey: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['update:apiType', 'update:customEndpoint', 'update:apiKey'])

const localApiType = ref(props.apiType)
const localCustomEndpoint = ref(props.customEndpoint)
const localApiKey = ref(props.apiKey)
const showApiKey = ref(false)

watch(() => props.apiType, (newVal) => {
  localApiType.value = newVal
})

watch(() => props.customEndpoint, (newVal) => {
  localCustomEndpoint.value = newVal
})

watch(() => props.apiKey, (newVal) => {
  localApiKey.value = newVal
})
</script>
