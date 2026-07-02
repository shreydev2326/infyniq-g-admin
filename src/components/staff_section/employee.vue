<template>
  <div class="min-h-screen bg-[#f4f5f7] p-3 sm:p-4 font-sans">

    <div class="bg-white border border-slate-200 rounded-xl px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3">
      <div class="w-full sm:w-auto">
        <h1 class="text-base tracking-tight font-medium text-slate-700" style="font-family: 'Inter', sans-serif">Employee Directory</h1>
        <p class="text-xs text-slate-400 mt-0.5">Configure client staff levels, access privileges and account states.</p>
      </div>
      <button
        @click="showToast('Provisioning new access ID…', 'bg-slate-900', 'pi-user-plus')"
        class="flex items-center justify-center sm:justify-start gap-2 bg-[#4A6FA5] hover:bg-[#112740] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap w-full sm:w-auto"
      >
        <i class="pi pi-user-plus" style="font-size:11px;"></i>
        Provision Access ID
      </button>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
      <div v-for="stat in stats" :key="stat.label" class="bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-3">
        <div class="flex items-center gap-1.5 mb-1.5">
          <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :class="stat.dotClass"></span>
          <span class="text-xs font-semibold text-slate-500 truncate">{{ stat.label }}</span>
        </div>
        <div class="text-lg font-bold leading-none" :class="stat.valueClass">{{ stat.value }}</div>
        <div class="text-xs text-slate-400 mt-1 truncate">{{ stat.sub }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">

      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div class="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 bg-slate-50">
          <span class="w-2 h-2 rounded-full bg-slate-900 flex-shrink-0"></span>
          <span class="text-xs font-bold text-slate-700">Super Administrators</span>
          <span class="ml-auto text-xs font-semibold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{{ superAdmins.length }}</span>
        </div>
        <div class="p-2.5 flex flex-col gap-2">
          <div
            v-for="emp in superAdmins"
            :key="emp.id"
            class="border border-slate-100 rounded-lg p-3 hover:border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <div class="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-2.5">
              <img :src="emp.avatar" :alt="emp.name" class="w-8 h-8 rounded-full object-cover flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="text-xs font-bold text-slate-900 truncate">{{ emp.name }}</div>
                <div class="text-xs text-slate-400 truncate">{{ emp.email }}</div>
              </div>
              <span
                class="text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 mt-2 sm:mt-0"
                :class="emp.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-500 border-red-200'"
              >
                <span class="inline-block w-1.5 h-1.5 rounded-full mr-0.5 align-middle" :class="emp.status === 'Active' ? 'bg-green-500' : 'bg-red-400'"></span>
                {{ emp.status }}
              </span>
            </div>
            <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
              <span class="inline-flex items-center gap-1 bg-slate-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                <i class="pi pi-shield" style="font-size:9px;"></i>
                SUPER ADMIN
              </span>
              <span v-if="emp.currentSession" class="text-xs font-semibold text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">LIVE</span>
              <span v-else class="text-xs text-slate-400">{{ emp.date }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div class="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 bg-slate-50">
          <span class="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0"></span>
          <span class="text-xs font-bold text-slate-700">Editors / Employees</span>
          <span class="ml-auto text-xs font-semibold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{{ editors.length }}</span>
        </div>
        <div class="p-2.5 flex flex-col gap-2">
          <div
            v-for="emp in editors"
            :key="emp.id"
            class="border border-slate-100 rounded-lg p-3 hover:border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <div class="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-2.5">
              <img :src="emp.avatar" :alt="emp.name" class="w-8 h-8 rounded-full object-cover flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="text-xs font-bold text-slate-900 truncate">{{ emp.name }}</div>
                <div class="text-xs text-slate-400 truncate">{{ emp.email }}</div>
              </div>
              <span
                class="text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 mt-2 sm:mt-0"
                :class="emp.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-500 border-red-200'"
              >
                <span class="inline-block w-1.5 h-1.5 rounded-full mr-0.5 align-middle" :class="emp.status === 'Active' ? 'bg-green-500' : 'bg-red-400'"></span>
                {{ emp.status }}
              </span>
            </div>
            <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
              <span class="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full border border-slate-200">
                <i class="pi pi-shield" style="font-size:9px;"></i>
                EDITOR
              </span>
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-400">{{ emp.date }}</span>
                <button
                  @click="removeEmployee(emp.id)"
                  class="w-6 h-6 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                  :aria-label="`Remove ${emp.name}`"
                >
                  <i class="pi pi-trash" style="font-size:10px;"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div class="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 bg-slate-50">
          <span class="w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></span>
          <span class="text-xs font-bold text-slate-700">Inactive</span>
          <span class="ml-auto text-xs font-semibold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{{ inactive.length }}</span>
        </div>
        <div class="p-2.5 flex flex-col gap-2">
          <div
            v-for="emp in inactive"
            :key="emp.id"
            class="border border-slate-100 rounded-lg p-3 hover:border-slate-200 hover:bg-slate-50 transition-colors opacity-75"
          >
            <div class="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-2.5">
              <img :src="emp.avatar" :alt="emp.name" class="w-8 h-8 rounded-full object-cover flex-shrink-0 grayscale" />
              <div class="flex-1 min-w-0">
                <div class="text-xs font-bold text-slate-700 truncate">{{ emp.name }}</div>
                <div class="text-xs text-slate-400 truncate">{{ emp.email }}</div>
              </div>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full border bg-red-50 text-red-500 border-red-200 flex-shrink-0 mt-2 sm:mt-0">
                <span class="inline-block w-1.5 h-1.5 rounded-full mr-0.5 align-middle bg-red-400"></span>
                Inactive
              </span>
            </div>
            <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
              <span class="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border"
                :class="emp.role === 'super_admin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 border-slate-200'"
              >
                <i class="pi pi-shield" style="font-size:9px;"></i>
                {{ emp.role === 'super_admin' ? 'SUPER ADMIN' : 'EDITOR' }}
              </span>
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-400">{{ emp.date }}</span>
                <button
                  @click="removeEmployee(emp.id)"
                  class="w-6 h-6 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                  :aria-label="`Remove ${emp.name}`"
                >
                  <i class="pi pi-trash" style="font-size:10px;"></i>
                </button>
              </div>
            </div>
          </div>
          <div v-if="inactive.length === 0" class="text-center py-6 text-xs text-slate-400">
            No inactive accounts.
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
        class="fixed bottom-4 sm:bottom-5 right-4 sm:right-5 flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white z-50 w-[calc(100%-2rem)] sm:w-auto shadow-lg"
        :class="toast.bgClass"
      >
        <i :class="`pi ${toast.icon}`" style="font-size:12px;"></i>
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

const employees = ref([
  { id: 'u-1', name: 'Mayank Sharma',  email: 'mayank@agency.com',      role: 'super_admin', status: 'Active',   date: '10/01/2026', currentSession: true,  avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 'u-2', name: 'Jane Cooper',    email: 'jane@agency.com',        role: 'super_admin', status: 'Active',   date: '15/02/2026', currentSession: false, avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 'u-3', name: 'Riya Patel',     email: 'riya@agency.com',        role: 'super_admin', status: 'Active',   date: '20/03/2026', currentSession: false, avatar: 'https://i.pravatar.cc/150?img=44' },
  { id: 'u-4', name: 'Sarah Chen',     email: 'sarah.c@company.com',    role: 'editor',      status: 'Active',   date: '01/03/2026', currentSession: false, avatar: 'https://i.pravatar.cc/150?img=48' },
  { id: 'u-5', name: 'Priya Shah',     email: 'priya.s@company.com',    role: 'editor',      status: 'Active',   date: '05/04/2026', currentSession: false, avatar: 'https://i.pravatar.cc/150?img=49' },
  { id: 'u-6', name: 'Ankit Trivedi',  email: 'ankit.t@company.com',    role: 'editor',      status: 'Active',   date: '12/04/2026', currentSession: false, avatar: 'https://i.pravatar.cc/150?img=15' },
  { id: 'u-7', name: 'Rahul Kumar',    email: 'rahul.k@company.com',    role: 'editor',      status: 'Active',   date: '18/04/2026', currentSession: false, avatar: 'https://i.pravatar.cc/150?img=13' },
  { id: 'u-8', name: 'Alex Rivera',    email: 'alex.r@company.com',     role: 'editor',      status: 'Inactive', date: '12/04/2026', currentSession: false, avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'u-9', name: 'Tom Hughes',     email: 'tom.h@company.com',      role: 'editor',      status: 'Inactive', date: '22/01/2026', currentSession: false, avatar: 'https://i.pravatar.cc/150?img=14' },
  { id: 'u-10',name: 'Nina Walsh',     email: 'nina.w@company.com',     role: 'super_admin', status: 'Inactive', date: '08/02/2026', currentSession: false, avatar: 'https://i.pravatar.cc/150?img=45' },
])

const superAdmins = computed(() => employees.value.filter(e => e.role === 'super_admin' && e.status === 'Active'))
const editors     = computed(() => employees.value.filter(e => e.role === 'editor'      && e.status === 'Active'))
const inactive    = computed(() => employees.value.filter(e => e.status === 'Inactive'))

const stats = computed(() => [
  { label: 'Total Staff',       dotClass: 'bg-slate-700', value: employees.value.length,                                      sub: 'All roles',          valueClass: 'text-slate-900' },
  { label: 'Super Admins',      dotClass: 'bg-slate-900', value: employees.value.filter(e => e.role === 'super_admin').length, sub: 'Full access',        valueClass: 'text-slate-900' },
  { label: 'Active Accounts',   dotClass: 'bg-green-500', value: employees.value.filter(e => e.status === 'Active').length,   sub: 'Currently enabled',  valueClass: 'text-green-600' },
  { label: 'Inactive Accounts', dotClass: 'bg-red-400',   value: employees.value.filter(e => e.status === 'Inactive').length, sub: 'Access suspended',   valueClass: 'text-red-500'   },
])

function removeEmployee(id) {
  const emp = employees.value.find(e => e.id === id)
  employees.value = employees.value.filter(e => e.id !== id)
  showToast(`${emp.name} removed.`, 'bg-red-500', 'pi-trash')
}
</script>