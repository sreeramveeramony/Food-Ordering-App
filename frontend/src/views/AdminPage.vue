<script setup>
import { ref, onMounted } from 'vue'
import { addFood, listFoods, listOrders } from '../services/api.js'

const form = ref({ name: '', price: null, category: '' })
const foods = ref([])
const orders = ref([])
const loading = ref(false)
const snackbar = ref(false)
const snackText = ref('')
const snackColor = ref('success')

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
    snackText.value = 'Food added'
    snackColor.value = 'success'
    form.value = { name: '', price: null, category: '' }
    await refresh()
  } catch (e) {
    snackText.value = e?.response?.data?.error || 'Failed to add'
    snackColor.value = 'error'
  } finally {
    snackbar.value = true
  }
}

const currency = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
</script>

<template>
  <v-container>
    <h2 class="text-h6 mb-4">Admin</h2>

    <v-card class="pa-4 mb-6">
      <div class="text-subtitle-2 mb-2">Add new food</div>
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
          <v-card-title>Foods</v-card-title>
          <v-data-table
            :items="foods"
            :headers="[
              { title: 'Name', key: 'name' },
              { title: 'Price', key: 'price' },
              { title: 'Category', key: 'category' },
              { title: 'Created', key: 'createdAt' }
            ]"
            :loading="loading"
          >
            <template #item.price="{ value }">{{ currency(value) }}</template>
            <template #item.createdAt="{ value }">
              {{ value ? new Date(value).toLocaleString() : '' }}
            </template>
            <template #no-data>No foods yet.</template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Orders</v-card-title>
          <v-data-table
            :items="orders"
            :headers="[
              { title: 'Food', key: 'foodId.name', sortable: false },
              { title: 'Fulfillment', key: 'fulfillment' },
              { title: 'Placed', key: 'createdAt' }
            ]"
            :loading="loading"
          >
            <template #item["foodId.name"]="{ item }">
              {{ item.foodId?.name ?? item.foodId }}
            </template>
            <template #item.createdAt="{ value }">
              {{ value ? new Date(value).toLocaleString() : '' }}
            </template>
            <template #no-data>No orders yet.</template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :color="snackColor" timeout="2200">
      {{ snackText }}
    </v-snackbar>
  </v-container>
</template>
