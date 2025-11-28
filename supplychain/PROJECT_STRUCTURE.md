# Project Structure

```
lib/
├── main.dart                          # Entry point with routing
├── models/                            # Data models
│   ├── user_model.dart
│   ├── product_model.dart
│   ├── order_model.dart
│   └── cart_model.dart
├── services/                          # Business logic
│   ├── api_service.dart              # HTTP API calls
│   └── storage_service.dart          # SharedPreferences
├── database/                          # Local storage
│   └── database_helper.dart          # SQLite operations
├── providers/                         # State management
│   └── cart_provider.dart            # Cart state
├── utils/                             # Utilities
│   ├── constants.dart                # App constants
│   └── app_theme.dart                # Theme configuration
└── screens/                           # UI screens
    ├── auth/                          # Authentication
    │   ├── login_screen.dart
    │   └── signup_screen.dart
    ├── consumer/                      # Consumer app
    │   ├── dashboard/
    │   │   ├── dashboard_screen.dart
    │   │   └── product_detail_screen.dart
    │   ├── cart/
    │   │   ├── cart_screen.dart
    │   │   └── checkout_screen.dart
    │   ├── orders/
    │   │   ├── orders_screen.dart
    │   │   └── order_detail_screen.dart
    │   ├── wallet/
    │   │   └── wallet_screen.dart
    │   └── profile/
    │       └── profile_screen.dart
    └── distributor/                   # Distributor app
        ├── dashboard/
        │   └── dashboard_screen.dart
        ├── inventory/
        │   ├── inventory_screen.dart
        │   └── add_product_screen.dart
        ├── orders/
        │   └── orders_screen.dart
        └── profile/
            └── profile_screen.dart
```

## Screen Routes

### Auth
- `/login` - Login screen
- `/signup` - Signup screen

### Consumer
- `/consumer/home` - Product listing dashboard
- `/consumer/product-detail` - Product details
- `/consumer/cart` - Shopping cart
- `/consumer/checkout` - Checkout & payment
- `/consumer/orders` - Order history
- `/consumer/order-detail` - Order tracking details
- `/consumer/wallet` - Wallet management
- `/consumer/profile` - User profile

### Distributor
- `/distributor/home` - Sales dashboard with charts
- `/distributor/inventory` - Stock management
- `/distributor/add-product` - Add new product
- `/distributor/orders` - Order management
- `/distributor/profile` - Distributor profile

## Features by Screen

### Consumer Dashboard
- Grid view of products
- Add to cart
- Cart badge counter
- Pull to refresh

### Cart
- Quantity management
- Remove items
- Total calculation
- Checkout button

### Checkout
- Address input
- Order summary
- Razorpay payment integration

### Orders
- Order list with status
- Status color coding
- Order detail navigation

### Wallet
- Balance display
- Add money dialog
- Transaction history

### Distributor Dashboard
- Sales statistics cards
- Revenue chart
- Order count
- Product count

### Inventory
- Product list
- Barcode scanner
- Stock update
- Add product

### Distributor Orders
- Order management
- Shipment dialog
- Courier selection
- Tracking number input
- Delivery date picker
