import axios from 'axios'

export const listFoods  = () => axios.get('/api/foods').then(r => r.data)
export const addFood    = (payload) => axios.post('/api/foods', payload).then(r => r.data)
export const listOrders = () => axios.get('/api/orders').then(r => r.data)
export const placeOrder = (payload) => axios.post('/api/orders', payload).then(r => r.data)

