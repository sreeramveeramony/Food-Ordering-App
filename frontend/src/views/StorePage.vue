<script setup>
import { onMounted, ref } from 'vue'
import { listFoods, placeOrder } from '../services/api.js'

const foods = ref([])
const loading = ref(false)
const error = ref('')
const fulfillment = ref('pickup')
const snackbar = ref(false)
const snackText = ref('')
const snackColor = ref('success')

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

async function orderNow(item) {
  try {
    await placeOrder({ foodId: item._id || item.id, fulfillment: fulfillment.value })
    snackText.value = `Ordered ${item.name} • ${fulfillment.value}`
    snackColor.value = 'success'
  } catch (e) {
    snackText.value = e?.response?.data?.error || 'Order failed'
    snackColor.value = 'error'
  } finally {
    snackbar.value = true
  }
}

const currency = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
</script>

<template>
  <v-container>
    <v-row class="mb-4" align="center" justify="space-between">
      <v-col cols="12" md="6">
        <h2 class="text-h6">Store</h2>
        <div class="text-body-2">Choose pickup or delivery, then order a dish.</div>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-end">
        <v-btn-toggle v-model="fulfillment" mandatory>
          <v-btn value="pickup" prepend-icon="mdi-store">Pickup</v-btn>
          <v-btn value="delivery" prepend-icon="mdi-truck-delivery">Delivery</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
      {{ error }}
    </v-alert>

    <v-row v-if="loading">
      <v-col v-for="i in 6" :key="i" cols="12" sm="6" md="4">
        <v-skeleton-loader type="image, article, actions" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col v-for="f in foods" :key="f._id || f.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="d-flex flex-column">
          <v-sheet class="d-flex align-center justify-center" height="140">
            <v-icon size="48">mdi-food</v-icon>
          </v-sheet>
          <v-card-title class="pb-0">{{ f.name }}</v-card-title>
          <v-card-subtitle class="pt-0">{{ currency(f.price) }}</v-card-subtitle>
          <v-card-text class="text-body-2">
            {{ f.category || 'Diet Meal' }}
          </v-card-text>
          <v-card-actions class="mt-auto">
            <v-btn color="primary" block @click="orderNow(f)">Order</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col v-if="!foods.length" cols="12" class="text-center">
        No items yet.
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :color="snackColor" timeout="2200">
      {{ snackText }}
    </v-snackbar>
  </v-container>
</template>
