<template>
  <div class="min-h-screen bg-[#f4f5f7] p-3 sm:p-4 md:p-6 lg:p-8 font-sans">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
      <div>
        <h2 class="text-sm sm:text-base tracking-tight font-medium text-slate-700" style="font-family: 'Inter', sans-serif">Mail Inquiries</h2>
        <p class="text-xs sm:text-sm text-gray-400 mt-0.5">Direct questions submitted by prospective clients</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <div class="relative">
          <button
            @click="filterMenuOpen = !filterMenuOpen"
            class="flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:scale-95 shadow-sm">
            <span>{{ activeFilter === 'all' ? 'All Mail' : activeFilter === 'unread' ? 'Unread' : 'Read' }}</span>
            <i class="pi pi-chevron-down text-[10px] text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': filterMenuOpen }"></i>
          </button>
          <div
            v-if="filterMenuOpen"
            class="absolute right-0 top-[calc(100%+6px)] bg-white border border-gray-100 rounded-xl shadow-lg z-50 w-36 overflow-hidden">
            <div
              v-for="opt in filterOptions"
              :key="opt.value"
              @click="selectFilter(opt)"
              class="px-4 py-2.5 text-xs text-gray-600 hover:bg-[#4A6FA5]/5 hover:text-[#4A6FA5] cursor-pointer transition-all duration-150 flex items-center gap-2">
              <i :class="opt.icon" class="text-[10px]" />
              {{ opt.label }}
            </div>
          </div>
        </div>
        <button
          class="flex items-center gap-2 rounded-xl bg-[#4A6FA5] px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold text-white hover:bg-[#112740] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95 shadow-sm shadow-[#1a3a5c]/20">
          <span>Compose</span>
          <i class="pi pi-pencil text-[10px]"></i>
        </button>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 border border-gray-100 flex items-center gap-2 sm:gap-3">
        <div class="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#4A6FA5]/10 flex items-center justify-center flex-shrink-0">
          <i class="pi pi-envelope text-[#4A6FA5] text-xs sm:text-sm" />
        </div>
        <div>
          <p class="text-base sm:text-lg font-bold text-[#1a2332]">{{ mails.length }}</p>
          <p class="text-[10px] sm:text-xs text-gray-400">Total</p>
        </div>
      </div>
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 border border-gray-100 flex items-center gap-2 sm:gap-3">
        <div class="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
          <i class="pi pi-envelope text-amber-500 text-xs sm:text-sm" />
        </div>
        <div>
          <p class="text-base sm:text-lg font-bold text-[#1a2332]">{{ unreadCount }}</p>
          <p class="text-[10px] sm:text-xs text-gray-400">Unread</p>
        </div>
      </div>
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 border border-gray-100 flex items-center gap-2 sm:gap-3">
        <div class="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
          <i class="pi pi-check-circle text-emerald-500 text-xs sm:text-sm" />
        </div>
        <div>
          <p class="text-base sm:text-lg font-bold text-[#1a2332]">{{ readCount }}</p>
          <p class="text-[10px] sm:text-xs text-gray-400">Read</p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <div class="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex items-center gap-3">
        <i class="pi pi-search text-gray-300 text-sm flex-shrink-0" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name, subject or email…"
          class="flex-1 text-xs sm:text-sm text-gray-600 placeholder-gray-300 bg-transparent outline-none min-w-0"/>
        <span v-if="searchQuery" @click="searchQuery = ''" class="text-gray-300 hover:text-gray-500 cursor-pointer transition flex-shrink-0">
          <i class="pi pi-times text-xs" />
        </span>
      </div>
      <div v-if="filteredMails.length === 0" class="flex flex-col items-center justify-center py-12 sm:py-16 px-6 text-center">
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
          <i class="pi pi-inbox text-xl sm:text-2xl text-gray-300" />
        </div>
        <p class="text-sm font-semibold text-gray-400">No mail found</p>
        <p class="text-xs text-gray-300 mt-1">Try adjusting your search or filter</p>
      </div>
      <div v-else>
        <div
          v-for="(mail, index) in paginatedMails"
          :key="mail.id"
          @click="openMail(mail)"
          class="flex items-start gap-2 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 cursor-pointer hover:bg-gray-50/70 transition-all duration-150 border-b border-gray-50 last:border-b-0 group"
          :class="!mail.read ? 'bg-[#4A6FA5]/[0.02]' : ''">
          <div class="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <span class="text-xs font-semibold text-gray-200 w-4 sm:w-5 text-center hidden xs:block">
              {{ (currentPage - 1) * pageSize + index + 1 }}
            </span>
            <div
              class="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0"
              :style="{ background: mail.avatarBg, color: mail.avatarColor }">
              {{ mail.initials }}
            </div>
          </div>
          <div
            class="w-0.5 self-stretch rounded-full flex-shrink-0 mt-0.5"
            :class="!mail.read ? 'bg-[#4A6FA5]' : 'bg-transparent'"
          />
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <p
                  class="text-xs sm:text-sm truncate"
                  :class="!mail.read ? 'font-bold text-[#1a2332]' : 'font-semibold text-gray-600'"
                >{{ mail.name }}</p>
                <p class="text-[10px] sm:text-xs text-gray-400 truncate mt-0.5">{{ mail.email }}</p>
              </div>
              <div class="flex flex-col items-end gap-1 sm:gap-1.5 flex-shrink-0">
                <span class="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">{{ mail.time }}</span>
                <span
                  class="text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full"
                  :class="!mail.read
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-emerald-50 text-emerald-600'"
                >{{ !mail.read ? 'UNREAD' : 'READ' }}</span>
              </div>
            </div>
            <p
              class="text-xs sm:text-sm mt-1 sm:mt-1.5 truncate"
              :class="!mail.read ? 'font-semibold text-[#1a2332]' : 'text-gray-500'"
            >{{ mail.subject }}</p>
            <p class="text-[10px] sm:text-xs text-gray-400 mt-0.5 line-clamp-1 leading-relaxed">{{ mail.preview }}</p>
          </div>
          <i class="pi pi-arrow-up-right text-xs text-gray-200 group-hover:text-[#4A6FA5] flex-shrink-0 mt-1 transition-colors duration-150" />
        </div>
      </div>
      <div
        v-if="filteredMails.length > 0"
        class="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-4 border-t border-gray-100">
        <span class="text-xs text-gray-400">
          Showing <span class="font-semibold text-gray-600">{{ paginatedMails.length }}</span> of
          <span class="font-semibold text-gray-600">{{ filteredMails.length }}</span> inquiries
          <i class="pi pi-arrow-right text-[10px] ml-1" />
        </span>
        <div class="flex items-center gap-1">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-2.5 sm:px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >Prev</button>
          <button
            v-for="p in totalPages"
            :key="p"
            @click="currentPage = p"
            class="px-2.5 sm:px-3 py-1.5 text-xs rounded-lg border transition font-semibold"
            :class="currentPage === p
              ? 'bg-[#4A6FA5] text-white border-[#4A6FA5]'
              : 'border-gray-200 text-gray-500 hover:bg-gray-50'"
          >{{ p }}</button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-2.5 sm:px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >Next</button>
        </div>
      </div>
    </div>
    <Dialog
      v-model:visible="detailDialogVisible"
      :modal="true"
      :style="{ width: '95vw', maxWidth: '580px' }"
      :pt="{
        header: { class: 'hidden' },
        content: { class: 'p-0 rounded-2xl overflow-hidden' },}">
      <div v-if="selectedMail" class="bg-white rounded-2xl overflow-hidden">
        <div class="flex items-start justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-gray-100">
          <div class="flex items-center gap-2 sm:gap-3 min-w-0">
            <div
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0"
              :style="{ background: selectedMail.avatarBg, color: selectedMail.avatarColor }"
            >{{ selectedMail.initials }}</div>
            <div class="min-w-0">
              <p class="text-xs sm:text-sm font-bold text-[#1a2332] truncate">{{ selectedMail.name }}</p>
              <p class="text-[10px] sm:text-xs text-gray-400 truncate">{{ selectedMail.email }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <span class="text-[10px] sm:text-xs text-gray-400">{{ selectedMail.time }}</span>
            <button
              @click="detailDialogVisible = false"
              class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
            ><i class="pi pi-times text-xs" /></button>
          </div>
        </div>
        <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-50">
          <p class="text-sm sm:text-base font-bold text-[#1a2332]">{{ selectedMail.subject }}</p>
        </div>
        <div class="px-4 sm:px-6 py-4 sm:py-5">
          <p class="text-xs sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line">{{ selectedMail.body }}</p>
        </div>
        <div class="px-4 sm:px-6 pb-4 sm:pb-5 flex items-center gap-2 flex-wrap">
          <button
            @click="replyTo(selectedMail)"
            class="flex items-center gap-2 rounded-xl bg-[#4A6FA5] px-3 sm:px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#3D5E8F] transition-all duration-150 active:scale-95 shadow-sm shadow-[#4A6FA5]/20">
            <span>Reply</span>
            <i class="pi pi-reply text-[10px]"></i>
          </button>
          <button
            @click="markAsRead(selectedMail)"
            class="flex items-center gap-2 rounded-xl bg-[#4A6FA5] px-3 sm:px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#3D5E8F] transition-all duration-150 active:scale-95 shadow-sm shadow-[#4A6FA5]/20">
            <span>{{ selectedMail.read ? 'Mark Unread' : 'Mark Read' }}</span>
            <i :class="selectedMail.read ? 'pi pi-envelope text-[10px]' : 'pi pi-check text-[10px]'"></i>
          </button>
          <button
            @click="deleteMail(selectedMail)"
            class="flex items-center gap-2 rounded-xl bg-rose-500 px-3 sm:px-3.5 py-2 text-xs font-semibold text-white hover:bg-rose-600 transition-all duration-150 active:scale-95 shadow-sm shadow-rose-500/20">
            <span>Delete</span>
            <i class="pi pi-trash text-[10px]"></i>
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import Dialog from 'primevue/dialog'
const mails = ref([
  {
    id: 1, read: false, initials: 'AP', avatarBg: '#e8f0ff', avatarColor: '#1a3a5c',
    name: 'Dr. Arthur Pendelton', email: 'arthur.p@healthpulse.org', time: '2h ago',
    subject: 'Informative Portal for Medical Diagnostics Firm',
    preview: 'Hello, we are launching an informative clinical research hub. We need a secure dynamic portal capable of handling patient-facing content and internal resources.',
    body: 'Hello,\n\nWe are launching an informative clinical research hub for HealthPulse. We need a secure, dynamic portal capable of handling patient-facing content and internal resources for our medical team.\n\nThe portal should include role-based access, a content management system for research publications, and a patient inquiry form. Budget is flexible for the right solution.\n\nLooking forward to your response.',
  },
  {
    id: 2, read: true, initials: 'SJ', avatarBg: '#f0fff4', avatarColor: '#15803d',
    name: 'Sarah Jenkins', email: 'sarah@greenharvest.co', time: '1d ago',
    subject: 'Sustainable Supply Chain Showcase',
    preview: 'We want to design a responsive website to showcase our sustainability initiatives and global supply chain stories.',
    body: 'Hi there,\n\nGreenHarvest Co. is looking to redesign our public website. We want to showcase our sustainability initiatives, carbon tracking dashboard, and global supply chain stories in an engaging, responsive format.\n\nWe would love to discuss timelines and approach at your earliest convenience.',
  },
  {
    id: 3, read: false, initials: 'RM', avatarBg: '#fff8e1', avatarColor: '#b45309',
    name: 'Raj Mehta', email: 'raj.mehta@tecscale.io', time: '2d ago',
    subject: 'SaaS Onboarding Flow Redesign',
    preview: 'Our current onboarding flow has a 60% drop-off. We need a UX overhaul for our B2B SaaS product targeting mid-market enterprises.',
    body: 'Hello StartX team,\n\nOur current SaaS onboarding flow is losing 60% of users at step 2. We need a complete UX overhaul, including progress indicators, contextual tooltips, and an interactive product tour.\n\nWe are a B2B tool targeting mid-market enterprises. Timeline is Q3. Would love to get on a call.',
  },
])
const currentPage         = ref(1)
const pageSize            = 6
const filterMenuOpen      = ref(false)
const activeFilter        = ref('all')
const searchQuery         = ref('')
const detailDialogVisible = ref(false)
const selectedMail        = ref(null)
const filterOptions = [
  { label: 'All Mail', value: 'all',    icon: 'pi pi-inbox' },
  { label: 'Unread',   value: 'unread', icon: 'pi pi-envelope' },
  { label: 'Read',     value: 'read',   icon: 'pi pi-check-circle' },
]
const unreadCount = computed(() => mails.value.filter(m => !m.read).length)
const readCount   = computed(() => mails.value.filter(m => m.read).length)
const filteredMails = computed(() => {
  let list = mails.value
  if (activeFilter.value === 'unread') list = list.filter(m => !m.read)
  if (activeFilter.value === 'read')   list = list.filter(m => m.read)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q)
    )
  }
  return list
})
const totalPages     = computed(() => Math.max(1, Math.ceil(filteredMails.value.length / pageSize)))
const paginatedMails = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredMails.value.slice(start, start + pageSize)
})
function selectFilter(opt) {
  activeFilter.value = opt.value
  filterMenuOpen.value = false
  currentPage.value = 1
}
function openMail(mail) {
  mail.read = true
  selectedMail.value = mail
  detailDialogVisible.value = true
}
function markAsRead(mail) {
  mail.read = !mail.read
  detailDialogVisible.value = false
}
function deleteMail(mail) {
  mails.value = mails.value.filter(m => m.id !== mail.id)
  detailDialogVisible.value = false
}
function replyTo(mail) {
  detailDialogVisible.value = false
}
</script>