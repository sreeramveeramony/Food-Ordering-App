<script setup>
import { ref, onMounted } from 'vue'
import { addFood, listFoods, listOrders } from '../services/api.js'

const form = ref({ name: '', price: null, category: '' })
const foods = ref([])
const orders = ref([])
const loading = ref(false)
const snack = ref({ show: false, text: '', color: 'success' })

const foodHeaders = [
  { title: 'Name', key: 'name' },
  { title: 'Price', key: 'price' },
  { title: 'Category', key: 'category' },
  { title: 'Created', key: 'createdAt' }
]

const orderHeaders = [
  { title: 'Food', key: 'foodId.name', sortable: false },
  { title: 'Fulfillment', key: 'fulfillment' },
  { title: 'Placed', key: 'createdAt' }
]

const currency = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

async function refresh() {
  loading.value = true
  try {
    foods.value = await listFoods()
    orders.value = await listOrders()
  } finally {
    loading.value = false
  }
}

onMounted(refresh)

async function submit() {
  if (!form.value.name || form.value.price == null) return
  try {
    await addFood(form.value)
    snack.value = { show: true, color: 'success', text: 'Food added' }
    form.value = { name: '', price: null, category: '' }
    await refresh()
  } catch (e) {
    snack.value = { show: true, color: 'error', text: e?.response?.data?.error || 'Failed to add' }
  }
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h2 class="text-h5 font-weight-bold mb-1">Admin</h2>
      <div class="text-body-2 text-medium-emphasis">Add foods and review recent orders.</div>
    </div>

    <v-card class="pa-4 mb-8">
      <div class="text-subtitle-2 text-medium-emphasis mb-3">Add new food</div>
      <v-form @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.name" label="Food name" />
          </v-col>
          <v-col cols="6" md="3">
            <v-text-field v-model="form.price" label="Price (₹)" type="number" />
          </v-col>
          <v-col cols="6" md="3">
            <v-text-field v-model="form.category" label="Category (optional)" />
          </v-col>
        </v-row>
        <v-btn type="submit" color="primary">Add Food</v-btn>
      </v-form>
    </v-card>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="pb-0">Foods</v-card-title>
          <v-data-table
            :items="foods"
            :headers="[
              { title: 'Name', key: 'name' },
              { title: 'Price', key: 'price' },
              { title: 'Category', key: 'category' },
              { title: 'Created', key: 'createdAt' }
            ]"
            :loading="loading"
            class="px-2 pb-2"
          >
            <template #item.price="{ value }">{{ currency(value) }}</template>
            <template #item.createdAt="{ value }">{{ new Date(value).toLocaleString() }}</template>
            <template #no-data>No foods yet.</template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="pb-0">Orders</v-card-title>
          <v-data-table
            :items="orders"
            :headers="[
              { title: 'Food', key: 'foodId.name', sortable: false },
              { title: 'Fulfillment', key: 'fulfillment' },
              { title: 'Placed', key: 'createdAt' }
            ]"
            :loading="loading"
            class="px-2 pb-2"
          >
            <template #item["foodId.name"]="{ item }">
              {{ item.foodId?.name ?? item.foodId }}
            </template>
            <template #item.fulfillment="{ value }">
              <v-chip :color="value==='pickup' ? 'secondary' : 'primary'" variant="tonal" size="small" class="text-uppercase">
                {{ value }}
              </v-chip>
            </template>
            <template #item.createdAt="{ value }">{{ new Date(value).toLocaleString() }}</template>
            <template #no-data>No orders yet.</template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snack.show" :color="snack.color" timeout="2200" location="bottom">
      {{ snack.text }}
    </v-snackbar>
  </div>
</template>

