# Spare Parts Marketplace - API Documentation

## Base URL

```
http://127.0.0.1:8000/api/v1
```

---

## 🔐 Authentication

### Customer Auth

-   `POST /customer/register` - Register new customer
-   `POST /customer/login` - Customer login
-   `POST /customer/logout` - Customer logout (requires auth)

### Seller Auth

-   `POST /seller/register` - Register new seller
-   `POST /seller/login` - Seller login
-   `POST /seller/logout` - Seller logout (requires auth)

---

## 🛒 Public Marketplace

### Parts Browsing

-   `GET /parts` - List all parts (with filters)
    -   Query params: `make`, `model`, `part_name`, `condition`
-   `GET /parts/{id}` - Get part details

### Core Data

-   `GET /vehicles` - Get all vehicles
-   `GET /categories` - Get all categories
-   `GET /part-types` - Get all part types

---

## 👤 Customer Dashboard (Auth Required)

### Favorites

-   `GET /customer/favorites` - Get customer's favorites
-   `POST /customer/favorites` - Add to favorites
    -   Body: `{ "part_id": 1 }`
-   `DELETE /customer/favorites/{id}` - Remove from favorites
-   `DELETE /customer/favorites/part/{partId}` - Remove by part ID
-   `GET /customer/favorites/check/{partId}` - Check if favorited

### Orders

-   `GET /customer/orders` - Get customer's orders
-   `POST /customer/orders` - Create new order
    -   Body: `{ "part_id": 1, "delivery_city": "...", "delivery_district": "...", "delivery_address": "...", "customer_phone": "...", "notes": "..." }`
-   `GET /customer/orders/{id}` - Get order details
-   `POST /customer/orders/{id}/cancel` - Cancel order

---

## 🏪 Seller Dashboard (Auth Required)

### Part Management

-   `GET /seller/parts` - Get seller's parts
-   `POST /seller/parts` - Create new part
    -   Body: `{ "standard_part_id": 1, "price": 500, "status": "new", "quality": "original", "vehicle_ids": [1,2] }`
-   `GET /seller/parts/{id}` - Get part details
-   `PUT /seller/parts/{id}` - Update part
-   `DELETE /seller/parts/{id}` - Delete part

### Image Management

-   `POST /seller/parts/{id}/images` - Upload images (multipart/form-data)
-   `DELETE /seller/parts/{partId}/images/{imageId}` - Delete image

---

## 👑 Admin Panel (Auth Required)

### Dashboard

-   `GET /admin/dashboard` - Get dashboard statistics
-   `GET /admin/dashboard/recent` - Get recent activities

### Seller Management

-   `GET /admin/sellers` - Get all sellers
    -   Query params: `approved`, `active`, `search`
-   `GET /admin/sellers/{id}` - Get seller details
-   `POST /admin/sellers/{id}/approve` - Approve seller
-   `POST /admin/sellers/{id}/reject` - Reject seller
-   `POST /admin/sellers/{id}/activate` - Activate seller
-   `POST /admin/sellers/{id}/deactivate` - Deactivate seller
-   `DELETE /admin/sellers/{id}` - Delete seller

---

## 📊 Response Format

### Success Response

```json
{
  "data": { ... },
  "message": "Success message"
}
```

### Error Response

```json
{
    "error": "Error title",
    "message": "Detailed error message"
}
```

### Paginated Response

```json
{
  "data": [ ... ],
  "current_page": 1,
  "last_page": 5,
  "per_page": 15,
  "total": 73
}
```

---

## 🔑 Authentication

All protected endpoints require Bearer token:

```
Authorization: Bearer {token}
```

Token is returned on login/register.

---

## Status Codes

-   `200` - Success
-   `201` - Created
-   `400` - Bad Request
-   `401` - Unauthorized
-   `403` - Forbidden
-   `404` - Not Found
-   `409` - Conflict
-   `500` - Server Error
