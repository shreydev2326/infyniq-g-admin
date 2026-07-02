<template>
  <div class="min-h-screen bg-[#f4f5f7] p-3 sm:p-4 md:p-6 lg:p-8 font-sans">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4 sm:mb-6">
      <div>
        <h2 class="text-sm sm:text-base tracking-tight font-medium text-slate-700" style="font-family: 'Inter', sans-serif">Agency Products &amp; Digital Assets</h2>
        <p class="text-xs sm:text-sm text-gray-400 mt-0.5">Manage client-facing products, custom engines, and technical assets directly inline.</p>
      </div>

      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-wrap">
        <!-- Search -->
        <div class="flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 shadow-sm w-full sm:w-auto sm:min-w-[220px] md:min-w-[260px]">
          <i class="pi pi-search text-gray-300 text-xs flex-shrink-0" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, SKU, details…"
            class="flex-1 text-xs sm:text-sm text-gray-600 placeholder-gray-300 bg-transparent outline-none min-w-0 w-full" />
        </div>

        <div class="flex items-center gap-2">
          <!-- Category filter -->
          <div class="relative flex-1 sm:flex-initial">
            <button
              @click="categoryMenuOpen = !categoryMenuOpen; statusMenuOpen = false"
              class="flex items-center justify-between sm:justify-start gap-2 rounded-xl bg-white border border-gray-200 px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:scale-95 shadow-sm w-full sm:w-auto">
              <span class="truncate">Categories: {{ activeCategory === 'all' ? 'All' : activeCategory }}</span>
              <i class="pi pi-chevron-down text-[10px] text-gray-400 transition-transform duration-200 flex-shrink-0" :class="{ 'rotate-180': categoryMenuOpen }"></i>
            </button>
            <div
              v-if="categoryMenuOpen"
              class="absolute right-0 top-[calc(100%+6px)] bg-white border border-gray-100 rounded-xl shadow-lg z-50 w-44 max-w-[80vw] overflow-hidden">
              <div
                v-for="opt in categoryOptions"
                :key="opt"
                @click="activeCategory = opt; categoryMenuOpen = false; currentPage = 1"
                class="px-4 py-2.5 text-xs text-gray-600 hover:bg-[#4A6FA5]/5 hover:text-[#4A6FA5] cursor-pointer transition-all duration-150">
                {{ opt === 'all' ? 'All' : opt }}
              </div>
            </div>
          </div>

          <!-- Add Product -->
          <button
            @click="addProduct"
            :disabled="!!editingId"
            class="flex items-center justify-center gap-2 rounded-xl bg-[#4A6FA5] px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold text-white hover:bg-[#112740] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-sm flex-shrink-0">
            <i class="pi pi-plus text-[10px]"></i>
            <span class="hidden xs:inline sm:inline">Add Product</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <!-- Table header (desktop only) -->
      <div class="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 bg-gray-50/50">
        <span class="text-[10px] sm:text-xs font-semibold text-gray-400 tracking-wide uppercase">Product &amp; SKU</span>
        <span class="text-[10px] sm:text-xs font-semibold text-gray-400 tracking-wide uppercase">Category</span>
        <span class="text-[10px] sm:text-xs font-semibold text-gray-400 tracking-wide uppercase">Status</span>
        <span class="text-[10px] sm:text-xs font-semibold text-gray-400 tracking-wide uppercase text-right">Actions</span>
      </div>

      <!-- Empty state -->
      <div v-if="displayedProducts.length === 0" class="flex flex-col items-center justify-center py-12 sm:py-16 px-6 text-center">
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
          <i class="pi pi-box text-xl sm:text-2xl text-gray-300" />
        </div>
        <p class="text-sm font-semibold text-gray-400">No products found</p>
        <p class="text-xs text-gray-300 mt-1">Try adjusting your search or filters</p>
      </div>

      <!-- Rows -->
      <div v-else>
        <div
          v-for="product in displayedProducts"
          :key="product.id"
          class="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-3 md:gap-4 px-4 sm:px-5 py-4 sm:py-5 border-b border-gray-50 last:border-b-0 transition-all duration-150 items-start"
          :class="product.id === editingId ? 'bg-[#4A6FA5]/5' : 'hover:bg-gray-50/70'">
          <template v-if="product.id === editingId">
            <!-- Spans the full row width regardless of screen size -->
            <div class="col-span-1 md:col-span-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <!-- Row 1: Product name + Category -->
                <input
                  v-model="editingProduct.name"
                  type="text"
                  placeholder="Product name"
                  class="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm font-semibold text-[#1a2332] placeholder-gray-300 outline-none focus:border-[#4A6FA5] transition" />
              <Select
    v-model="editingProduct.category"
    :options="categoryOptions"
    optionLabel="label"
    optionValue="value"
    placeholder="Select Category"
    class="w-full custom-dropdown"
/>
                <!-- Row 2: SKU + Status -->
                <input
                  v-model="editingProduct.sku"
                  type="text"
                  placeholder="SKU"
                  class="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm font-mono uppercase text-gray-500 placeholder-gray-300 outline-none focus:border-[#4A6FA5] transition" />
               <Select
    v-model="editingProduct.status"
    :options="statusOptions"
    optionLabel="label"
    optionValue="value"
    placeholder="Select Status"
    class="w-full custom-dropdown"
/>

                <!-- Row 3: Description + Tags -->
                <textarea
                  v-model="editingProduct.description"
                  rows="2"
                  placeholder="Short description…"
                  class="w-full h-20 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 placeholder-gray-300 outline-none focus:border-[#4A6FA5] transition resize-none"></textarea>
                <div class="h-20 rounded-lg border border-gray-200 px-3 flex items-center focus-within:border-[#4A6FA5] transition">
                  <input
                    v-model="tagsInput"
                    type="text"
                    placeholder="Tags, comma-separated e.g. React 19, SSR"
                    class="w-full text-sm text-gray-500 placeholder-gray-300 outline-none bg-transparent" />
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-end gap-2 mt-3">
                <button
                  @click="cancelEdit"
                  class="flex items-center gap-1.5 rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 active:scale-95">
                  <i class="pi pi-times text-[10px]"></i>
                  <span>Cancel</span>
                </button>
                <button
                  @click="saveProduct"
                  :disabled="!editingProduct.name.trim()"
                  class="flex items-center gap-1.5 rounded-lg bg-[#4A6FA5] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3D5E8F] transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
                  <i class="pi pi-check text-[10px]"></i>
                  <span>Save</span>
                </button>
              </div>
            </div>
          </template>

          <!-- ===================== VIEW MODE ===================== -->
          <template v-else>
            <!-- Product & SKU -->
            <div class="min-w-0">
              <p class="text-sm font-semibold text-[#1a2332] truncate">{{ product.name }}</p>
              <div class="flex items-center gap-1.5 mt-0.5">
                 <i class="pi pi-barcode text-gray-300 text-xs"></i>
                <span class="text-[10px] text-gray-400 font-mono uppercase tracking-wide">{{ product.sku }}</span>
              </div>
              <p class="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2">{{ product.description }}</p>
              <div class="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                <span
                  v-for="tag in product.tags"
                  :key="tag"
                  class="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Category -->
            <div class="flex md:block items-center gap-2">
              <span class="md:hidden text-[10px] font-semibold text-gray-400 uppercase tracking-wide w-16 flex-shrink-0">Category</span>
              <span class="inline-block border border-gray-300 rounded-lg px-2.5 py-1 text-[10px] font-mono font-semibold uppercase text-gray-700 tracking-wide truncate max-w-full">
                {{ product.category }}
              </span>
            </div>

            <!-- Status -->
            <div class="flex md:block items-center gap-2">
              <span class="md:hidden text-[10px] font-semibold text-gray-400 uppercase tracking-wide w-16 flex-shrink-0">Status</span>
              <span
                class="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                :class="product.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'">
                {{ product.status }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 md:justify-end pt-1 md:pt-0">
              <button
                @click="editProduct(product)"
                :disabled="!!editingId"
                class="flex items-center gap-1.5 rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
                <i class="pi pi-pencil text-[10px]"></i>
                <span>Edit</span>
              </button>
              <button
                @click="deleteProduct(product)"
                :disabled="!!editingId"
                class="flex items-center justify-center rounded-lg bg-white border border-rose-200 w-8 h-8 flex-shrink-0 text-rose-500 hover:bg-rose-50 transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
                <i class="pi pi-trash text-xs"></i>
              </button>
            </div>
          </template>
        </div>
      </div>
      <div
        v-if="filteredProducts.length > 0"
        class="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-4 border-t border-gray-100">
        <span class="text-xs text-gray-400 text-center sm:text-left">
          Showing <span class="font-semibold text-gray-600">{{ paginatedProducts.length }}</span> of
          <span class="font-semibold text-gray-600">{{ filteredProducts.length }}</span> products
        </span>
        <div class="flex items-center gap-1 max-w-full overflow-x-auto py-0.5">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-2.5 sm:px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition flex-shrink-0"
          >Prev</button>
          <button
            v-for="p in totalPages"
            :key="p"
            @click="currentPage = p"
            class="px-2.5 sm:px-3 py-1.5 text-xs rounded-lg border transition font-semibold flex-shrink-0"
            :class="currentPage === p
              ? 'bg-[#4A6FA5] text-white border-[#4A6FA5]'
              : 'border-gray-200 text-gray-500 hover:bg-gray-50'"
          >{{ p }}</button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-2.5 sm:px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition flex-shrink-0"
          >Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Select } from 'primevue'

const products = ref([
  {
    id: 1,
    name: 'Enterprise React Core Stack',
    sku: 'AE-REACT-ENT',
    description: 'A pre-configured, high-performance web engineering blueprint optimized for scale, security, and absolute page speed. Features direct SSR capabilities, deep headless CMS connections, and unified…',
    category: 'Software Engine',
    status: 'Active',
    tags: ['React 19', 'SSR', 'Tailwind CSS'],
  },
  {
    id: 2,
    name: 'Atomic Design Token System',
    sku: 'AE-DSGN-ATOM',
    description: 'A comprehensive brand design blueprint mapping out responsive layouts, typography scales, light/dark color presets, and customizable micro-interaction motion profiles in Figma and Code.',
    category: 'Design Asset',
    status: 'Active',
    tags: ['Figma', 'Design Tokens'],
  },
  {
    id: 3,
    name: 'SEO Core Performance Optimizer',
    sku: 'AE-SEO-OPT',
    description: 'Automated script engine scanning rendering pathways to guarantee 100 on Core Web Vitals. Compiles code blocks to minimize layout shifts, optimize asset weights, and inject structural schema markings…',
    category: 'Analytics Software',
    status: 'Active',
    tags: ['Core Web Vitals', 'Schema'],
  },
])

const currentPage      = ref(1)
const pageSize         = 6
const searchQuery      = ref('')
const categoryMenuOpen = ref(false)
const statusMenuOpen   = ref(false)
const activeCategory   = ref('all')
const activeStatus     = ref('all')

const categoryOptions = [
    { label: 'Software Engine', value: 'Software Engine' },
    { label: 'Design Asset', value: 'Design Asset' },
    { label: 'Analytics Software', value: 'Analytics Software' }
]

const statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' }
]

const filteredProducts = computed(() => {
  let list = products.value
  if (activeCategory.value !== 'all') list = list.filter(p => p.category === activeCategory.value)
  if (activeStatus.value !== 'all')   list = list.filter(p => p.status === activeStatus.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  }
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / pageSize)))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredProducts.value.slice(start, start + pageSize)
})
const editingId      = ref(null) 
const editingProduct = ref(null)
const tagsInput      = ref('')
const isNewProduct   = computed(() => editingId.value === 'new')
const displayedProducts = computed(() => {
  if (isNewProduct.value && currentPage.value === 1) {
    return [editingProduct.value, ...paginatedProducts.value]
  }
  return paginatedProducts.value
})

function addProduct() {
  if (editingId.value) return 
  editingId.value = 'new'
  editingProduct.value = {
    id: 'new',
    name: '',
    sku: '',
    description: '',
    category: categoryOptions.find(o => o !== 'all'),
    status: 'Active',
    tags: [],
  }
  tagsInput.value = ''
  currentPage.value = 1
}

function editProduct(product) {
  if (editingId.value) return
  editingId.value = product.id
  editingProduct.value = { ...product, tags: [...product.tags] }
  tagsInput.value = product.tags.join(', ')
}

function cancelEdit() {
  editingId.value = null
  editingProduct.value = null
  tagsInput.value = ''
}

function saveProduct() {
  if (!editingProduct.value || !editingProduct.value.name.trim()) return

  const tags = tagsInput.value
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)

  if (isNewProduct.value) {
    const newId = products.value.length ? Math.max(...products.value.map(p => p.id)) + 1 : 1
    products.value.unshift({ ...editingProduct.value, id: newId, tags })
  } else {
    const idx = products.value.findIndex(p => p.id === editingProduct.value.id)
    if (idx !== -1) products.value[idx] = { ...editingProduct.value, tags }
  }

  cancelEdit()
}

function deleteProduct(product) {
  products.value = products.value.filter(p => p.id !== product.id)
}
</script>
