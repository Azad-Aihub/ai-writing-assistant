<template>
  <footer class="bg-gray-50 border-t border-gray-200 py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <div class="text-2xl font-bold gradient-text mb-2">AiWriter</div>
          <p class="text-gray-600">智能写作，灵感无限</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          <div>
            <h3 class="font-semibold mb-2">产品</h3>
            <ul class="space-y-1 text-gray-600">
              <li><a href="#" class="hover:text-primary-600 transition-colors">功能介绍</a></li>
              <li><a href="#" class="hover:text-primary-600 transition-colors">使用教程</a></li>
              <li><a href="#" class="hover:text-primary-600 transition-colors">更新日志</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-semibold mb-2">资源</h3>
            <ul class="space-y-1 text-gray-600">
              <li><a href="#" class="hover:text-primary-600 transition-colors">写作技巧</a></li>
              <li><a href="#" class="hover:text-primary-600 transition-colors">常见问题</a></li>
              <li><a href="#" class="hover:text-primary-600 transition-colors">API 文档</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-semibold mb-2">联系我们</h3>
            <ul class="space-y-1 text-gray-600">
              <li><a href="#" class="hover:text-primary-600 transition-colors">反馈建议</a></li>
              <li><a href="#" class="hover:text-primary-600 transition-colors">合作机会</a></li>
              <li><a href="#" class="hover:text-primary-600 transition-colors">关于我们</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>© {{ new Date().getFullYear() }} AiWriter. 保留所有权利。</p>
      </div>
    </div>
  </footer>
</template>