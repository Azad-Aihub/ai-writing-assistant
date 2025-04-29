<template>
  <div class="card">
    <div class="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
      <h2 class="font-bold text-lg text-gray-800">生成结果</h2>
      
      <div class="flex space-x-2">
        <button v-if="result" @click="copyToClipboard" class="btn-outline text-sm py-1 px-3">
          {{ copied ? '已复制' : '复制文本' }}
        </button>
        <button v-if="result" @click="downloadResult" class="btn-outline text-sm py-1 px-3">
          下载文章
        </button>
      </div>
    </div>
    
    <div 
      class="p-6 min-h-[300px] max-h-[600px] overflow-y-auto"
      :class="{'flex items-center justify-center': !result && !isLoading}"
    >
      <div v-if="isLoading" class="flex flex-col items-center justify-center h-[300px] text-gray-500">
        <div class="relative w-16 h-16 mb-4">
          <div class="absolute inset-0 border-4 border-t-primary-500 border-r-primary-400 border-b-primary-300 border-l-primary-200 rounded-full animate-spin"></div>
          <div class="absolute inset-3 border-3 border-t-accent-500 border-r-accent-400 border-b-accent-300 border-l-accent-200 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <p class="text-lg">正在创作中，精彩内容即将呈现...</p>
      </div>
      
      <div v-else-if="result" class="prose prose-gray max-w-none">
        <div v-html="formattedResult"></div>
      </div>
      
      <div v-else class="text-gray-400 text-center p-10">
        <svg class="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
        <p class="text-lg">点击"开始创作"按钮生成您的文章</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  result: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const copied = ref(false)

const formattedResult = computed(() => {
  if (!props.result) return ''
  
  // 将文本中的换行符替换为 HTML 段落
  return props.result
    .split('\n\n')
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('')
})

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.result)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制到剪贴板失败:', err)
  }
}

const downloadResult = () => {
  const blob = new Blob([props.result], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `AI写作_${new Date().toLocaleString().replace(/[\/\s:,]/g, '_')}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.prose {
  line-height: 1.8;
}

.prose p {
  margin-bottom: 1rem;
}

.animation-delay-150 {
  animation-delay: 150ms;
}
</style>