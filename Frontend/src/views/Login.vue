<template>
  <div class="min-h-screen w-full bg-ink text-fog font-body grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] bg-teal-50
  ">
    <div class="relative hidden lg:flex flex-col justify-between overflow-hidden bg-panel pl-42 pr-14 py-12">
      <div class="absolute inset-0 grid-field pointer-events-none"></div>
      <div class="absolute -top-24 -left-16 w-96 h-96 rounded-full bg-accent/20 blur-3xl orb"></div>
      <div class="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent2/10 blur-3xl orb orb-delay"></div>
      <div class="relative z-10 flex items-center gap-4 rise d1">
        <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-accent2 flex items-center justify-center shadow-glow">
          <i class="pi pi-chart-line text-ink text-sm"></i>
        </div>
        <span class="font-display font-semibold text-lg tracking-tight">StartX Consultancy</span>
      </div>
      <div class="relative z-10 max-w-md">
        <h1 class="rise d2 font-display text-4xl leading-tight font-semibold tracking-tight">
          Every metric that<br />matters, in one view.
        </h1>
        <p class="rise d3 mt-4 text-mute text-sm leading-relaxed">
          StartX brings your revenue, ops, and customer data together —
          live, accurate, and built for teams that move fast.
        </p>
      </div>
      <div class="relative z-10 h-40">
         <div class="float-1 absolute left-0 bottom-4 w-56 rounded-xl bg-surface/80 backdrop-blur border border-line px-5 py-4 shadow-card">
          <p class="text-xs text-mute">Monthly revenue</p>
          <div class="flex items-end justify-between mt-1">
            <span class="font-display text-lg font-semibold">$84.2k</span>
            <span class="text-accent2 text-xs font-medium flex items-center gap-1">
              <i class="pi pi-arrow-up-right text-[10px]"></i> 12.4%
            </span>
          </div>
        </div>
<div class="float-2 absolute left-52 bottom-32 w-52 rounded-xl bg-surface/80 backdrop-blur border border-line px-5 py-4 shadow-card">
          <p class="text-xs text-mute">Active sessions</p>
          <svg viewBox="0 0 100 30" class="w-full h-6 mt-1">
            <polyline class="sparkline" points="0,25 15,20 30,22 45,10 60,14 75,4 100,8"
              fill="none" stroke="#3FE0C5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
         <div class="float-3 absolute left-24 bottom-18 w-48 rounded-xl bg-surface/80 backdrop-blur border border-line px-5 py-4 shadow-card">
          <p class="text-xs text-mute">Uptime</p>
          <span class="font-display text-lg font-semibold text-accent2">99.98%</span>
        </div>
      </div>
      <p>@ Powered by Infiniq Solutions</p>
    </div>
    <div class="relative flex items-center justify-center px-6 py-12 sm:px-10 bg-ink">
      <div class="w-full max-w-sm">
        <div class="lg:hidden flex items-center gap-3 mb-10 rise d1">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-accent2 flex items-center justify-center">
            <i class="pi pi-chart-line text-ink text-sm"></i>
          </div>
          <span class="font-display font-semibold text-lg tracking-tight">StartX Consultancy</span>
        </div>
        <div class="rise d2">
          <h2 class="font-display text-2xl font-semibold tracking-tight">Welcome back</h2>
          <p class="mt-2 text-sm text-mute">Log in to your workspace to continue.</p>
        </div>
        <form class="mt-8 space-y-5" novalidate @submit.prevent="handleSubmit">
          <div class="rise d3">
            <label for="username" class="block text-xs font-medium text-mute mb-1.5">Username</label>
            <div class="relative">
              <i class="pi pi-user absolute left-3.5 top-1/2 -translate-y-1/2 text-mute text-sm"></i>
              <input
                id="username"
                v-model="form.username"
                type="text"
                autocomplete="username"
                placeholder="Username"
                class="w-full rounded-lg bg-surface border pl-10 pr-3 py-2.5 text-sm text-fog placeholder:text-mute/60
                       outline-none transition duration-200 focus:ring-2 focus:ring-accent/50 focus:border-accent"
                :class="submitted && errors.username ? 'border-red-500/70' : 'border-line'"
                @blur="validateField('username')"
              />
            </div>
            <p v-if="submitted && errors.username" class="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <i class="pi pi-user text-[11px]"></i>{{ errors.username }}
            </p>
          </div>
          <div class="rise d4">
            <div class="flex items-center justify-between mb-1.5">
              <label for="password" class="block text-xs font-medium text-mute">Password</label>
              <a href="#" class="text-xs text-accent hover:text-accent2 transition-colors">Forgot password?</a>
            </div>
            <div class="relative">
              <i class="pi pi-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-mute text-sm"></i>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="••••••••"
                class="w-full rounded-lg bg-surface border pl-10 pr-10 py-2.5 text-sm text-fog placeholder:text-mute/60
                       outline-none transition duration-200 focus:ring-2 focus:ring-accent/50 focus:border-accent"
                :class="submitted && errors.password ? 'border-red-500/70' : 'border-line'"
                @blur="validateField('password')"
              />
              <button
                type="button"
                tabindex="-1"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-mute hover:text-fog transition-colors"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" class="text-sm"></i>
              </button>
            </div>
            <p v-if="submitted && errors.password" class="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <i class="pi pi-exclamation-circle text-[11px]"></i>{{ errors.password }}
            </p>
          </div>
          <div class="rise d5 flex items-center gap-2">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="w-4 h-4 rounded border-line bg-surface accent-accent cursor-pointer"
            />
            <label for="remember" class="text-sm text-mute cursor-pointer select-none">Keep me signed in</label>
          </div>
          <button
  type="submit"
  :disabled="loading"
  class="rise d6 w-full flex items-center justify-center gap-2 rounded-full
         bg-slate-800 py-3 text-sm font-semibold text-white
         transition-all duration-300
         hover:bg-slate-700 hover:shadow-lg
         active:scale-95
         disabled:opacity-70 disabled:cursor-not-allowed"
>
  <i v-if="loading" class="pi pi-spin pi-spinner text-sm"></i>
  <span>{{ loading ? 'Logging in...' : 'Log In' }}</span>
  <i v-if="!loading" class="pi pi-arrow-right text-xs"></i>
</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
const form = reactive({
  username: '',
  password: '',
  remember: false,
})
const errors = reactive({ username: '', password: '' })
const submitted = ref(false)
const showPassword = ref(false)
const loading = ref(false)
function validateField(field) {
  if (field === 'username') {
    errors.username = form.username.length === 0
      ? 'Enter your username.'
      : ''
  }
  if (field === 'password') {
    errors.password = form.password.length === 0
      ? 'Enter your password.'
      : (form.password.length < 6 ? 'Password must be at least 6 characters.' : '')
  }
}
function validateForm() {
  validateField('username')
  validateField('password')
  return !errors.username && !errors.password
}
const fakeUsers = [
  {username: 'admin',password: 'admin123',role: 'admin'},
  {username: 'mayank',password: '123456',role: 'employee'},
  {username: 'shrey', password: 'shrey123',role: 'developer' }
]
const emit = defineEmits(['login']) 
function handleSubmit() {
  submitted.value = true

  if (!validateForm()) return

  loading.value = true

  setTimeout(() => {
    loading.value = false

    router.push('/')
  }, 1000)
}
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<style scoped>
@keyframes drift {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(20px, -24px) scale(1.06); }
  100% { transform: translate(0, 0) scale(1); }
}
.orb { animation: drift 14s ease-in-out infinite; }
.orb-delay { animation-delay: -6s; }
@keyframes float {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
.float-1 { animation: float 6s ease-in-out infinite; }
.float-2 { animation: float 7s ease-in-out infinite; animation-delay: -2.2s; }
.float-3 { animation: float 5.5s ease-in-out infinite; animation-delay: -4s; }
@keyframes rise {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
.rise { animation: rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
.d1 { animation-delay: 0.05s; }
.d2 { animation-delay: 0.12s; }
.d3 { animation-delay: 0.19s; }
.d4 { animation-delay: 0.26s; }
.d5 { animation-delay: 0.33s; }
.d6 { animation-delay: 0.40s; }
.d7 { animation-delay: 0.47s; }
.grid-field {
  background-image: radial-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: radial-gradient(ellipse 80% 70% at 40% 40%, black 40%, transparent 85%);
}
.sparkline {
  stroke-dasharray: 140;
  stroke-dashoffset: 140;
  animation: draw 1.8s ease-out forwards;
}
@keyframes draw {
  to { stroke-dashoffset: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .orb, .float-1, .float-2, .float-3, .rise, .sparkline {
    animation: none !important;
  }
}
</style>