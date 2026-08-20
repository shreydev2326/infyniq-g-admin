<template>
  <div class="min-h-screen bg-slate-100 p-4 font-sans">
    <div class="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 mb-4">
      <div>
        <h1 class="text-base tracking-tight font-medium text-slate-700" style="font-family: 'Inter', sans-serif">Website Content</h1>
        <p class="text-xs text-slate-400 mt-0.5">Update dynamic copy, services, and team information on the frontend instantly.</p>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="resetAll"
          class="flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-colors">
          <i class="pi pi-refresh" style="font-size:11px;"></i>
          Reset
        </button>
        <button
          @click="publishAll"
          :disabled="publishing"
          class="flex items-center gap-2 bg-[#4A6FA5] hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
          <i :class="`pi ${publishing ? 'pi-spin pi-spinner' : 'pi-send'}`" style="font-size:11px;"></i>
          {{ publishing ? 'Publishing…' : 'Publish' }}
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-4 items-start">
      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden lg:sticky lg:top-4">
        <div class="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
          <span class="text-xs font-bold text-slate-700">Page Sections</span>
        </div>
        <div class="p-2 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
          <button
            v-for="sec in sections"
            :key="sec.key"
            @click="activeSection = sec.key"
            class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors text-left whitespace-nowrap lg:w-full shrink-0 lg:shrink"
            :class="activeSection === sec.key
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-50'" >
            <i :class="`pi ${sec.icon}`" style="font-size:12px;"></i>
            {{ sec.label }}
          </button>
        </div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div class="px-4 py-2.5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-700">{{ currentSection.label }}</span>
          <span v-if="isDirty(activeSection)" class="text-xs font-semibold text-amber-500 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
            Unsaved
          </span>
        </div>
        <div class="p-4 flex flex-col gap-3 max-w-3xl">
<!-- ================= HERO ================= -->
<template v-if="activeSection === 'hero'">
  <div class="space-y-3">

    <div class="rounded-xl border border-slate-200 bg-white p-4">
      <div class="mb-3">
        <div class="text-xs font-bold text-slate-700">
          Announcement
        </div>
      </div>

      <input
        v-model="content.hero.announcement"
        type="text"
        placeholder="Now serving 50+ brands worldwide"
        class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-slate-400"
      />
    </div>


    <div class="rounded-xl border border-slate-200 bg-white p-4">
      <div class="mb-3">
        <div class="text-xs font-bold text-slate-700">
          Main Message
        </div>
      </div>

      <div class="space-y-3">

        <div>
          <label class="mb-1.5 block text-xs font-semibold text-slate-500">
            Headline
          </label>

          <textarea
            v-model="content.hero.headline"
            rows="3"
            placeholder="Build a brand people can't stop talking about."
            class="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-xs leading-5 text-slate-800 outline-none transition focus:border-slate-400"
          ></textarea>
        </div>

        <div>
          <label class="mb-1.5 block text-xs font-semibold text-slate-500">
            Supporting Text
          </label>

          <textarea
            v-model="content.hero.description"
            rows="3"
            placeholder="We create thoughtful digital experiences that help ambitious businesses grow."
            class="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-xs leading-5 text-slate-800 outline-none transition focus:border-slate-400"
          ></textarea>
        </div>

      </div>
    </div>
    <div class="rounded-xl border border-slate-200 bg-white p-4">
      <div class="mb-3">
        <div class="text-xs font-bold text-slate-700">
          Call to Action
        </div>
      </div>

      <div class="space-y-3">

        <!-- Primary CTA -->
        <div class="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <div class="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
            Primary Button
          </div>

          <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">

            <input
              v-model="content.hero.primaryCta.text"
              type="text"
              placeholder="Start a project"
              class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-slate-400"
            />

            <input
              v-model="content.hero.primaryCta.link"
              type="text"
              placeholder="/contact"
              class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-slate-400"
            />

          </div>
        </div>

        <!-- Secondary CTA -->
        <div class="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <div class="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
            Secondary Button
          </div>

          <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">

            <input
              v-model="content.hero.secondaryCta.text"
              type="text"
              placeholder="View our work"
              class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-slate-400"
            />

            <input
              v-model="content.hero.secondaryCta.link"
              type="text"
              placeholder="/work"
              class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-slate-400"
            />

          </div>
        </div>

      </div>
    </div>
    <div class="rounded-xl border border-slate-200 bg-white p-4">
      <div class="mb-3">
        <div class="text-xs font-bold text-slate-700">
          Hero Media
        </div>
      </div>

      <div class="space-y-3">

        <!-- Image -->
        <div>
          <label class="mb-1.5 block text-xs font-semibold text-slate-500">
            Image
          </label>

          <input
            v-model="content.hero.media.image"
            type="text"
            placeholder="https://example.com/hero.jpg"
            class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-slate-400"
          />
        </div>

        <!-- Video -->
        <div>
          <label class="mb-1.5 block text-xs font-semibold text-slate-500">
            Video
          </label>

          <input
            v-model="content.hero.media.video"
            type="text"
            placeholder="Optional video URL"
            class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-slate-400"
          />
        </div>

        <!-- Alt -->
        <div>
          <label class="mb-1.5 block text-xs font-semibold text-slate-500">
            Image Description
          </label>

          <input
            v-model="content.hero.media.alt"
            type="text"
            placeholder="A modern workspace with a creative team"
            class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-slate-400"
          />
        </div>

      </div>
    </div>
    <div class="rounded-xl border border-slate-200 bg-white p-4">
      <div class="mb-3">
        <div class="text-xs font-bold text-slate-700">
          Social Proof
        </div>
      </div>

      <div class="space-y-3">

        <div>
          <label class="mb-1.5 block text-xs font-semibold text-slate-500">
            Trust Statement
          </label>

          <input
            v-model="content.hero.socialProof.text"
            type="text"
            placeholder="Trusted by 200+ businesses worldwide"
            class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-slate-400"
          />
        </div>

        <div>
          <label class="mb-1.5 block text-xs font-semibold text-slate-500">
            Client / Company Name
          </label>

          <input
            v-model="content.hero.socialProof.client"
            type="text"
            placeholder="Featured by Acme, Nike, and more"
            class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-slate-400"
          />
        </div>

        <div>
          <label class="mb-1.5 block text-xs font-semibold text-slate-500">
            Client Logo
          </label>

          <input
            v-model="content.hero.socialProof.logo"
            type="text"
            placeholder="https://example.com/logo.svg"
            class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-slate-400"
          />
        </div>

      </div>
    </div>
    <div class="rounded-xl border border-slate-200 bg-white p-4">
      <div class="mb-3">
        <div class="text-xs font-bold text-slate-700">
          Background
        </div>
      </div>

      <div class="space-y-3">

        <!-- Color -->
        <div>
          <label class="mb-1.5 block text-xs font-semibold text-slate-500">
            Background Color
          </label>

          <div class="flex gap-2">

            <input
              v-model="content.hero.background.color"
              type="color"
              class="h-[38px] w-[44px] cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
            />

            <input
              v-model="content.hero.background.color"
              type="text"
              placeholder="#F5F1E5"
              class="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-slate-400"
            />

          </div>
        </div>

        <!-- Image -->
        <div>
          <label class="mb-1.5 block text-xs font-semibold text-slate-500">
            Background Image
          </label>

          <input
            v-model="content.hero.background.image"
            type="text"
            placeholder="Optional background image URL"
            class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-slate-400"
          />
        </div>

      </div>
    </div>

  </div>
</template>

          <!-- ================= ABOUT ================= -->
          <template v-if="activeSection === 'about'">

            <!-- Overview -->
            <div class="border border-slate-100 rounded-lg p-3">
              <div class="flex items-center gap-1.5 mb-2.5">
                <i class="pi pi-info-circle text-slate-400" style="font-size:11px;"></i>
                <span class="text-xs font-bold text-slate-500">Overview</span>
              </div>
              <div class="flex flex-col gap-2.5">
                <div>
                  <label class="text-xs font-semibold text-slate-500 mb-1 block">Section Title</label>
                  <input v-model="content.about.title" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
                </div>
                <div>
                  <label class="text-xs font-semibold text-slate-500 mb-1 block">Description</label>
                  <textarea v-model="content.about.desc" rows="4" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors resize-none"></textarea>
                </div>
                <div>
                  <label class="text-xs font-semibold text-slate-500 mb-1 block">About Image URL</label>
                  <input v-model="content.about.image" type="text" placeholder="https://…" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
                </div>
              </div>
            </div>

            <!-- Company Stats -->
            <div class="border border-slate-100 rounded-lg p-3">
              <div class="flex items-center gap-1.5 mb-2.5">
                <i class="pi pi-chart-bar text-slate-400" style="font-size:11px;"></i>
                <span class="text-xs font-bold text-slate-500">Company Stats</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="text-xs font-semibold text-slate-500 mb-1 block">Founded Year</label>
                  <input v-model="content.about.founded" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
                </div>
                <div>
                  <label class="text-xs font-semibold text-slate-500 mb-1 block">Team Size</label>
                  <input v-model="content.about.team" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
                </div>
                <div>
                  <label class="text-xs font-semibold text-slate-500 mb-1 block">Projects Delivered</label>
                  <input v-model="content.about.projects" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
                </div>
              </div>
            </div>

            <!-- Mission & Vision -->
            <div class="border border-slate-100 rounded-lg p-3">
              <div class="flex items-center gap-1.5 mb-2.5">
                <i class="pi pi-compass text-slate-400" style="font-size:11px;"></i>
                <span class="text-xs font-bold text-slate-500">Mission & Vision</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-semibold text-slate-500 mb-1 block">Mission Statement</label>
                  <textarea v-model="content.about.mission" rows="3" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors resize-none"></textarea>
                </div>
                <div>
                  <label class="text-xs font-semibold text-slate-500 mb-1 block">Vision Statement</label>
                  <textarea v-model="content.about.vision" rows="3" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors resize-none"></textarea>
                </div>
              </div>
            </div>

            <!-- Core Values -->
            <div class="border border-slate-100 rounded-lg p-3">
              <div class="flex items-center gap-1.5 mb-2.5">
                <i class="pi pi-heart text-slate-400" style="font-size:11px;"></i>
                <span class="text-xs font-bold text-slate-500">Core Values</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div v-for="(val, i) in content.about.values" :key="i" class="border border-slate-100 rounded-lg p-2.5">
                  <div class="text-xs font-bold text-slate-500 mb-2">Value {{ i + 1 }}</div>
                  <input v-model="val.title" placeholder="Value name" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-slate-400 mb-1.5 transition-colors" />
                  <textarea v-model="val.desc" placeholder="Description" rows="2" class="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-slate-400 resize-none transition-colors"></textarea>
                </div>
              </div>
            </div>
          </template>

          <!-- ================= SERVICES ================= -->
          <template v-if="activeSection === 'services'">
            <div>
              <label class="text-xs font-semibold text-slate-500 mb-1 block">Section Title</label>
              <input v-model="content.services.title" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-500 mb-1 block">Subtitle</label>
              <input v-model="content.services.subtitle" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div v-for="(svc, i) in content.services.items" :key="i" class="border border-slate-100 rounded-lg p-2.5">
                <div class="text-xs font-bold text-slate-500 mb-2">Service {{ i + 1 }}</div>
                <input v-model="svc.name" placeholder="Service name" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-slate-400 mb-1.5 transition-colors" />
                <textarea v-model="svc.desc" placeholder="Description" rows="2" class="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-slate-400 resize-none transition-colors"></textarea>
              </div>
            </div>
          </template>

          <!-- ================= CONTACT ================= -->
          <template v-if="activeSection === 'contact'">
            <div>
              <label class="text-xs font-semibold text-slate-500 mb-1 block">Section Title</label>
              <input v-model="content.contact.title" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-500 mb-1 block">Subtitle</label>
              <input v-model="content.contact.subtitle" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Email</label>
                <input v-model="content.contact.email" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Phone</label>
                <input v-model="content.contact.phone" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-500 mb-1 block">Address</label>
              <textarea v-model="content.contact.address" rows="2" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 resize-none transition-colors"></textarea>
            </div>
          </template>

          <!-- ================= FOOTER ================= -->
          <template v-if="activeSection === 'footer'">
            <div>
              <label class="text-xs font-semibold text-slate-500 mb-1 block">Company Name</label>
              <input v-model="content.footer.company" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-500 mb-1 block">Tagline</label>
              <input v-model="content.footer.tagline" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-500 mb-1 block">Copyright Text</label>
              <input v-model="content.footer.copyright" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
            </div>
          </template>
        </div>
      </div>
    </div>
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="opacity-0 translate-y-1">
      <div
        v-if="toast.show"
        class="fixed bottom-5 right-5 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white z-50"
        :class="toast.bgClass">
        <i :class="`pi ${toast.icon}`" style="font-size:12px;"></i>
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'

const toast = reactive({ show: false, message: '', bgClass: 'bg-slate-800', icon: 'pi-check-circle' })
function showToast(message, bgClass = 'bg-slate-800', icon = 'pi-check-circle') {
  toast.message = message; toast.bgClass = bgClass; toast.icon = icon; toast.show = true
  setTimeout(() => { toast.show = false }, 2800)
}

const activeSection = ref('hero')
const publishing = ref(false)

const sections = [
  { key: 'hero',     label: 'Hero / Banner',  icon: 'pi-home'        },
  { key: 'about',    label: 'About Us',       icon: 'pi-info-circle' },
  { key: 'services', label: 'Services',       icon: 'pi-th-large'    },
  { key: 'contact',  label: 'Contact Info',   icon: 'pi-envelope'    },
  { key: 'footer',   label: 'Footer',         icon: 'pi-bars'        },
]
const endpoints = {
  hero:     { get: 'backend.api.get_hero',     update: 'backend.api.update_hero'     },
  about:    { get: 'backend.api.get_about',    update: 'backend.api.update_about'    },
  services: { get: 'backend.api.get_services', update: 'backend.api.update_services' },
  contact:  { get: 'backend.api.get_contact',  update: 'backend.api.update_contact'  },
  footer:   { get: 'backend.api.get_footer',   update: 'backend.api.update_footer'   },
}

const blank = {
  hero: {
  announcement: 'New collection available',

  headline: 'Spaces designed for the way you live.',

  description:
    'Thoughtfully crafted furniture and interiors that bring comfort, character, and timeless design into every space.',

  primaryCta: {
    text: 'Explore collection',
    link: '/collection',
  },

  secondaryCta: {
    text: 'Discover our story',
    link: '/about',
  },

  media: {
    image: '/images/hero.jpg',
    video: '',
    alt: 'Beautiful contemporary living space',
  },

  socialProof: {
    text: 'Trusted by homeowners and designers worldwide',
    client: 'Featured in Architectural Digest',
    logo: '/images/client-logo.svg',
  },

  background: {
    color: '#F5F1E5',
    image: '',
  },
},
  about: {
    title: '', desc: '', image: '',
    founded: '', team: '', projects: '',
    mission: '', vision: '',
    values: [
      { title: '', desc: '' },
      { title: '', desc: '' },
      { title: '', desc: '' },
    ],
  },
  services: {
    title: '', subtitle: '',
    items: [
      { name: '', desc: '' },
      { name: '', desc: '' },
      { name: '', desc: '' },
      { name: '', desc: '' },
      { name: '', desc: '' },
      { name: '', desc: '' },
    ],
  },
  contact: { title: '', subtitle: '', email: '', phone: '', address: '' },
  footer: { company: '', tagline: '', copyright: '' },
}
const content = reactive(JSON.parse(JSON.stringify(blank)))
const initial = reactive(JSON.parse(JSON.stringify(blank)))

const currentSection = computed(() => sections.find(s => s.key === activeSection.value))

function isDirty(key) {
  return JSON.stringify(content[key]) !== JSON.stringify(initial[key])
}

function resetAll() {
  Object.assign(content, JSON.parse(JSON.stringify(initial)))
  showToast('All content reset to last saved version.', 'bg-slate-700', 'pi-refresh')
}

async function loadSection(key) {
  try {
    const { data } = await axios.get(`/api/method/${endpoints[key].get}`)
    if (data && data.message) {
      Object.assign(content[key], data.message)
      initial[key] = JSON.parse(JSON.stringify(content[key]))
    }
  } catch (err) {
    console.error(`Failed to load ${key} content:`, err)
  }
}

async function loadAll() {
  await Promise.allSettled(sections.map(sec => loadSection(sec.key)))
}

async function publishSection(key) {
  await axios.post(`/api/method/${endpoints[key].update}`, content[key])
  initial[key] = JSON.parse(JSON.stringify(content[key]))
}

async function publishAll() {
  const dirtyKeys = sections.map(s => s.key).filter(isDirty)
  if (dirtyKeys.length === 0) {
    showToast('Nothing to publish — no changes made.', 'bg-slate-700', 'pi-info-circle')
    return
  }
  publishing.value = true
  try {
    await Promise.all(dirtyKeys.map(publishSection))
    showToast(`Published ${dirtyKeys.length} section${dirtyKeys.length > 1 ? 's' : ''} successfully.`, 'bg-emerald-600', 'pi-check-circle')
  } catch (err) {
    console.error('Failed to publish content:', err)
    showToast('Publish failed. Please try again.', 'bg-red-500', 'pi-times-circle')
  } finally {
    publishing.value = false
  }
}

onMounted(() => {
  loadAll()
})
</script>