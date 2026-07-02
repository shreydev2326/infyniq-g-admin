<template>
  <section class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
    <div
      v-for="stat in statCards"
      :key="stat.id"
      class="relative overflow-hidden rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
      <div class="mb-3 flex items-start justify-between">
        <span class="text-[11px] font-medium text-slate-400 tracking-wide uppercase">
          {{ stat.label }}
        </span>
        <span :class="['flex h-8 w-8 items-center justify-center rounded-lg', stat.iconBg]">
          <i :class="['pi', stat.icon, 'text-sm', stat.iconColor]"></i>
        </span>
      </div>
      <div class="mb-1">
        <span class="text-[1.4rem] font-bold tracking-tight text-slate-800 leading-none">
          {{ stat.value }}
        </span>
      </div>
      <div class="mb-2">
        <span :class="['inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold', stat.badgeBg, stat.badgeColor]">
          {{ stat.badge }}
        </span>
      </div>
      <p class="mb-3 text-[11px] leading-4 text-slate-400">
        {{ stat.note }}
      </p>
      <div class="h-8">
        <Chart
          type="line"
          :data="stat.chartData"
          :options="chartOptions"
          class="w-full h-full"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import Chart from 'primevue/chart'
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: {
    x: { display: false },
    y: { display: false },
  },
  elements: {
    point: { radius: 0 },
    line: { tension: 0.4, borderWidth: 2 },
  },
}
const statCards = [
  {
    id: 'visitors',
    label: 'Unique Visitors (7D)',
    icon: 'pi-users',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-500',
    value: '2,900',
    badge: '↑ +17.8%',
    badgeColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-50',
    note: 'Current aggregate across all pages: 3,650 views',
    chartData: {
      labels: ['1','2','3','4','5','6','7','8','9','10'],
      datasets: [{ data: [40,60,45,80,55,90,65,75,50,85], borderColor: '#10b981', fill: false }],
    },
  },
  {
    id: 'leads',
    label: 'Pipeline Leads',
    icon: 'pi-user-plus',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    value: '4',
    badge: '2 High Score',
    badgeColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-50',
    note: '1 newly captured opportunity today',
    chartData: {
      labels: ['1','2','3','4','5','6','7','8','9','10'],
      datasets: [{ data: [30,50,70,40,85,55,65,45,75,60], borderColor: '#38bdf8', fill: false }],
    },
  },
  {
    id: 'conversion',
    label: 'Conversion Win Rate',
    icon: 'pi-percentage',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-500',
    value: '15.0%',
    badge: '7 Client Contracts',
    badgeColor: 'text-violet-700',
    badgeBg: 'bg-violet-50',
    note: 'Form submit to signed contract ratio',
    chartData: {
      labels: ['1','2','3','4','5','6','7','8','9','10'],
      datasets: [{ data: [55,45,70,35,80,50,65,40,75,90], borderColor: '#7c3aed', fill: false }],
    },
  },
  {
    id: 'inquiries',
    label: 'Mail Inquiries',
    icon: 'pi-envelope',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    value: '3',
    badge: '2 Need Response',
    badgeColor: 'text-amber-700',
    badgeBg: 'bg-amber-50',
    note: 'Customer interactions from website forms',
    chartData: {
      labels: ['1','2','3','4','5','6','7','8','9','10'],
      datasets: [{ data: [60,80,45,70,35,90,55,75,40,65], borderColor: '#f59e0b', fill: false }],
    },
  },
]
</script>