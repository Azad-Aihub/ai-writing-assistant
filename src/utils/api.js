import axios from 'axios'

export const generateAiContent = async ({ 
  apiType, 
  customEndpoint, 
  apiKey, 
  prompt 
}) => {
  switch (apiType) {
    case 'ollama':
      return await generateWithOllama(prompt)
      
    case 'deepseek':
      return await generateWithDeepSeek(apiKey, prompt)
      
    case 'custom':
      return await generateWithCustomEndpoint(customEndpoint, apiKey, prompt)
      
    default:
      throw new Error('不支持的 API 类型')
  }
}

async function generateWithOllama(prompt) {
  try {
    // 假设 Ollama 在本地运行 (localhost:11434)
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama2',
      prompt,
      stream: false
    })
    
    return response.data.response
  } catch (error) {
    console.error('Ollama API 调用失败:', error)
    throw new Error('Ollama API 调用失败，请确保 Ollama 服务正在运行')
  }
}

async function generateWithDeepSeek(apiKey, prompt) {
  try {
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: 'deepseek-chat',
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    })
    
    return response.data.choices[0].message.content
  } catch (error) {
    console.error('DeepSeek API 调用失败:', error)
    throw new Error('DeepSeek API 调用失败，请检查您的 API 密钥')
  }
}

async function generateWithCustomEndpoint(endpoint, apiKey, prompt) {
  try {
    const response = await axios.post(endpoint, {
      model: 'default-model', // 可能需要根据实际接口调整
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    })
    
    // 注意: 可能需要根据实际的 API 响应结构调整
    if (response.data.choices && response.data.choices[0].message) {
      return response.data.choices[0].message.content
    } else if (response.data.response) {
      return response.data.response
    } else {
      return JSON.stringify(response.data)
    }
  } catch (error) {
    console.error('自定义端点调用失败:', error)
    throw new Error('自定义端点调用失败，请检查您的端点 URL 和 API 密钥')
  }
}
