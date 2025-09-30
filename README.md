Diet Foods – Mini Full-Stack (Vue + Vuetify + Express + MongoDB)

A tiny learning app with two pages:

Store (client): list foods, choose Pickup/Delivery, place order

Admin: add foods and view orders

Goal: simplest possible stack with clean separation Frontend ↔ API ↔ DB.

Tech Stack

Frontend: Vue 3, Vuetify 3, Vite, Axios, Vue Router

Backend: Node.js (Express)

Database: MongoDB (Mongoose)

Dev Ports: Frontend 5173, Backend 4000 (Vite proxies /api → 4000)

Features

Add foods (name, price, optional category)

Store lists foods and places orders (pickup/delivery)

Admin sees all orders (food + fulfillment)

Minimal, modular file layout

Quick Start
1) Backend
cd backend
npm install
# set your Mongo URI (local or Atlas)
echo "MONGO_URI=mongodb://127.0.0.1:27017/diet_api" > .env
node server.js
# -> API: http://localhost:4000

2) Frontend
cd frontend
npm install
npm run dev
# -> App: http://localhost:5173


Vite dev server proxies /api to the backend, so the frontend can call /api/* without CORS issues.

API Endpoints
Method	Path	Description	Body (JSON) Example
GET	/api/foods	List foods	—
POST	/api/foods	Add food	{ "name": "Paneer Protein Bowl", "price": 229, "category": "High-Protein" }
GET	/api/orders	List orders	—
POST	/api/orders	Place order	{ "foodId": "<FOOD_ID>", "fulfillment": "pickup" }

Notes

Order.foodId references Food._id

fulfillment is one of: pickup, delivery

Environment

MONGO_URI — Mongo connection string (required)

Optionally change ports:

Backend: edit server.js (process.env.PORT || 4000)

Frontend: edit vite.config.js (server.port)
