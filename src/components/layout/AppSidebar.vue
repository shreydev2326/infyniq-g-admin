<template>
  <aside
    :class="[
      'fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-slate-100 bg-white px-5 py-6 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <button
      @click="$emit('update:isOpen', false)"
      class="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-slate-700 lg:hidden"
    >
      <img :src="logo1" alt="Close" class="h-3 w-3" />
    </button>
    <div class="mb-8 flex items-center gap-3 px-2">
      <div class="flex h-10 w-full max-w-14 shrink-0 items-center justify-center">
        <img :src="logo1" alt="Logo" class="h-full w-full" />
      </div>
      <div>
        <h1 class="font-sans text-base font-semibold tracking-tight text-slate-900">
          StartX Consultancy
        </h1>
        <p class="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
          Government Certification
        </p>
      </div>
    </div>
    <nav class="flex-1 space-y-1">
      
    <RouterLink
      v-for="item in visibleMenuItems"
      :key="item.id"
      :to="{ name: item.routeName }"
      @click="selectTab(item.id)"
      :class="[
        'flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
        activeTab === item.id
          ? 'bg-slate-950 text-white shadow-sm'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      ]"
    >
      <div class="flex items-center gap-3">
        <i :class="['pi', item.icon]" class="text-base"></i>
        <span>{{ item.label }}</span>
      </div>
    </RouterLink>
    </nav>
    <div class="mb-6 rounded-2xl bg-slate-50 p-4 border border-slate-100">
      <div class="flex items-center gap-2 mb-2">
<i class="pi pi-globe text-sm text-emerald-400"></i>
        <span class="text-xs font-medium text-slate-700">Client Live Status</span>
      </div>
      <p class="text-[11px] text-slate-400 leading-relaxed">
        Frontend is connected via secure webhooks. Website content edits publish instantly.
      </p>
      <div class="mt-3 flex items-center justify-between">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          Synchronized
        </span>
        <span class="font-mono text-[9px] text-slate-400">Ver 1.4.2</span>
      </div>
    </div>
      <div class="flex items-center justify-between gap-2 px-1">
        <div class="flex items-center gap-3 min-w-0">
          <i class="pi pi-user text-sm text-black-900"></i>
          <div class="min-w-0">
            <h4 class="text-xs font-semibold text-slate-800 truncate leading-tight">
              Mayank 
            </h4>
            <div class="inline-flex items-center gap-1 mt-0.5">
              <i class="pi pi-shield text-sm text-slate-400"></i>
              <span class="text-[10px] font-medium text-slate-400 uppercase">
               Admin
              </span>
            </div>
          </div>
        </div>
        <button
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
        >
          <i class="pi pi-sign-out text-sm"></i>
        </button>
      </div>
    
<div class="mt-5 border-t border-slate-100 pt-5">
  <div class="flex items-center justify-center gap-2">
   <i class="pi pi-database text-sm text-black-700"></i>
    <p class="text-sm text-slate-400">
      Powered by
      <span class="font-semibold text-slate-900">
        Infyniq Solutions
      </span>
    </p>
  </div>
</div>
  </aside>
</template>
<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import logo1 from '@/assets/logo/logo1.png'
const props = defineProps({
  activeTab:          { type: String,  required: true },
  currentUser:        { type: Object,  default: null  },
  isOpen:             { type: Boolean, default: false }
})

const emit = defineEmits(['update:activeTab', 'update:isOpen', 'logout'])
const menuItems = [
  {
    id: 'overview',
    label: 'Command Center',
    icon: 'pi-objects-column',
    routeName: 'Home'
  },
  {
    id: 'content',
    label: 'Website Content',
    icon: 'pi-file-edit',
    routeName: 'Analytics'
  },
  {
    id: 'leads',
    label: 'Qualified Leads',
    icon: 'pi-user',
    routeName: 'Orders'
  },
  {
    id: 'inquiries',
    label: 'Mail Inquiries',
    icon: 'pi-envelope',
    routeName: 'Customers'
  },
  {
    id: 'staff',
    label: 'Employee & Staff',
    icon: 'pi-users',
    routeName: 'Products'
  },
  {
    id: 'logs',
    label: 'Security & Activity',
    icon: 'pi-history',
    routeName: 'Settings'
  }
]
const visibleMenuItems = computed(() => menuItems)
function selectTab(id) {
  emit('update:activeTab', id)
  emit('update:isOpen', false)
}
</script>