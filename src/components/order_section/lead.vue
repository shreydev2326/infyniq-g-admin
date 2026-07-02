<template>
  <div class="min-h-screen bg-[#f4f5f7] p-4 sm:p-6 lg:p-8 font-sans animate-fade-in-up">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h2 class="text-base tracking-tight font-medium text-slate-700" style="font-family: 'Inter', sans-serif">Leads</h2>
        <p class="text-sm text-gray-500 mt-0.5">Manage and track all your pipeline leads</p>
      </div>
      <div class="flex items-center gap-3 flex-wrap">
        <div class="relative">
          <button
            @click="sortMenuOpen = !sortMenuOpen"
            class="flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:scale-95 shadow-sm"
          >
            <span>Sort By</span>
            <i class="pi pi-chevron-down text-[10px] text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': sortMenuOpen }"></i>
          </button>
          <transition name="dropdown">
            <div
              v-if="sortMenuOpen"
              class="absolute right-0 top-[calc(100%+8px)] bg-white border border-gray-100 rounded-xl shadow-xl z-50 w-48 overflow-hidden"
            >
              <div
                v-for="opt in sortOptions"
                :key="opt.value"
                @click="selectSort(opt)"
                class="px-4 py-3 text-xs text-gray-600 hover:bg-[#4A6FA5]/10 hover:text-[#1a3a5c] font-medium cursor-pointer transition-colors duration-150 flex items-center gap-2"
              >
                <i class="pi pi-sort-alt text-[10px] opacity-50"></i>
                {{ opt.label }}
              </div>
            </div>
          </transition>
        </div>
        <button
          class="flex items-center gap-2 rounded-xl bg-[#4A6FA5] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#112740] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95 shadow-sm shadow-[#1a3a5c]/20"
        >
          <span>Create Lead</span>
          <i class="pi pi-plus text-[10px]"></i>
        </button>
      </div>
    </div>
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hidden md:flex md:flex-col">
      <div class="grid grid-cols-[48px_1.8fr_2fr_1.4fr_1.2fr_1.8fr_1.2fr_1.6fr] bg-gray-50/50 border-b border-gray-100">
        <div class="px-4 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">#</div>
        <div class="px-3 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Contact Name</div>
        <div class="px-3 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email</div>
        <div class="px-3 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone</div>
        <div class="px-3 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</div>
        <div class="px-3 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Company</div>
        <div class="px-3 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Source</div>
        <div class="px-3 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tags</div>
      </div>
      
      <!-- Animated List for Desktop -->
      <transition-group name="list" tag="div" class="relative min-h-[300px]">
        <div
          v-for="(lead, index) in paginatedLeads"
          :key="lead.id"
          class="grid grid-cols-[48px_1.8fr_2fr_1.4fr_1.2fr_1.8fr_1.2fr_1.6fr] border-b border-gray-50 hover:bg-blue-50/30 transition-colors duration-200 items-center group"
          :class="index === paginatedLeads.length - 1 ? 'border-b-0' : ''"
        >
          <div class="px-4 py-4 text-sm font-semibold text-gray-300 group-hover:text-gray-400 transition-colors">
            {{ (currentPage - 1) * pageSize + index + 1 }}
          </div>
          <div class="px-3 py-4 flex items-center gap-3 min-w-0">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#1a3a5c] bg-[#e8f0ff] flex-shrink-0 ring-2 ring-white shadow-sm">
              {{ lead.initials }}
            </div>
            <span class="text-sm font-semibold text-[#1a2332] truncate">{{ lead.name }}</span>
          </div>
          <div class="px-3 py-4 flex items-center gap-2 min-w-0 group/email">
            <i class="pi pi-envelope text-gray-300 text-xs flex-shrink-0 group-hover/email:text-[#1a3a5c] transition-colors" />
            <a :href="'mailto:' + lead.email" class="text-sm text-gray-500 hover:text-[#1a3a5c] truncate transition-colors">
              {{ lead.email }}
            </a>
          </div>
          <div class="px-3 py-4 flex items-center gap-2">
            <i class="pi pi-phone text-gray-300 text-xs flex-shrink-0" />
            <span class="text-sm text-gray-500 whitespace-nowrap">{{ lead.phone }}</span>
          </div>
          <div class="px-3 py-4">
            <span class="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold border tracking-wide" :class="statusStyle(lead.status)">
              {{ lead.status }}
            </span>
          </div>
          <div class="px-3 py-4 flex items-center gap-2 min-w-0">
             <span
                class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                :style="{ backgroundColor: lead.dotColor }"
             ></span>

           <span class="text-sm font-medium text-gray-700 truncate">
                {{ lead.company }}
           </span>
          </div>
          <div class="px-3 py-4">
            <span class="text-sm text-gray-500 font-medium">{{ lead.source }}</span>
          </div>
          <div class="px-3 py-4 flex flex-wrap gap-1.5">
            <span
              v-for="tag in lead.tags"
              :key="tag.label"
              class="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
              :class="tagStyle(tag.type)"
            >
              {{ tag.label }}
            </span>
          </div>
        </div>
      </transition-group>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50/30">
        <span class="text-sm text-gray-500 flex items-center gap-1.5">
          Showing <span class="font-bold text-gray-700">{{ paginatedLeads.length }}</span> of
          <span class="font-bold text-gray-700">{{ allLeads.length }}</span> entries
        </span>
        <div class="flex items-center gap-1.5">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:cursor-not-allowed transition-all"
          >Prev</button>
          <div class="flex items-center gap-1">
            <button
              v-for="p in totalPages"
              :key="p"
              @click="currentPage = p"
              class="w-8 h-8 text-xs flex items-center justify-center rounded-lg border transition-all font-bold"
              :class="currentPage === p
                ? 'bg-[#1a3a5c] text-white border-[#1a3a5c] shadow-sm shadow-[#1a3a5c]/20'
                : 'border-gray-200 text-gray-600 hover:bg-white hover:shadow-sm'"
            >{{ p }}</button>
          </div>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:cursor-not-allowed transition-all"
          >Next</button>
        </div>
      </div>
    </div>
    <div class="md:hidden">
      <transition-group name="list" tag="div" class="space-y-3 relative">
        <div
          v-for="(lead, index) in paginatedLeads"
          :key="lead.id"
          class="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:border-[#1a3a5c]/30 transition-colors duration-200"
        >
          <div class="flex items-start justify-between gap-3 mb-4">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#1a3a5c] bg-[#e8f0ff] flex-shrink-0 ring-4 ring-gray-50">
                {{ lead.initials }}
              </div>
              <div class="min-w-0">
                <p class="text-base font-bold text-[#1a2332] truncate">{{ lead.name }}</p>
                <p class="text-xs text-gray-500 truncate flex items-center gap-2 mt-0.5">
                 <span
                   class="w-1 h-1 rounded-full inline-block"
                   :style="{ backgroundColor: lead.dotColor }"
                 ></span>
                     {{ lead.company }}
                </p>
              </div>
            </div>
            <span class="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border tracking-wide uppercase flex-shrink-0" :class="statusStyle(lead.status)">
              {{ lead.status }}
            </span>
          </div>
          <div class="space-y-2.5 mb-4 bg-gray-50/50 p-3 rounded-xl border border-gray-50">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-md bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                <i class="pi pi-envelope text-gray-400 text-[10px]" />
              </div>
              <a :href="'mailto:' + lead.email" class="text-sm text-gray-600 hover:text-[#1a3a5c] font-medium truncate">{{ lead.email }}</a>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-md bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                <i class="pi pi-phone text-gray-400 text-[10px]" />
              </div>
              <span class="text-sm text-gray-600 font-medium">{{ lead.phone }}</span>
            </div>
          </div>   
          <div class="flex flex-wrap gap-2 pt-1">
            <span
              v-for="tag in lead.tags"
              :key="tag.label"
              class="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
              :class="tagStyle(tag.type)" >
              {{ tag.label }}
            </span>
            <span class="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 ml-auto">
              {{ lead.source }}
            </span>
          </div>
        </div>
      </transition-group>
      <div class="bg-white rounded-2xl shadow-sm p-4 mt-4 flex items-center justify-between border border-gray-100">
        <span class="text-sm text-gray-500 font-medium">
          <span class="font-bold text-[#1a2332]">{{ (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize, allLeads.length) }}</span>
          of {{ allLeads.length }}
        </span>
        <div class="flex items-center gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          ><i class="pi pi-chevron-left text-xs" /></button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          ><i class="pi pi-chevron-right text-xs" /></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const allLeads = ref([
  { id: 1,  name: 'John Doe',       initials: 'J', email: 'john.doe@example.com',      phone: '(123) 456-7890', status: 'New Lead',    company: 'ABC Corp',          source: 'Web',          dotColor: '#22c55e' , tags: [{ label: 'Interested', type: 'interested' }, { label: 'VIP', type: 'vip' }] },
  { id: 2,  name: 'Jane Smith',     initials: 'J', email: 'jane.smith@example.com',      phone: '(987) 654-3210', status: 'Contacted',   company: 'XYZ Ltd',            source: 'Referral',     dotColor: '#f97316',    tags: [{ label: 'Follow-up', type: 'followup' }] },
  { id: 3,  name: 'Emily Johnson',  initials: 'E', email: 'emily.johnson@example.com',   phone: '(555) 123-4567', status: 'Qualified',   company: 'FutureTech',         source: 'Social Media', dotColor: '#ef4444',         tags: [{ label: 'High Priority', type: 'highpriority' }, { label: 'VIP', type: 'vip' }] },
  { id: 4,  name: 'Michael Brown',  initials: 'M', email: 'michael.brown@example.com',   phone: '(333) 777-8888', status: 'Negotiation', company: 'Innovate Solutions', source: 'Web',          dotColor: '#f97316',          tags: [{ label: 'Potential', type: 'potential' }] },
  { id: 5,  name: 'Sara White',     initials: 'S', email: 'sara.white@example.com',      phone: '(222) 333-4444', status: 'Lead Closed', company: 'DesignWorks',       source: 'Event',       dotColor: '#22c55e',      tags: [{ label: 'Converted', type: 'converted' }] },
  { id: 6,  name: 'David Lee',      initials: 'D', email: 'david.lee@example.com',       phone: '(444) 555-6666', status: 'Contacted',   company: 'Tech Innovations',   source: 'Referral',     dotColor: '#f97316',    tags: [{ label: 'Follow-up', type: 'followup' }] },
])
const currentPage         = ref(1)
const pageSize            = 10
const sortMenuOpen        = ref(false)
const sortOptions   = [
  { label: 'Name (A–Z)',  value: 'name_asc'  },
  { label: 'Name (Z–A)',  value: 'name_desc' },
  { label: 'Status',      value: 'status'    },
  { label: 'Company',     value: 'company'   },
]
const totalPages     = computed(() => Math.ceil(allLeads.value.length / pageSize))
const paginatedLeads = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return allLeads.value.slice(start, start + pageSize)
})
function statusStyle(status) {
  return {
    'New Lead':    'bg-blue-50/80 text-blue-700 border-blue-200',
    'Contacted':   'bg-emerald-50/80 text-emerald-700 border-emerald-200',
    'Qualified':   'bg-green-50/80 text-green-700 border-green-200',
    'Negotiation': 'bg-amber-50/80 text-amber-700 border-amber-200',
    'Lead Closed': 'bg-rose-50/80 text-rose-700 border-rose-200',
  }[status] || 'bg-gray-100 text-gray-500 border-gray-200'
}
function tagStyle(type) {
  return {
    interested:   'bg-blue-50 text-blue-600 border border-blue-100',
    vip:          'bg-violet-50 text-violet-600 border border-violet-100',
    followup:     'bg-orange-50 text-orange-600 border border-orange-100',
    highpriority: 'bg-green-50 text-green-700 border border-green-100',
    potential:    'bg-yellow-50 text-yellow-700 border border-yellow-100',
    converted:    'bg-pink-50 text-pink-700 border border-pink-100',
  }[type] || 'bg-gray-100 text-gray-500 border border-gray-200'
}
function selectSort(opt) {
  sortMenuOpen.value = false
  const leads = [...allLeads.value]
  if (opt.value === 'name_asc')  leads.sort((a, b) => a.name.localeCompare(b.name))
  if (opt.value === 'name_desc') leads.sort((a, b) => b.name.localeCompare(a.name))
  if (opt.value === 'status')    leads.sort((a, b) => a.status.localeCompare(b.status))
  if (opt.value === 'company')   leads.sort((a, b) => a.company.localeCompare(b.company))
  allLeads.value = leads
  currentPage.value = 1
}
</script>
<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}
.list-leave-active {
  position: absolute;
  width: 100%;
  z-index: -1;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top right;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-5px);
}
</style>