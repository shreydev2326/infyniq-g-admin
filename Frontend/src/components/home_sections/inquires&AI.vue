<template>
  <div class="flex flex-col gap-4" style="font-family: 'Inter', sans-serif">
    <div class="flex-1 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div class="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-base font-medium text-slate-700">
            Latest Contact Inquiries
          </h2>
          <p class="mt-0.5 text-xs text-slate-400">
            Direct questions submitted by prospective clients.
          </p>
        </div>
        <button 
         @click="goToMails"
        class="inline-flex w-fit items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors">
          <i class="pi pi-envelope text-xs"></i>
          <span>Mail Center</span>
          <i class="pi pi-arrow-right text-xs"></i>
        </button>
      </div>
      <div>
        <div
          v-for="inquiry in contactInquiries"
          :key="inquiry.email"
          class="group flex flex-col gap-3 border-b border-slate-100 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex min-w-0 flex-1 items-start gap-3">
            <div
              :class="[
                'mt-1 h-8 w-[3px] rounded-full shrink-0',
                inquiry.status === 'UNREAD' ? 'bg-amber-400' : 'bg-emerald-400',
              ]"
            ></div>
            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500">
              {{ inquiry.name.charAt(0) }}
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="text-sm font-medium text-slate-700">
                  {{ inquiry.name }}
                </span>
                <span class="hidden font-mono text-[11px] text-slate-400 sm:inline">
                  {{ inquiry.email }}
                </span>
              </div>
              <p class="mt-0.5 text-[12px] font-medium text-slate-600">
                {{ inquiry.subject }}
              </p>
              <p class="mt-0.5 hidden truncate text-[11px] text-slate-400 sm:block">
                {{ inquiry.preview }}
              </p>
            </div>
          </div>
          <div class="flex w-full items-center justify-between sm:ml-4 sm:w-auto sm:justify-end sm:gap-3">
            <span
              :class="[
                'rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide',
                inquiry.status === 'UNREAD'
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-emerald-50 text-emerald-600', ]">
              {{ inquiry.status }}
            </span>
            <span class="hidden text-[11px] text-slate-400 sm:inline">
              {{ inquiry.time }}
            </span>
            <button class="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-slate-100">
              <i class="pi pi-arrow-up-right text-xs text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5"></i>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMails = () => {
  router.push('/mails')
}
const contactInquiries = [
  {
    name: 'Dr. Arthur Pendelton',
    email: 'arthur.p@healthpulse.org',
    subject: 'Informative Portal for Medical Diagnostics Firm',
    preview: 'Hello, we are launching an informative clinical research hub. We need a secure dynamic portal capable of handling patient-facing content and internal resources.',
    status: 'UNREAD',
    time: '2h ago',
  },
  {
    name: 'Sarah Jenkins',
    email: 'sarah@greenharvest.co',
    subject: 'Sustainable Supply Chain Showcase',
    preview: 'We want to design a responsive website to showcase our sustainability initiatives and global supply chain stories.',
    status: 'READ',
    time: '1d ago',
  },
]
</script>