<template>
  <div class="min-h-screen bg-[#F0F2F5] p-3 sm:p-5 font-sans relative">

    <div class="bg-white border border-slate-200 rounded-xl px-4 sm:px-5 py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
      <div class="w-full lg:w-auto">
        <h1 class="text-base tracking-tight font-medium text-slate-700" style="font-family: 'Inter', sans-serif">Security Access Logs</h1>
        <p class="text-xs text-slate-400 mt-0.5">Continuous telemetry tracking of employee content changes and system logins.</p>
      </div>
      
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto flex-shrink-0">
        
        <div class="relative flex items-center w-full sm:w-auto">
          <i class="pi pi-search absolute left-2.5 text-slate-400 text-xs pointer-events-none"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search audit trail…"
            class="border border-slate-200 rounded-lg pl-7 pr-3 py-1.5 text-xs text-slate-700 bg-white outline-none w-full sm:w-48 focus:border-slate-400 placeholder-slate-300 transition-colors"
          />
        </div>

        <select
          v-model="selectedCategory"
          class="border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 bg-white outline-none cursor-pointer focus:border-slate-400 transition-colors w-full sm:w-auto"
        >
          <option value="all">Categories: All</option>
          <option value="AUTH">Auth</option>
          <option value="CONTENT">Content</option>
          <option value="LEADS">Leads</option>
          <option value="STAFF">Staff</option>
          <option value="INQUIRIES">Inquiries</option>
          <option value="BLOCKED">Blocked</option>
        </select>

        <button
          @click="clearLogs"
          class="flex items-center justify-center sm:justify-start gap-1.5 border border-red-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 bg-white hover:bg-red-50 transition-colors whitespace-nowrap w-full sm:w-auto"
        >
          <i class="pi pi-trash text-xs"></i>
          Clear Logs
        </button>

      </div>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">

      <div v-if="filteredLogs.length === 0" class="py-12 text-center text-xs text-slate-400">
        No log entries match your search.
      </div>

      <div
        v-for="(log, index) in filteredLogs"
        :key="log.id"
        class="flex items-start gap-3 px-4 sm:px-5 py-4 hover:bg-slate-50 transition-colors cursor-default"
        :class="index !== filteredLogs.length - 1 ? 'border-b border-slate-50' : ''"
      >

        <div class="w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5">
          <i :class="`pi ${log.icon} text-slate-500`" style="font-size:14px;"></i>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-start justify-between w-full gap-2 sm:gap-4 min-w-0">
          
          <div class="flex-1 min-w-0">
            <div class="text-xs text-slate-700 leading-relaxed break-words">
              <span class="font-bold text-slate-900">{{ log.name }}</span>
              <span class="text-slate-400 ml-1">({{ log.email }})</span>
              <span class="text-slate-300 mx-1 hidden sm:inline-block">·</span>
              <span class="font-bold text-slate-900 block sm:inline-block mt-0.5 sm:mt-0">{{ log.action }}</span>
            </div>
            <div class="text-xs text-slate-400 mt-0.5 leading-relaxed break-words">{{ log.desc }}</div>
          </div>

          <div class="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1.5 flex-shrink-0 mt-1 sm:mt-0">
            <span
              class="text-xs font-bold tracking-wide px-2 py-0.5 rounded-full border"
              :class="log.badgeClass"
            >{{ log.tag }}</span>
            <span class="flex items-center gap-1 text-xs text-slate-400">
              <i class="pi pi-clock" style="font-size:11px;"></i>
              {{ log.time }}
            </span>
          </div>

        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="toast.show"
        class="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white z-50 w-[calc(100%-2rem)] sm:w-auto shadow-lg"
        :class="toast.bgClass"
      >
        <i :class="`pi ${toast.icon}`" style="font-size:13px;"></i>
        {{ toast.message }}
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const toast = reactive({ show: false, message: '', bgClass: 'bg-slate-800', icon: 'pi-check-circle' })

function showToast(message, bgClass = 'bg-slate-800', icon = 'pi-check-circle') {
  toast.message = message
  toast.bgClass = bgClass
  toast.icon = icon
  toast.show = true
  setTimeout(() => { toast.show = false }, 2800)
}

const searchQuery = ref('')
const selectedCategory = ref('all')

const logs = ref([
  {
    id: 1,
    icon: 'pi-lock',
    tag: 'AUTH',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    name: 'Mayank Sharma',
    email: 'mayank@agency.com',
    action: 'Publisher Setup',
    desc: 'Logged into the administrative workspace successfully',
    time: '14:42:08',
  },
  {
    id: 2,
    icon: 'pi-file',
    tag: 'CONTENT',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
    name: 'Jane Cooper',
    email: 'jane@agency.com',
    action: 'Updated Home Content',
    desc: 'Modified primary Hero subtitle is now focused on enterprise growth metrics.',
    time: '13:00:00',
  },
  {
    id: 3,
    icon: 'pi-database',
    tag: 'LEADS',
    badgeClass: 'bg-green-50 text-green-700 border-green-200',
    name: 'Sarah Chen',
    email: 'sarah.c@company.com',
    action: 'Replied to Lead',
    desc: 'Updated pipeline status for Samantha Wu (Fintech Landing Page) to "Won"',
    time: '21:50:00',
  },
  {
    id: 4,
    icon: 'pi-user-plus',
    tag: 'STAFF',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    name: 'Jane Cooper',
    email: 'jane@agency.com',
    action: 'Created Staff Profile',
    desc: 'Provisioned employee access credentials for Sarah Chen (Editor)',
    time: '16:10:00',
  },
  {
    id: 5,
    icon: 'pi-envelope',
    tag: 'INQUIRIES',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    name: 'Sarah Chen',
    email: 'sarah.c@company.com',
    action: 'Responded to Inquiry',
    desc: 'Drafted and sent service description regarding E-commerce Integration inquiry',
    time: '19:40:00',
  },
  {
    id: 6,
    icon: 'pi-ban',
    tag: 'BLOCKED',
    badgeClass: 'bg-red-50 text-red-700 border-red-200',
    name: 'System',
    email: 'security@system',
    action: 'IP Blocked',
    desc: '103.27.188.44 — repeated brute force attempts detected and blocked',
    time: '18:26:00',
  },
])

const filteredLogs = computed(() => {
  const q = searchQuery.value.toLowerCase()
  const cat = selectedCategory.value
  return logs.value.filter(log => {
    const matchCat = cat === 'all' || log.tag === cat
    const matchQ = !q || [log.name, log.email, log.action, log.desc].join(' ').toLowerCase().includes(q)
    return matchCat && matchQ
  })
})

function clearLogs() {
  logs.value = []
  showToast('Activity log cleared.', 'bg-slate-800', 'pi-check-circle')
}
</script>