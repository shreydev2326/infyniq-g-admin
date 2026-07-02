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
          class="flex items-center gap-2 bg-[#4A6FA5] hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
          <i class="pi pi-send" style="font-size:11px;"></i>
          Publish
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-[340px_minmax(0,1fr)] gap-4 items-start">
      <div class="flex flex-col gap-3">
        <div class="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div class="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
            <span class="text-xs font-bold text-slate-700">Page Sections</span>
          </div>
          <div class="p-2 flex flex-row xl:flex-col gap-1 overflow-x-auto xl:overflow-x-visible">
            <button
              v-for="sec in sections"
              :key="sec.key"
              @click="activeSection = sec.key"
              class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors text-left whitespace-nowrap xl:w-full flex-shrink-0 xl:flex-shrink"
              :class="activeSection === sec.key
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-50'" >
              <i :class="`pi ${sec.icon}`" style="font-size:12px;"></i>
              {{ sec.label }}
              <span
                v-if="isDirty(sec.key)"
                class="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"
              ></span>
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
          <div class="p-3 flex flex-col gap-3">
            <template v-if="activeSection === 'hero'">
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Headline</label>
                <input v-model="content.hero.headline" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Sub-headline</label>
                <textarea v-model="content.hero.subheadline" rows="2" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors resize-none"></textarea>
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">CTA Button Text</label>
                <input v-model="content.hero.cta" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Secondary CTA</label>
                <input v-model="content.hero.cta2" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Badge Text</label>
                <input v-model="content.hero.badge" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
            </template>
            <template v-if="activeSection === 'about'">
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Section Title</label>
                <input v-model="content.about.title" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Description</label>
                <textarea v-model="content.about.desc" rows="4" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors resize-none"></textarea>
              </div>
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
            </template>
            <template v-if="activeSection === 'services'">
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Section Title</label>
                <input v-model="content.services.title" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Subtitle</label>
                <input v-model="content.services.subtitle" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
              <div v-for="(svc, i) in content.services.items" :key="i" class="border border-slate-100 rounded-lg p-2.5">
                <div class="text-xs font-bold text-slate-500 mb-2">Service {{ i + 1 }}</div>
                <input v-model="svc.name" placeholder="Service name" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-slate-400 mb-1.5 transition-colors" />
                <textarea v-model="svc.desc" placeholder="Description" rows="2" class="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-slate-400 resize-none transition-colors"></textarea>
              </div>
            </template>
            <template v-if="activeSection === 'contact'">
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Section Title</label>
                <input v-model="content.contact.title" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Subtitle</label>
                <input v-model="content.contact.subtitle" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Email</label>
                <input v-model="content.contact.email" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Phone</label>
                <input v-model="content.contact.phone" type="text" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 transition-colors" />
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 mb-1 block">Address</label>
                <textarea v-model="content.contact.address" rows="2" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 resize-none transition-colors"></textarea>
              </div>
            </template>
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
      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
        <div class="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50">
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-full bg-red-400"></span>
            <span class="w-3 h-3 rounded-full bg-amber-400"></span>
            <span class="w-3 h-3 rounded-full bg-green-400"></span>
          </div>
          <div class="flex-1 min-w-0 bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <i class="pi pi-lock text-slate-400 flex-shrink-0" style="font-size:10px;"></i>
            <span class="text-xs text-slate-500 truncate">https://www.startx-consultancy.com/</span>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              @click="previewDevice = 'desktop'"
              class="w-7 h-7 flex items-center justify-center rounded-lg border transition-colors"
              :class="previewDevice === 'desktop' ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200 text-slate-400 hover:bg-slate-100'">
              <i class="pi pi-desktop" style="font-size:11px;"></i>
            </button>
            <button
              @click="previewDevice = 'mobile'"
              class="w-7 h-7 flex items-center justify-center rounded-lg border transition-colors"
              :class="previewDevice === 'mobile' ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200 text-slate-400 hover:bg-slate-100'">
              <i class="pi pi-mobile" style="font-size:11px;"></i>
            </button>
            <span class="text-xs text-green-500 font-semibold flex items-center gap-1 ml-1">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
              Live Preview
            </span>
          </div>
        </div>
        <div class="flex-1 bg-slate-200 p-4 flex justify-center items-start" style="min-height: 650px;">
          <div
            class="bg-white transition-all duration-300 overflow-hidden"
            :class="previewDevice === 'mobile'
              ? 'w-[320px] border-8 border-slate-800 rounded-[2rem] shadow-xl'
              : 'w-full rounded-lg shadow-sm'"
            :style="previewDevice === 'mobile' ? 'height: 500px;' : 'height: 620px;'">
            <iframe
              src="https://www.startx-consultancy.com/"
              class="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
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
import { ref, reactive, computed } from 'vue'
const toast = reactive({ show: false, message: '', bgClass: 'bg-slate-800', icon: 'pi-check-circle' })
function showToast(message, bgClass = 'bg-slate-800', icon = 'pi-check-circle') {
  toast.message = message; toast.bgClass = bgClass; toast.icon = icon; toast.show = true
  setTimeout(() => { toast.show = false }, 2800)
}
const activeSection = ref('hero')
const previewDevice = ref('desktop')
const sections = [
  { key: 'hero',     label: 'Hero / Banner',  icon: 'pi-home'        },
  { key: 'about',    label: 'About Us',       icon: 'pi-info-circle' },
  { key: 'services', label: 'Services',       icon: 'pi-th-large'    },
  { key: 'contact',  label: 'Contact Info',   icon: 'pi-envelope'    },
  { key: 'footer',   label: 'Footer',         icon: 'pi-bars'        },
]
const defaults = {
  hero: { headline: '', subheadline: '', cta: '', cta2: '', badge: '' },
  about: { title: '', desc: '', founded: '', team: '', projects: '' },
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
const content = reactive(JSON.parse(JSON.stringify(defaults)))
const currentSection = computed(() => sections.find(s => s.key === activeSection.value))
function isDirty(key) {
  return JSON.stringify(content[key]) !== JSON.stringify(defaults[key])
}
function publishAll() {
  showToast('Changes published to live site!', 'bg-teal-600', 'pi-send')
}
function resetAll() {
  Object.assign(content, JSON.parse(JSON.stringify(defaults)))
  showToast('All content reset to defaults.', 'bg-slate-700', 'pi-refresh')
}
</script>