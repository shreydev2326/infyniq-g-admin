<template>
  <!-- Mobile Header -->
  <header class="bg-transparent px-4 py-3.5 lg:hidden">
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#4A6FA5]">
          <i :class="['pi', pageIcon]" class="text-white text-xs"></i>
        </div>
        <h1 class="truncate text-sm font-semibold text-[#1A2535]">
          {{ pageTitle }}
        </h1>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button
          class="flex items-center gap-1.5 rounded-lg bg-[#4A6FA5] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3D5E8F] transition-colors"
        >
          <span>CMS Preview</span>
          <i class="pi pi-external-link text-[10px]"></i>
        </button>
        <button
          @click="$emit('open-sidebar')"
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E6EAF0] border border-[#D8E0EA] text-[#7A8BA0] hover:bg-[#DDE2EA] hover:text-[#4A6FA5] transition-colors"
        >
          <i class="pi pi-bars text-sm"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- Desktop Header -->
  <header class="hidden lg:flex items-center justify-between bg-transparent px-6 py-4">
    <!-- Left: Page Identity -->
    <div class="flex items-center gap-3.5">
      <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm border border-[#E2E6EC]">
        <i :class="['pi', pageIcon]" class="text-[#4A6FA5] text-base"></i>
      </div>
      <div>
        <h1 class="text-[15px] font-semibold text-[#1A2535] leading-tight">
          {{ pageTitle }}
        </h1>
        <p class="text-[11px] text-[#7A8BA0] mt-0.5 leading-tight">
          {{ pageSubtitle }}
        </p>
      </div>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-2">
      <!-- Clock -->
      <div class="flex items-center gap-2 rounded-xl bg-white border border-[#E2E6EC] px-3 py-2 shadow-sm">
        <i class="pi pi-clock text-[#90A0B5] text-xs"></i>
        <span class="font-mono text-xs font-medium text-[#3D5066] tabular-nums">
          {{ currentTime }}
        </span>
      </div>

      <!-- Refresh -->
      <button
        @click="handleRefresh"
        class="flex items-center gap-2 rounded-xl bg-white border border-[#E2E6EC] px-3.5 py-2 text-xs font-medium text-[#3D5066] hover:bg-[#E6EAF0] hover:border-[#D8E0EA] hover:text-[#2D3D52] transition-all duration-150 active:scale-95 shadow-sm"
      >
        <i class="pi pi-sync text-xs" :class="{ 'animate-spin': isRefreshing }"></i>
        <span>Refresh Data</span>
      </button>

      <!-- CMS Preview -->
      <button
      @click="goTocms"
        class="flex items-center gap-2 rounded-xl bg-[#4A6FA5] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#3D5E8F] transition-all duration-150 active:scale-95 shadow-sm shadow-[#4A6FA5]/20"
      >
        <span>CMS Preview</span>
        <i class="pi pi-external-link text-[10px]"></i>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goTocms = () => {
  router.push('/content')
}

const props = defineProps({
  activeTab: {
    type: String,
    required: true
  }
})

defineEmits(['open-sidebar', 'change-tab'])

const currentTime = ref('')
const isRefreshing = ref(false)
let timer = null

const titlesMap = {
  overview: {
    title: 'Command Center',
    subtitle: 'Administrative telemetry, visitor metrics and actionable CRM highlights.',
    icon: 'pi-objects-column'
  },
  content: {
    title: 'Website Content',
    subtitle: 'Update dynamic copy, services, and team information on the frontend instantly.',
    icon: 'pi-file-edit'
  },
  leads: {
    title: 'Qualified Leads',
    subtitle: 'Automated conversion capture and qualified client profiles.',
    icon: 'pi-user'
  },
  inquiries: {
    title: 'Mail Inquiries',
    subtitle: 'Direct contact form requests with intelligent assistant actions.',
    icon: 'pi-envelope'
  },
  staff: {
    title: 'Employee & Staff',
    subtitle: 'Configure employee credentials, roles, and access permissions.',
    icon: 'pi-users'
  },
  logs: {
    title: 'Security & Activity',
    subtitle: 'Continuous audit trail of modifications per employee account.',
    icon: 'pi-history'
  }
}

const pageTitle    = computed(() => titlesMap[props.activeTab]?.title    ?? 'Admin Console')
const pageSubtitle = computed(() => titlesMap[props.activeTab]?.subtitle ?? 'Standard informative agency panel.')
const pageIcon     = computed(() => titlesMap[props.activeTab]?.icon     ?? 'pi-th-large')

function updateTime() {
  currentTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function handleRefresh() {
  if (isRefreshing.value) return
  isRefreshing.value = true
  setTimeout(() => { isRefreshing.value = false }, 1200)
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>