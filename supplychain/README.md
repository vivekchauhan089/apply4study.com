# SupplyChain Management App

Complete supply chain management system for Distributors and Consumers.

## Features

### Consumer Features
- ✅ Signup & Login
- ✅ Product Listing
- ✅ Add to Cart
- ✅ Online Payment (Razorpay)
- ✅ My Orders with tracking
- ✅ Wallet Management
- ✅ Profile Management

### Distributor Features
- ✅ Dashboard with Sales & Revenue Charts
- ✅ Inventory Management
- ✅ Barcode/QR Code Scanner for stock updates
- ✅ Sales Orders Management
- ✅ Shipment Management with multiple courier services:
  - DTDC Courier
  - Blue Dart
  - FedEx Express
  - First Flight
  - Shipway
  - Delhivery
  - Borzo/Bigship
  - Trackon Courier
  - NimbusPost
  - Same Day Delivery
  - Custom Schedule
- ✅ Order Tracking

## Tech Stack
- Flutter
- SQLite (local storage)
- SharedPreferences (user session)
- HTTP (API calls)
- Provider (state management)
- Razorpay (payments)
- Barcode Scanner
- FL Chart (analytics)

## Setup

1. Install dependencies:
```bash
flutter pub get
```

2. Update API base URL in `lib/utils/constants.dart`:
```dart
static const String baseUrl = 'YOUR_API_URL';
```

3. Add Razorpay key in `lib/screens/consumer/checkout_screen.dart`:
```dart
'key': 'YOUR_RAZORPAY_KEY',
```

4. Run the app:
```bash
flutter run
```

## Project Structure
```
lib/
├── models/          # Data models
├── services/        # API & Storage services
├── database/        # SQLite helper
├── providers/       # State management
├── screens/         # UI screens
│   ├── auth/        # Login, Signup
│   ├── consumer/    # Consumer screens
│   └── distributor/ # Distributor screens
├── utils/           # Constants, Theme
└── main.dart        # Entry point
```

## API Endpoints Required

### Auth
- POST /api/auth/signup
- POST /api/auth/login

### Products
- GET /api/products
- GET /api/products/barcode/:barcode
- POST /api/products
- PUT /api/products/:id/stock

### Orders
- POST /api/orders
- GET /api/orders
- GET /api/orders/:id
- PUT /api/orders/:id/shipment

### Payment
- POST /api/payments

### Wallet
- GET /api/wallet/balance
- POST /api/wallet/add

### Dashboard
- GET /api/dashboard/stats

## Database Schema

### Cart Table (SQLite)
- id, product_id, product_name, price, image_url, quantity

### Orders Cache Table (SQLite)
- id, user_id, total_amount, status, shipping_address, courier_service, tracking_number, delivery_date, created_at

## Notes
- Replace API URLs with your backend
- Configure Razorpay credentials
- Add proper error handling for production
- Implement proper authentication tokens
- Add image upload for products
