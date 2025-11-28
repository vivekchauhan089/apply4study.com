# Sample Data Integration

## API Status Control
- **Toggle**: Available in Login Screen → API Settings
- **Active**: Uses real API endpoints
- **Inactive**: Uses mock data (default for testing)

## Sample Login Credentials

### Distributor Account
- **Email**: `distributor@test.com`
- **Password**: `dist123`
- **Features**: Inventory management, order processing, dashboard analytics

### Consumer Account  
- **Email**: `consumer@test.com`
- **Password**: `cons123`
- **Features**: Product browsing, cart, orders, wallet

### Farmer Account
- **Email**: `farmer@test.com`
- **Password**: `farm123`
- **Features**: Supply creation, pre-invoice management, QR scanning

## Sample Products (5 items)

### 1. Premium Rice
- **Category**: Crops (Agriculture)
- **Price**: ₹120/kg
- **Stock**: 500 units
- **Barcode**: 1234567890123

### 2. Organic Fertilizer
- **Category**: Fertilizers (Agriculture)  
- **Price**: ₹850/bag
- **Stock**: 200 units
- **Barcode**: 1234567890124

### 3. Steel Pipes
- **Category**: Raw Materials (Manufacturing)
- **Price**: ₹2,500/piece
- **Stock**: 100 units
- **Barcode**: 1234567890125

### 4. Cotton Fabric
- **Category**: Fabrics (Textile)
- **Price**: ₹450/meter
- **Stock**: 300 units
- **Barcode**: 1234567890126

### 5. Smartphone Components
- **Category**: Components (Electronics)
- **Price**: ₹1,200/piece
- **Stock**: 150 units
- **Barcode**: 1234567890127

## Sample Orders (2 orders)

### Order #1
- **User**: Consumer
- **Amount**: ₹1,200
- **Status**: Confirmed
- **Courier**: Blue Dart
- **Tracking**: BD123456789

### Order #2
- **User**: Consumer
- **Amount**: ₹850
- **Status**: Shipped
- **Courier**: DTDC Courier
- **Tracking**: DTDC987654321

## Mock Dashboard Statistics
- **Total Products**: 5
- **Total Orders**: 2
- **Total Revenue**: ₹25,000
- **Pending Orders**: Variable
- **Low Stock Items**: Items with stock < 50

## Features Working with Mock Data
✅ User Authentication (Login/Signup)
✅ Product Listing & Management
✅ Order Creation & Tracking
✅ Dashboard Statistics
✅ Inventory Management
✅ Multi-Industry Support
✅ User Type Routing

## API Fallback Mechanism
- If API is enabled but fails → Automatically falls back to mock data
- Seamless user experience regardless of API status
- Error handling with graceful degradation
- Real-time API status indicator in settings

## Testing Instructions
1. Open app → Login screen
2. Tap "API Settings" → Toggle API status
3. Use sample credentials to login
4. Explore features with mock data
5. Test different user types and industries