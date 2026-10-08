# ELEGANTSTYLE — Architecture & API Documentation (apis.md)

This document provides a comprehensive blueprint of the backend architecture, PostgreSQL database schema, Cloudinary media pipeline, and full REST API endpoint specifications for the **ELEGANTSTYLE** Luxury Beauty & Fashion Maison application.

---

## 1. System Environment & Credentials Configuration

The system connects to **Cloudinary** for image media management and **Supabase PostgreSQL** for data persistence.

```env
# Cloudinary Media Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=oubqtfbl
CLOUDINARY_API_KEY=394847577237636
CLOUDINARY_API_SECRET=7HrTZDT_G0HueLgpiuK_VaBymKI
CLOUDINARY_URL=cloudinary://394847577237636:7HrTZDT_G0HueLgpiuK_VaBymKI@oubqtfbl

# Supabase PostgreSQL Database Credentials
DATABASE_URL=postgresql://postgres:@Maazarshad02@db.gbquvkvvxeolpivkkepm.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:@Maazarshad02@db.gbquvkvvxeolpivkkepm.supabase.co:5432/postgres

# JWT Secret Key
JWT_SECRET=elegant_super_secret_jwt_key_2026_luxury
```

---

## 2. PostgreSQL Database Schema DDL (Supabase)

Below is the relational database schema implemented in PostgreSQL:

```sql
-- 1. USERS & ADMIN AUTHENTICATION
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150),
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CATEGORIES
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'cat-beauty', 'cat-fashion'
    slug VARCHAR(50) UNIQUE NOT NULL, -- 'beauty', 'fashion'
    name VARCHAR(100) NOT NULL,
    tagline TEXT,
    description TEXT,
    hero_image TEXT
);

-- 3. SUBCATEGORIES
CREATE TABLE subcategories (
    id VARCHAR(50) PRIMARY KEY,
    category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
    slug VARCHAR(50) UNIQUE NOT NULL, -- 'makeup', 'skin-care', 'hair-care', 'belts', 'wallets', 'hand-bags', 'school-belts', 'deals'
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image TEXT
);

-- 4. PRODUCTS CATALOG
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    main_category VARCHAR(50) NOT NULL, -- 'beauty' | 'fashion'
    subcategory VARCHAR(50) NOT NULL,   -- 'makeup' | 'skin-care' | 'hair-care' | 'belts' | 'wallets' | 'hand-bags' | 'school-belts' | 'deals'
    audience TEXT[] NOT NULL,           -- ARRAY['women', 'men', 'children']
    badge VARCHAR(50),                  -- 'NEW' | 'BEST SELLER' | 'LIMITED' | 'AWARD WINNER'
    images TEXT[] NOT NULL,             -- Array of Cloudinary URLs
    details TEXT[],
    usage_instructions TEXT,
    shipping_info TEXT,
    is_featured BOOLEAN DEFAULT false,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. OFFERS & DEAL BUNDLES
CREATE TABLE offers_bundles (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    deal_category VARCHAR(100) NOT NULL, -- 'bridal-makeup-deals' | 'party-makeup-deals' | 'makeup-deals'
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    original_price NUMERIC(10, 2) NOT NULL,
    discounted_price NUMERIC(10, 2) NOT NULL,
    savings_percentage INT NOT NULL,
    badge VARCHAR(50),
    image TEXT NOT NULL,                -- Cloudinary URL
    includes TEXT[] NOT NULL,
    perks TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. ORDERS & FULFILLMENT
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY, -- 'ORD-9821'
    customer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    shipping_address TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'Processing' CHECK (status IN ('Processing', 'Shipped', 'Delivered', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL
);
```

---

## 3. Cloudinary Image Upload Pipeline

All product and offer images uploaded via the Admin Dashboard (`/admin/products`, `/admin/offers`) are uploaded to Cloudinary:

- **Cloud Name**: `oubqtfbl`
- **Upload Endpoint**: `https://api.cloudinary.com/v1_1/oubqtfbl/image/upload`
- **Backend Handler**: `/api/upload/cloudinary`
- **Supported File Types**: PNG, JPG, WEBP, AVIF up to 10MB.
- **Transformed Delivery**: Cloudinary automatically serves optimized WebP images with `f_auto,q_auto`.

---

## 4. Complete REST API Specifications

### A. Authentication Endpoints

#### 1. Admin Login
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
```json
{
  "email": "admin@elegantstyle.com",
  "password": "admin123"
}
```
- **Response** (`200 OK`):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "admin-01",
    "email": "admin@elegantstyle.com",
    "name": "Maison Admin",
    "role": "admin"
  }
}
```

---

### B. Admin Dashboard APIs

#### 1. Overview Analytics
- **Endpoint**: `GET /api/admin/analytics/overview`
- **Header**: `Authorization: Bearer <token>`
- **Response** (`200 OK`):
```json
{
  "totalRevenue": 130800.00,
  "totalProducts": 18,
  "activeOffers": 6,
  "vipCustomers": 1420,
  "monthlyGrowth": "+18.4%"
}
```

#### 2. Products Management (Admin)
- **`GET /api/admin/products`**: Fetch full inventory list including stock status.
- **`POST /api/admin/products`**: Create a new product.
  - **Payload**:
  ```json
  {
    "name": "Eclat Botanical Fluid",
    "subtitle": "Bio-fermented Silk Tint",
    "mainCategory": "beauty",
    "subcategory": "skin-care",
    "price": 88.00,
    "badge": "NEW",
    "images": ["https://res.cloudinary.com/oubqtfbl/image/upload/v12345/product1.jpg"],
    "audience": ["women"],
    "details": ["100% Organic", "Bio-fermented Damask Rose"]
  }
  ```
- **`PUT /api/admin/products/[id]`**: Update product record.
- **`DELETE /api/admin/products/[id]`**: Remove product.

#### 3. Offers & Privileges Management (Admin)
- **`GET /api/admin/offers`**: List all active deal bundles.
- **`POST /api/admin/offers`**: Create new offer.
  - **Payload**:
  ```json
  {
    "title": "Royal Bridal Couture Suite",
    "dealCategory": "bridal-makeup-deals",
    "originalPrice": 380,
    "discountedPrice": 247,
    "savingsPercentage": 35,
    "badge": "MOST COVETED",
    "image": "https://res.cloudinary.com/oubqtfbl/image/upload/v12345/deal1.jpg",
    "includes": ["Mineral Glow Tint", "Satin Silk Lipstick"]
  }
  ```
- **`PUT /api/admin/offers/[id]`**: Update offer.
- **`DELETE /api/admin/offers/[id]`**: Delete offer.

---

### C. Storefront Public APIs

#### 1. Fetch Products
- **Endpoint**: `GET /api/products`
- **Query Parameters**:
  - `mainCategory`: `beauty` | `fashion`
  - `subcategory`: `makeup` | `skin-care` | `hair-care` | `belts` | `wallets` | `hand-bags` | `school-belts` | `deals`
  - `audience`: `women` | `men` | `children`
  - `featured`: `true` | `false`
- **Response**:
```json
{
  "products": [
    {
      "id": "prod-1",
      "name": "Rouge Opera Satin Silk Lipstick",
      "price": 88.00,
      "mainCategory": "beauty",
      "subcategory": "makeup",
      "images": ["https://images.unsplash.com/..."]
    }
  ]
}
```

#### 2. Fetch Offers & Privilege Deals
- **Endpoint**: `GET /api/offers`
- **Query Parameter**: `category` (`bridal-makeup-deals`, `party-makeup-deals`, `makeup-deals`)
- **Response**:
```json
{
  "offers": [
    {
      "id": "deal-bridal-01",
      "title": "Royal Bridal Couture Suite",
      "discountedPrice": 247,
      "originalPrice": 380,
      "savingsPercentage": 35
    }
  ]
}
```

#### 3. Checkout Order Submission
- **Endpoint**: `POST /api/orders`
- **Payload**:
```json
{
  "customerName": "Sophia Laurent",
  "customerEmail": "sophia@example.com",
  "shippingAddress": "75001 Paris, France",
  "items": [
    { "productId": "prod-1", "quantity": 2, "price": 88.00 }
  ],
  "totalAmount": 176.00
}
```

---

### D. Cloudinary Direct Media Upload API

#### Upload Endpoint
- **Endpoint**: `POST /api/upload/cloudinary`
- **Content-Type**: `multipart/form-data`
- **Form Data**:
  - `file`: Image Binary Buffer / File
  - `folder`: `elegantstyle/products` or `elegantstyle/offers`
- **Response** (`200 OK`):
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/oubqtfbl/image/upload/v17282829/elegantstyle/products/prod_123.jpg",
  "public_id": "elegantstyle/products/prod_123",
  "width": 1200,
  "height": 1200,
  "format": "webp"
}
```

### E. Nodemailer Email Notification System

#### Nodemailer Transport Credentials:
- **SMTP Host**: `smtp.gmail.com` (Port `465`, SSL/TLS)
- **SMTP User**: `maazarshad89@gmail.com`
- **App Password**: `bjibcbctwetunpmx`
- **Sender Address**: `"ELEGANTSTYLE MAISON" <maazarshad89@gmail.com>`

#### Integrated Email Workflows:
1. **Order Confirmation Email**: Triggered automatically on `POST /api/orders` to the customer's email with HTML itemized PKR invoice.
2. **Admin New Order Alert**: Triggered automatically on `POST /api/orders` to `maazarshad89@gmail.com` with customer details, delivery destination, and total PKR order amount.
3. **Fulfillment Status Update Email**: Triggered on `PATCH /api/orders` when admin updates order status (`Processing`, `Dispatched`, `Shipped`, `Delivered`, `Cancelled`).
4. **Password Reset OTP Email**: Triggered on `POST /api/auth/reset-password` sending a 6-digit verification code to customer or admin email.

---

*Document compiled for ELEGANTSTYLE Maison Architecture — 2026.*
