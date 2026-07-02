<template>
  <aside
    :class="[
      'fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col px-4 py-5 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
      'bg-[#F0F2F5] border-r border-[#E2E6EC]',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <button
      @click="$emit('update:isOpen', false)"
      class="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-lg bg-[#E6EAF0] text-[#7A8BA0] hover:bg-[#DDE2EA] hover:text-[#4A6FA5] transition-colors lg:hidden"
    >
      <i class="pi pi-times text-xs"></i>
    </button>
    <div class="mb-8 px-2 flex items-center gap-3">
      <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4A6FA5]">
        <i class="pi pi-verified text-white text-sm"></i>
      </div>
      <div>
        <h1 class="text-sm font-semibold tracking-tight text-[#1A2535] leading-tight">
          StartX Consultancy
        </h1>
        <p class="text-[10px] font-semibold tracking-widest text-[#7A8BA0] uppercase mt-0.5">
          Gov. Certification
        </p>
      </div>
    </div>
    <p class="mb-2 px-3 text-[10px] font-semibold tracking-widest text-[#A0AFBF] uppercase">
      Navigation
    </p>
    <nav class="flex-1 space-y-3">
      <RouterLink
        v-for="item in visibleMenuItems"
        :key="item.id"
        :to="{ name: item.routeName }"
        @click="selectTab(item.id)"
        :class="[
          'group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium transition-all duration-150',
          route.name === item.routeName
            ? 'bg-[#4A6FA5] text-white shadow-sm shadow-[#4A6FA5]/20'
            : 'text-[#3D5066] hover:bg-[#E8ECF2] hover:text-[#2D3D52]'
        ]"
      >
        <i
          :class="[
            'pi', item.icon,
            'text-base w-4 shrink-0 text-center transition-colors',
            route.name === item.routeName
              ? 'text-white'
              : 'text-[#90A0B5] group-hover:text-[#4A6FA5]'
          ]"
        ></i>
        <span class="truncate flex-1">{{ item.label }}</span>
        <span
          v-if="item.badge"
          :class="[
            'rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums',
            route.name === item.routeName 
              ? 'bg-white/20 text-white'
              : 'bg-[#D8E0EA] text-[#4A6FA5]'
          ]"
        >
          {{ item.badge }}
        </span>
      </RouterLink>
    </nav>
    <div class="my-5 rounded-xl bg-[#E6EAF0] border border-[#D8E0EA] p-3.5">
      <div class="flex items-center gap-2 mb-1.5">
        <span class="relative flex h-2 w-2 shrink-0">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span class="text-[11px] font-semibold text-[#1A2535]">Client Live Status</span>
        <span class="ml-auto font-mono text-[9px] text-[#A0AFBF]">v1.4.2</span>
      </div>
      <p class="text-[10px] text-[#7A8BA0] leading-relaxed">
        Webhooks active. Content edits publish instantly to the live site.
      </p>
    </div>
    <div class="border-t border-[#E2E6EC] mb-4"></div>
    <div class="flex items-center gap-3 px-1">
      <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4A6FA5] text-white text-xs font-bold select-none">
        M
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-xs font-semibold text-[#1A2535] truncate leading-tight">
          {{ currentUser?.name || 'Guest User' }}
        </p>
        <div class="flex items-center gap-1 mt-0.5">
          <span class="text-[10px] font-medium text-[#7A8BA0] uppercase tracking-wide">{{ currentUser?.role || 'User' }}</span>
        </div>
      </div>
      <button
        @click="$emit('logout')"
        title="Sign out"
        class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#A0AFBF] hover:bg-[#E6EAF0] hover:text-rose-400 transition-colors"
      >
        <i class="pi pi-sign-out text-xs"></i>
      </button>
    </div>

    <!-- Footer -->
    <div class="mt-4 pt-4 border-t border-[#E2E6EC]">
      <div class="flex items-center justify-center gap-1.5">
        <i class="pi pi-database text-[10px] text-[#A0AFBF]"></i>
        <p class="text-[10px] text-[#A0AFBF]">
          Powered by
          <span class="font-semibold text-[#4A6FA5]">Infyniq Solutions</span>
        </p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ref, onMounted } from "vue"
const currentUser = ref(null)
onMounted(() => {
  const user = localStorage.getItem("loggedInUser")
  if (user) {
    currentUser.value = JSON.parse(user)
  }
})
const route = useRoute()
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:activeTab', 'update:isOpen', 'logout'])
const menuItems = [
  { id: 'overview',  label: 'Command Center',      icon: 'pi-objects-column', routeName: 'Home',      badge: null, path: '/'},
  { id: 'content',   label: 'Website Content',     icon: 'pi-file-edit',      routeName: 'Analytics', badge: null, path: 'content' },
  { id: 'leads',     label: 'Qualified Leads',     icon: 'pi-user',           routeName: 'Orders',    badge: null, path: 'leads'  },
  { id: 'products',  label: 'Products & Assets',   icon: 'pi-box',      routeName: 'Details',  badge: null, path: 'details' },
  { id: 'inquiries', label: 'Mail Inquiries',      icon: 'pi-envelope',       routeName: 'Customers', badge: '3',  path: 'mails'  },
  { id: 'staff',     label: 'Employee & Staff',    icon: 'pi-users',          routeName: 'Products',  badge: null, path: 'staff' },
  { id: 'logs',      label: 'Security & Activity', icon: 'pi-history',        routeName: 'Settings',  badge: null, path: 'security' }
]

const visibleMenuItems = computed(() => menuItems)

function selectTab(id) {
  emit('update:activeTab', id)
  emit('update:isOpen', false)
}
</script>