<template>
  <div class="flex flex-col md:flex-row gap-4 items-stretch min-h-106.25">
    <div class="flex flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm min-w-0">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-base font-medium text-slate-700" style="font-family: 'Inter', sans-serif">
            Project Analysis
          </h2>
          <p class="mt-1 text-xs text-slate-400" style="font-family: 'Inter', sans-serif">
            Monthly breakdown of page views and unique visitors.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button class="flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors" style="font-family: 'Inter', sans-serif">
            Sort By <i class="pi pi-chevron-down text-xs"></i>
          </button>
          <button class="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors" style="font-family: 'Inter', sans-serif">
            Export <i class="pi pi-arrow-right text-xs"></i>
          </button>
        </div>
      </div>
      <div class="mt-5 flex-1 min-h-0 w-full" style="height: 260px; min-height: 260px;">
        <Chart type="line" :data="chartData" :options="chartOptions" class="h-full w-full" />
      </div>
    </div>
    <div class="w-full md:w-96 md:shrink-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm flex flex-col min-w-0">
      <div class="mb-5">
        <h2 class="text-base font-medium text-slate-700" style="font-family: 'Inter', sans-serif">
          Acquisition Sources
        </h2>
        <p class="mt-1 text-xs text-slate-400 leading-5" style="font-family: 'Inter', sans-serif">
          Distribution of visitors across major traffic channels.
        </p>
      </div>
      <div class="flex-1 w-full" style="height: 220px; min-height: 220px;">
        <Chart type="bar" :data="acquisitionChartData" :options="acquisitionChartOptions" class="h-full w-full" />
      </div>
      <div class="mt-5 border-t border-slate-100 pt-5 space-y-3">
        <div
          v-for="source in acquisitionSources.slice(0, 3)"
          :key="source.label"
          class="flex items-center justify-between">
          <span class="text-sm font-normal text-slate-500" style="font-family: 'Inter', sans-serif">
            {{ source.label }}
          </span>
          <span class="text-sm font-medium text-slate-700" style="font-family: 'Inter', sans-serif">
            {{ source.percent }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Chart from 'primevue/chart'
import { ref, onMounted } from 'vue';
const chartData = ref(null)
onMounted(async () => {

   const res = await fetch("http://127.0.0.1:8000/dashboard/analytics")

   const data = await res.json()

   chartData.value = {
      labels:data.labels,
      datasets:[
         {
            label:"Page Views",
            data:data.page_views
         },
         {
            label:"Unique Visitors",
            data:data.unique_visitors
         }
      ]
   }

   acquisitionSources.value = data.sources
})
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: {
      position: 'top',
      align: 'center',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 8,
        boxHeight: 8,
        color: '#94a3b8',
        padding: 24,
        font: { size: 12, weight: '400', family: 'Inter, sans-serif' },
      },
    },
    tooltip: {
      backgroundColor: '#1e293b',
      padding: 10,
      cornerRadius: 8,
      titleFont: { family: 'Inter, sans-serif', size: 12, weight: '400' },
      bodyFont: { family: 'Inter, sans-serif', size: 12, weight: '400' },
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(0,0,0,0.04)' },
      border: { display: false },
      ticks: {
        color: '#cbd5e1',
        font: { size: 11, weight: '400', family: 'Inter, sans-serif' },
      },
    },
    y: {
      min: 20,
      max: 1000,
      grid: { color: 'rgba(0,0,0,0.04)' },
      border: { display: false },
      ticks: {
        color: '#cbd5e1',
        stepSize: 200,
        font: { size: 11, weight: '400', family: 'Inter, sans-serif' },
      },
    },
  },
}
const acquisitionSources = [
  { label: 'Google Search (Organic)', percent: 48 },
  { label: 'Direct Access', percent: 29 },
  { label: 'LinkedIn', percent: 14 },
  { label: 'GitHub', percent: 6 },
  { label: 'Twitter', percent: 3 },
]
const acquisitionChartData = {
  labels: ['Google', 'Direct', 'LinkedIn', 'GitHub', 'Twitter'],
  datasets: [
    {
      data: [48, 29, 14, 6, 3],
      backgroundColor: '#0f172a',
      borderRadius: 6,
      borderSkipped: false,
      barThickness: 18,
    },
  ],
}
const acquisitionChartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0f172a',
      padding: 8,
      cornerRadius: 6,
      titleFont: { family: 'Inter, sans-serif', weight: '400' },
      bodyFont: { family: 'Inter, sans-serif', weight: '400' },
      callbacks: { label: (ctx) => `${ctx.raw}%` },
    },
  },
  scales: {
    x: {
      display: false,
      grid: { display: false },
      border: { display: false },
      max: 60,
    },
    y: {
      grid: { display: false },
      border: { display: false },
      ticks: {
        color: '#94a3b8',
        font: { size: 11, weight: '400', family: 'Inter, sans-serif' },
      },
    },
  },
}
</script>