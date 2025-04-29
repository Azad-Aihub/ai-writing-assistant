<template>
  <SettingsCard 
    title="内容设置" 
    subtitle="设置文章的主题和内容要求"
    icon="📝"
  >
    <div class="space-y-4">
      <div>
        <label class="label">文章主题</label>
        <input 
          type="text" 
          v-model="localTopic"
          placeholder="例如：人工智能在医疗领域的应用"
          class="input"
          @input="emit('update:topic', localTopic)"
        />
      </div>
      
      <div>
        <label class="label">关键词（用、分隔）</label>
        <input 
          type="text" 
          v-model="localKeywords"
          placeholder="例如：AI诊断、医疗影像、智能医疗设备"
          class="input"
          @input="emit('update:keywords', localKeywords)"
        />
      </div>
      
      <div>
        <label class="label">字数要求</label>
        <div class="flex items-center">
          <input 
            type="range"
            v-model.number="localWordCount"
            min="300"
            max="3000"
            step="100"
            class="w-full accent-primary-500"
            @input="emit('update:wordCount', localWordCount)"
          />
          <span class="ml-3 min-w-[4rem] text-center text-gray-700">{{ localWordCount }}字</span>
        </div>
      </div>
    </div>
  </SettingsCard>
</template>

<script setup>
import { ref, watch } from 'vue'
import SettingsCard from './SettingsCard.vue'

const props = defineProps({
  topic: {
    type: String,
    default: '',
  },
  keywords: {
    type: String,
    default: '',
  },
  wordCount: {
    type: Number,
    default: 800,
  }
})

const emit = defineEmits(['update:topic', 'update:keywords', 'update:wordCount'])

const localTopic = ref(props.topic)
const localKeywords = ref(props.keywords)
const localWordCount = ref(props.wordCount)

watch(() => props.topic, (newVal) => {
  localTopic.value = newVal
})

watch(() => props.keywords, (newVal) => {
  localKeywords.value = newVal
})

watch(() => props.wordCount, (newVal) => {
  localWordCount.value = newVal
})
</script>