<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    
    <main class="flex-grow container mx-auto px-4 py-8">
      <div class="max-w-5xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-2 gradient-text">AI 写作助手</h1>
        <p class="text-xl text-gray-600 mb-10">
          设置 AI 参数，创建独特且专业的文章
        </p>
        
        <div class="grid md:grid-cols-2 gap-8 mb-10">
          <ApiSettings 
            v-model:apiType="settings.apiType" 
            v-model:customEndpoint="settings.customEndpoint"
            v-model:apiKey="settings.apiKey" 
          />
          
          <ContentSettings 
            v-model:topic="settings.topic"
            v-model:keywords="settings.keywords"
            v-model:wordCount="settings.wordCount"
          />
        </div>
        
        <PromptStyleSettings 
          v-model:promptStyle="settings.promptStyle" 
          class="mb-10"
        />
        
        <div class="flex justify-center mb-10">
          <button 
            @click="generateContent" 
            :disabled="isGenerating"
            class="btn-primary text-lg py-3 px-10 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            :class="{ 'opacity-70 cursor-not-allowed': isGenerating }"
          >
            <span v-if="isGenerating" class="flex items-center">
              <LoadingIndicator class="mr-2" />
              正在创作中...
            </span>
            <span v-else>开始创作</span>
          </button>
        </div>
        
        <ResultPanel 
          :result="result"
          :isLoading="isGenerating"
        />
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ApiSettings from './components/ApiSettings.vue'
import ContentSettings from './components/ContentSettings.vue'
import PromptStyleSettings from './components/PromptStyleSettings.vue'
import ResultPanel from './components/ResultPanel.vue'
import LoadingIndicator from './components/LoadingIndicator.vue'
import { generateAiContent } from './utils/api'

const settings = reactive({
  apiType: 'ollama',
  customEndpoint: '',
  apiKey: '',
  topic: '',
  keywords: '',
  wordCount: 800,
  promptStyle: {
    basicInfo: '',
    languageStyle: '专业',
    structure: '论述型',
    narrative: '第三人称',
    emotion: '中性',
    thinking: '逻辑性',
    uniqueness: 5,
    cultural: '中立',
    rhythm: '平稳'
  }
})

const isGenerating = ref(false)
const result = ref('')

const generateContent = async () => {
  if (!settings.topic) {
    alert('请至少输入一个主题')
    return
  }
  
  isGenerating.value = true
  
  try {
    // 构建提示词
    const keywordsText = settings.keywords ? `关键词：${settings.keywords}` : ''
    const prompt = `
      请以"${settings.topic}"为主题写一篇文章。
      ${keywordsText}
      字数要求：大约${settings.wordCount}字。
      
      风格要求：
      - 语言风格：${settings.promptStyle.languageStyle}
      - 文章结构：${settings.promptStyle.structure}
      - 叙述方式：${settings.promptStyle.narrative}
      - 情感基调：${settings.promptStyle.emotion}
      - 思维方式：${settings.promptStyle.thinking}
      - 独特性：${settings.promptStyle.uniqueness}/10
      - 文化背景：${settings.promptStyle.cultural}
      - 节奏感：${settings.promptStyle.rhythm}
      
      补充信息：${settings.promptStyle.basicInfo || '无'}
    `
    
    // 调用 API
    const response = await generateAiContent({
      apiType: settings.apiType,
      customEndpoint: settings.customEndpoint,
      apiKey: settings.apiKey,
      prompt
    })
    
    result.value = response
  } catch (error) {
    console.error('生成内容失败:', error)
    result.value = '生成内容时出错，请检查您的 API 设置并重试。'
  } finally {
    isGenerating.value = false
  }
}
</script>