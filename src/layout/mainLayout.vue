<template>
  <div
    class="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans leading-normal text-slate-600 antialiased"
  >
    <AppSidebar
      v-model:activeTab="activeTab"
      v-model:isOpen="sidebarOpen"
      :currentUser="sessionUser"
      :leadCount="newLeadsCount"
      :unreadInquiryCount="unreadInquiriesCount"
      @logout="handleLogout"
    />

    <div class="flex flex-1 flex-col overflow-hidden">
      <AppHeader
        :activeTab="activeTab"
        :leads="leads"
        :inquiries="inquiries"
        @open-sidebar="sidebarOpen = true"
        @change-tab="activeTab = $event"
      />

      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'

const sessionUser = ref(null)
const activeTab = ref('overview')
const sidebarOpen = ref(false)

const users = ref([])
const leads = ref([])
const inquiries = ref([])
const activities = ref([])

const newLeadsCount = computed(() =>
  leads.value.filter(l => l.status === 'new').length
)

const unreadInquiriesCount = computed(() =>
  inquiries.value.filter(i => i.status === 'unread').length
)

function handleLogout() {
  // your logout logic
}

onMounted(() => {
  // your existing mounted logic
})
</script>