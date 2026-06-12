<template>
  <header class="flex flex-col gap-4 border-b border-slate-100 bg-white px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-3">
        <button
  @click="$emit('open-sidebar')"
  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-900 lg:hidden"
>
  <i class="pi pi-list text-base"></i>
</button>
<div class="flex items-center gap-3">
  <i :class="['pi', pageIcon]" class="text-xl"></i>
        <div>
          <h1 class="text-lg font-semibold text-slate-900">
            {{ pageTitle }}
          </h1>
          <p class="text-sm text-slate-500">
            {{ pageSubtitle }}
          </p>
        </div>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-3 justify-between lg:justify-end">
      <div class="hidden items-center gap-2 rounded-xl border border-slate-100 px-3 py-2 sm:flex">
       <img src="https://png.pngtree.com/png-vector/20190326/ourmid/pngtree-vector-clock-icon-png-image_865317.jpg" alt="User Avatar" class="h-5 w-5 rounded-full object-cover" />
        <span class="font-mono text-xs font-medium text-slate-500">
          {{ currentTime }}
        </span>
      </div>
     <button
  class="flex items-center gap-2 rounded-xl border border-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
>
  <i
    class="pi pi-sync text-xs"
    :class="{ 'animate-spin': isRefreshing }"
  ></i>

  <span class="hidden sm:inline">Refresh Data</span>
</button>
      <Button
        icon="pi pi-bell"
        text
         class="!h-10 !w-10 !rounded-xl !border !border-slate-100 !text-slate-500 hover:!bg-slate-50 hover:!text-slate-900 transition-all"
/>
       <button
  class="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-slate-50 hover:text-slate-900 transition-colors"
>
  <span class="hidden sm:inline">CMS Preview </span>
  <i
    class="pi pi-external-link !text-[8px]"
  ></i>
</button>
    </div>
  </header>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import Button from 'primevue/button';
const props = defineProps({
  activeTab:   { type: String, required: true },
})
defineEmits(['open-sidebar', 'change-tab'])
const currentTime  = ref('')
let   timer        = null
const titlesMap = {
  overview:  {
    title:    'Command Center',
    subtitle: 'Administrative telemetry, visitor metrics and actionable CRM highlights.',
  },
  content: {
    title:    'Website Content Manager',
    subtitle: 'Update dynamic copy, services, and team information on the frontend instantly.',
  },
  leads: {
    title:    'CRM Lead Pipeline',
    subtitle: 'Automated conversion capture and qualified client profiles.',
  },
  inquiries: {
    title:    'Mail Inquiry Center',
    subtitle: 'Direct contact form requests with intelligent assistant actions.',
  },
  staff: {
    title:    'Employee Access & Privileges',
    subtitle: 'Configure client employee credentials, operational logs, and hierarchy permissions.',
  },
  logs: {
    title:    'Security Logs & Audit Trail',
    subtitle: 'Continuous record tracking of modifications per employee account.',
  }
}
const pageTitle    = computed(() => titlesMap[props.activeTab]?.title    ?? 'Admin Console')
const pageSubtitle = computed(() => titlesMap[props.activeTab]?.subtitle ?? 'Standard informative agency panel system.')
function updateTime() {
  currentTime.value = new Date().toLocaleTimeString()
}
onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>