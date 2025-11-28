import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'utils/app_theme.dart';
import 'providers/cart_provider.dart';
import 'models/product_model.dart';
import 'models/pre_invoice_model.dart';
import 'services/storage_service.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/signup_screen.dart';
import 'screens/consumer/dashboard/dashboard_screen.dart' as consumer;
import 'screens/consumer/cart/cart_screen.dart';
import 'screens/consumer/cart/checkout_screen.dart';
import 'screens/consumer/orders/orders_screen.dart' as consumer_orders;
import 'screens/consumer/orders/order_detail_screen.dart';
import 'screens/consumer/dashboard/product_detail_screen.dart';
import 'screens/consumer/wallet/wallet_screen.dart';
import 'screens/consumer/profile/profile_screen.dart' as consumer_profile;
import 'screens/distributor/dashboard/dashboard_screen.dart' as distributor;
import 'screens/distributor/inventory/inventory_screen.dart';
import 'screens/distributor/inventory/add_product_screen.dart';
import 'screens/distributor/orders/orders_screen.dart' as distributor_orders;
import 'screens/distributor/profile/profile_screen.dart' as distributor_profile;
import 'screens/farmer/dashboard/farmer_dashboard_screen.dart';
import 'screens/farmer/supplies/create_supply_screen.dart';
import 'screens/agent/dashboard/agent_dashboard_screen.dart';
import 'screens/agent/invoices/create_pre_invoice_screen.dart';
import 'screens/consumer/bank_statements/upload_bank_statement_screen.dart';
import 'screens/universal/industry_selection_screen.dart';
import 'screens/universal/user_type_selection_screen.dart';
import 'screens/universal/rfq_management_screen.dart';
import 'screens/settings/api_settings_screen.dart';
import 'screens/reports/analytics_dashboard_screen.dart';
import 'screens/reports/process_tracking_screen.dart';
import 'screens/consumer/marketplace/marketplace_screen.dart';
import 'utils/constants.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => CartProvider()),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: AppConstants.appName,
      theme: AppTheme.lightTheme,
      debugShowCheckedModeBanner: false,
      home: const SplashScreen(),
      routes: {
        '/industry-selection': (context) => const IndustrySelectionScreen(),
        '/user-type-selection': (context) => const UserTypeSelectionScreen(),
        '/login': (context) => const LoginScreen(),
        '/signup': (context) => const SignupScreen(),
        '/rfq-management': (context) => const RFQManagementScreen(),
        '/api-settings': (context) => const ApiSettingsScreen(),
        '/analytics': (context) => const AnalyticsDashboardScreen(),
        '/process-tracking': (context) => const ProcessTrackingScreen(),
        '/marketplace': (context) => const MarketplaceScreen(),
        '/consumer/home': (context) => const consumer.DashboardScreen(),
        '/consumer/cart': (context) => const CartScreen(),
        '/consumer/checkout': (context) => const CheckoutScreen(),
        '/consumer/orders': (context) => const consumer_orders.OrdersScreen(),
        '/consumer/wallet': (context) => const WalletScreen(),
        '/consumer/profile': (context) => const consumer_profile.ProfileScreen(),
        '/consumer/order-detail': (context) {
          final orderId = ModalRoute.of(context)!.settings.arguments as int;
          return OrderDetailScreen(orderId: orderId);
        },
        '/consumer/product-detail': (context) {
          final product = ModalRoute.of(context)!.settings.arguments;
          return ProductDetailScreen(product: product as ProductModel);
        },
        '/distributor/home': (context) => const distributor.DistributorDashboardScreen(),
        '/distributor/add-product': (context) => const AddProductScreen(),
        '/distributor/profile': (context) => const distributor_profile.DistributorProfileScreen(),
        '/distributor/inventory': (context) => const InventoryScreen(),
        '/distributor/orders': (context) => const distributor_orders.DistributorOrdersScreen(),
        '/farmer/home': (context) => const FarmerDashboardScreen(),
        '/farmer/create-supply': (context) {
          final preInvoice = ModalRoute.of(context)!.settings.arguments;
          return CreateSupplyScreen(preInvoice: preInvoice as PreInvoiceModel?);
        },
        '/agent/home': (context) => const AgentDashboardScreen(),
        '/agent/create-invoice': (context) => const CreatePreInvoiceScreen(),
        '/consumer/upload-bank-statement': (context) {
          final preInvoice = ModalRoute.of(context)!.settings.arguments as PreInvoiceModel;
          return UploadBankStatementScreen(preInvoice: preInvoice);
        },
      },
    );
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    await Future.delayed(const Duration(seconds: 2));
    final isLoggedIn = await StorageService.isLoggedIn();
    if (!mounted) return;
    
    if (isLoggedIn) {
      final user = await StorageService.getUser();
      if (!mounted) return;
      String route;
      switch (user?.userType) {
        case AppConstants.userTypeFarmer:
          route = '/farmer/home';
          break;
        case AppConstants.userTypeAgent:
          route = '/agent/home';
          break;
        case AppConstants.userTypeSupplier:
        case AppConstants.userTypeManufacturer:
        case AppConstants.userTypeDistributor:
          route = '/distributor/home';
          break;
        case AppConstants.userTypeRetailer:
        case AppConstants.userTypeConsumer:
          route = '/consumer/home';
          break;
        case AppConstants.userTypeQualityControl:
        case AppConstants.userTypeLogistics:
        case AppConstants.userTypeAdmin:
          route = '/distributor/home';
          break;
        default:
          route = '/industry-selection';
      }
      Navigator.pushReplacementNamed(context, route);
    } else {
      if (!mounted) return;
      Navigator.pushReplacementNamed(context, '/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.blue.shade600, Colors.blue.shade900],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: const Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.inventory_2, size: 100, color: Colors.white),
              SizedBox(height: 24),
              Text(
                'SupplyChain',
                style: TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 24),
              CircularProgressIndicator(color: Colors.white),
            ],
          ),
        ),
      ),
    );
  }
}
