<template>
  <div class="flex flex-col gap-4 xl:flex-row" style="font-family: 'Inter', sans-serif">
    <div class="flex-1 rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div class="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-base font-medium text-slate-700">
            Action-Required Opportunities
          </h2>
          <p class="mt-0.5 text-xs text-slate-400">
            Highly qualified leads based on requested project budget size.
          </p>
        </div>
        <button 
         @click="goToOrders"
        class="inline-flex w-fit items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors">
          <i class="pi pi-users text-xs"></i>
          <span>Lead CRM</span>
        </button>
      </div>
      <div class="space-y-1">
        <div
          v-for="lead in actionLeads"
          :key="lead.name"
          class="group flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-slate-50 cursor-pointer">
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
            {{ lead.name.charAt(0) }}
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-sm font-medium text-slate-700">
                {{ lead.name }}
              </span>
              <span class="font-mono text-[11px] text-slate-400">
                @{{ lead.company }}
              </span>
            </div>
            <p class="mt-0.5 hidden truncate text-[11px] text-slate-400 sm:block">
              {{ lead.project }}
            </p>
          </div>
          <div class="hidden shrink-0 text-right sm:block">
            <p class="text-sm font-medium text-slate-700">
              {{ lead.price }}
            </p>
            <span :class="['text-[10px] font-medium uppercase tracking-wide', lead.statusColor]">
              {{ lead.status }}
            </span>
          </div>
          <div class="shrink-0 sm:hidden">
            <span :class="['rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase', lead.statusColor]">
              {{ lead.status }}
            </span>
          </div>
          <i class="pi pi-arrow-up-right text-xs text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5"></i>
        </div>
      </div>
    </div>
    <div class="w-full rounded-xl border border-slate-100 bg-white p-5 shadow-sm xl:w-80 xl:shrink-0">
      <div class="mb-4">
        <h2 class="text-base font-medium text-slate-700">
          Device Usage
        </h2>
        <p class="mt-0.5 text-xs text-slate-400">
          Visitor distribution across desktop, mobile, and tablet devices.
        </p>
      </div>
      <div class="h-52">
        <Chart
          type="doughnut"
          :data="trafficData"
          :options="trafficOptions"
          class="h-full w-full"
        />
      </div>
      <div class="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
        <div
          v-for="item in deviceItems"
          :key="item.label"
          class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span :class="['h-2.5 w-2.5 rounded-full', item.color]"></span>
            <span class="text-xs font-normal text-slate-500">
              {{ item.label }}
            </span>
          </div>
          <span class="text-xs font-medium text-slate-700">
            {{ item.value }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Chart from 'primevue/chart'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToOrders = () => {
  router.push('/leads')
}
const actionLeads = [
  {
    name: 'Michael Peterson',
    company: 'Nexus Logistics Group',
    project: 'Corporate Website & Operations Overview Portal',
    price: '$15,000 - $25,000',
    status: 'Review',
    statusColor: 'text-amber-600',
  },
  {
    name: 'Elena Rostova',
    company: 'Rostova Creative Designs',
    project: 'Bespoke Virtual Art Gallery Portfolio',
    price: '$8,000 - $12,000',
    status: 'Contacted',
    statusColor: 'text-blue-600',
  },
  {
    name: 'Donald Duck',
    company: 'Quack Industries',
    project: 'Free Site Audit & Speed Tuning',
    price: 'Under $2,000',
    status: 'New',
    statusColor: 'text-emerald-600',
  },
  {
    name: 'Emily Carter',
    company: 'Vertex Innovations',
    project: 'Enterprise SaaS Dashboard & Customer Portal',
    price: '$20,000 - $35,000',
    status: 'Priority',
    statusColor: 'text-red-600',
  },
]
const deviceItems = [
  { label: 'Desktop', value: '48%', color: 'bg-indigo-500' },
  { label: 'Mobile',  value: '38%', color: 'bg-violet-500' },
  { label: 'Tablet',  value: '14%', color: 'bg-cyan-500'   },
]
const trafficData = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [48, 38, 14],
      backgroundColor: ['#6366F1', '#8B5CF6', '#06B6D4'],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
}
const trafficOptions = {
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e293b',
      padding: 8,
      cornerRadius: 6,
      titleFont: { family: 'Inter, sans-serif', size: 12, weight: '400' },
      bodyFont:  { family: 'Inter, sans-serif', size: 12, weight: '400' },
    },
  },
}
</script>