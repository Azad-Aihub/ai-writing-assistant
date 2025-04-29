<template>
  <SettingsCard 
    title="提示词风格设置" 
    subtitle="定制文章的风格和语调"
    icon="🎨"
  >
    <div class="grid md:grid-cols-2 gap-x-6 gap-y-4">
      <div>
        <label class="label">基本信息/背景</label>
        <textarea 
          v-model="localPromptStyle.basicInfo"
          placeholder="添加您想要提供的背景或特殊要求..."
          rows="3"
          class="input"
          @input="updatePromptStyle('basicInfo', localPromptStyle.basicInfo)"
        ></textarea>
      </div>
      
      <div>
        <label class="label">语言风格</label>
        <select 
          v-model="localPromptStyle.languageStyle"
          class="select"
          @change="updatePromptStyle('languageStyle', localPromptStyle.languageStyle)"
        >
          <option>专业</option>
          <option>学术</option>
          <option>日常</option>
          <option>诗意</option>
          <option>幽默</option>
          <option>正式</option>
          <option>简洁</option>
          <option>浪漫</option>
          <option>科技</option>
        </select>
      </div>
      
      <div>
        <label class="label">文章结构</label>
        <select 
          v-model="localPromptStyle.structure"
          class="select"
          @change="updatePromptStyle('structure', localPromptStyle.structure)"
        >
          <option>论述型</option>
          <option>故事型</option>
          <option>问答型</option>
          <option>比较型</option>
          <option>列表型</option>
          <option>段落型</option>
        </select>
      </div>
      
      <div>
        <label class="label">叙述方式</label>
        <select 
          v-model="localPromptStyle.narrative"
          class="select"
          @change="updatePromptStyle('narrative', localPromptStyle.narrative)"
        >
          <option>第一人称</option>
          <option>第二人称</option>
          <option>第三人称</option>
        </select>
      </div>
      
      <div>
        <label class="label">情感基调</label>
        <select 
          v-model="localPromptStyle.emotion"
          class="select"
          @change="updatePromptStyle('emotion', localPromptStyle.emotion)"
        >
          <option>积极</option>
          <option>消极</option>
          <option>中性</option>
          <option>热情</option>
          <option>冷静</option>
          <option>温暖</option>
        </select>
      </div>
      
      <div>
        <label class="label">思维方式</label>
        <select 
          v-model="localPromptStyle.thinking"
          class="select"
          @change="updatePromptStyle('thinking', localPromptStyle.thinking)"
        >
          <option>逻辑性</option>
          <option>创造性</option>
          <option>批判性</option>
          <option>发散性</option>
          <option>辩证性</option>
        </select>
      </div>
      
      <div>
        <label class="label">独特性 (1-10)</label>
        <div class="flex items-center">
          <input 
            type="range"
            v-model.number="localPromptStyle.uniqueness"
            min="1"
            max="10"
            step="1"
            class="w-full accent-primary-500"
            @input="updatePromptStyle('uniqueness', localPromptStyle.uniqueness)"
          />
          <span class="ml-3 min-w-[2rem] text-center text-gray-700">{{ localPromptStyle.uniqueness }}</span>
        </div>
      </div>
      
      <div>
        <label class="label">文化背景</label>
        <select 
          v-model="localPromptStyle.cultural"
          class="select"
          @change="updatePromptStyle('cultural', localPromptStyle.cultural)"
        >
          <option>中国</option>
          <option>西方</option>
          <option>日本</option>
          <option>印度</option>
          <option>阿拉伯</option>
          <option>中立</option>
        </select>
      </div>
      
      <div>
        <label class="label">节奏感</label>
        <select 
          v-model="localPromptStyle.rhythm"
          class="select"
          @change="updatePromptStyle('rhythm', localPromptStyle.rhythm)"
        >
          <option>平稳</option>
          <option>快节奏</option>
          <option>变化型</option>
          <option>抑扬顿挫</option>
        </select>
      </div>
    </div>
    
    <div class="mt-4 text-center">
      <button 
        @click="resetToDefault" 
        class="btn-outline text-sm"
      >
        重置为默认设置
      </button>
    </div>
  </SettingsCard>
</template>

<script setup>
import { reactive, watch } from 'vue'
import SettingsCard from './SettingsCard.vue'

const defaultPromptStyle = {
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

const props = defineProps({
  promptStyle: {
    type: Object,
    default: () => ({ ...defaultPromptStyle })
  }
})

const emit = defineEmits(['update:promptStyle'])

const localPromptStyle = reactive({ ...props.promptStyle })

watch(() => props.promptStyle, (newVal) => {
  Object.assign(localPromptStyle, newVal)
}, { deep: true })

const updatePromptStyle = (key, value) => {
  localPromptStyle[key] = value
  emit('update:promptStyle', { ...localPromptStyle })
}

const resetToDefault = () => {
  Object.assign(localPromptStyle, defaultPromptStyle)
  emit('update:promptStyle', { ...localPromptStyle })
}
</script>