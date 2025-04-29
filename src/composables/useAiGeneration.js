import { ref } from 'vue'
import { generateAiContent } from '../utils/api'

export function useAiGeneration() {
  const result = ref('')
  const isGenerating = ref(false)
  const error = ref(null)
  
  const generateContent = async (settings) => {
    if (!settings.topic) {
      error.value = '请至少输入一个主题'
      return { success: false, error: error.value }
    }
    
    isGenerating.value = true
    error.value = null
    
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
      return { success: true, result: response }
    } catch (err) {
      console.error('生成内容失败:', err)
      error.value = err.message || '生成内容时出错，请检查您的 API 设置并重试。'
      return { success: false, error: error.value }
    } finally {
      isGenerating.value = false
    }
  }
  
  const clearResult = () => {
    result.value = ''
    error.value = null
  }
  
  return {
 result,
    isGenerating,
    error,
    generateContent,
    clearResult
  }
}
