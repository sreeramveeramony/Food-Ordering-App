<script setup>
import { ref, onMounted } from 'vue'
import { listFoods, placeOrder } from '../services/api.js'

const foods = ref([])
const loading = ref(false)
const error = ref('')
const fulfillment = ref('pickup') // 'pickup' | 'delivery'
const snack = ref({ show: false, text: '', color: 'success' })

onMounted(async () => {
  loading.value = true
  try {
    foods.value = await listFoods()
  } catch (e) {
    error.value = e?.response?.data?.error || 'Failed to load foods'
  } finally {
    loading.value = false
  }
})

async function orderNow(foodId, name) {
  try {
    await placeOrder({ foodId, fulfillment: fulfillment.value })
    snack.value = { show: true, color: 'success', text: `Ordered ${name} • ${fulfillment.value.toUpperCase()}` }
  } catch (e) {
    snack.value = { show: true, color: 'error', text: e?.response?.data?.error || 'Order failed' }
  }
}

const currency = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
</script>

<template>
  <div>
    <div class="mb-6 text-center">
      <h2 class="text-h5 font-weight-bold mb-1">Store</h2>
      <div class="text-body-2 text-medium-emphasis">
        Choose pickup or delivery, then order a dish.
      </div>
    </div>

    <div class="d-flex justify-end mb-6">
      <v-btn-toggle v-model="fulfillment" mandatory divided class="rounded-xl">
        <v-btn value="pickup" prepend-icon="mdi-store">Pickup</v-btn>
        <v-btn value="delivery" prepend-icon="mdi-truck-delivery">Delivery</v-btn>
      </v-btn-toggle>
    </div>

    <!-- loading -->
    <v-row v-if="loading" class="mt-2">
      <v-col v-for="i in 8" :key="i" cols="12" sm="6" md="4" lg="3">
        <v-skeleton-loader type="image, article, actions" />
      </v-col>
    </v-row>

    <!-- error -->
    <v-alert v-else-if="error" type="error" variant="tonal" class="mb-4">{{ error }}</v-alert>

    <!-- grid -->
    <v-row v-else>
      <v-col v-for="f in foods" :key="f._id || f.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="h-100 d-flex flex-column hover:shadow-lg transition">
          <v-sheet height="140" class="d-flex align-center justify-center bg-grey-lighten-4">
            <v-icon size="56" class="text-grey-darken-1">mdi-food</v-icon>
          </v-sheet>

          <v-card-item>
            <v-card-title class="text-subtitle-1">{{ f.name }}</v-card-title>
            <v-card-subtitle class="d-flex align-center justify-space-between">
              <span class="font-weight-semibold">{{ currency(f.price) }}</span>
              <v-chip size="small" color="secondary" variant="tonal">
                {{ f.category || 'Diet' }}
              </v-chip>
            </v-card-subtitle>
          </v-card-item>

          <v-spacer />
          <v-card-actions class="pa-4 pt-0 mt-auto">
            <v-btn color="primary" block @click="orderNow(f._id || f.id, f.name)">
              Order • {{ fulfillment.toUpperCase() }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col v-if="!foods.length" cols="12" class="text-center text-medium-emphasis">
        No items yet. Ask admin to add foods.
      </v-col>
    </v-row>

    <v-snackbar v-model="snack.show" :color="snack.color" timeout="2200" location="bottom">
      {{ snack.text }}
    </v-snackbar>
  </div>
</template>

<style scoped>
.hover\:shadow-lg:hover { box-shadow: 0 12px 24px rgba(0,0,0,.08) !important; }
.transition { transition: box-shadow .2s ease; }
.h-100 { height: 100%; }
</style>


<style scoped>
.h-100 { height: 100%; }
</style>
