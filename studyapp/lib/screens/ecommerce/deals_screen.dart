import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../services/api_service.dart';

class Deal {
  final String id;
  final String title;
  final String vendor;
  final double price;
  final double originalPrice;
  final String image;

  Deal({required this.id, required this.title, required this.vendor, required this.price, required this.originalPrice, this.image = ''});

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'vendor': vendor,
        'price': price,
        'originalPrice': originalPrice,
        'image': image,
      };

  static Deal fromJson(Map<String, dynamic> j) => Deal(
        id: j['id'],
        title: j['title'],
        vendor: j['vendor'],
        price: (j['price'] as num).toDouble(),
        originalPrice: (j['originalPrice'] as num).toDouble(),
        image: j['image'] ?? '',
      );
}

class CartItem {
  final Deal deal;
  int qty;
  CartItem({required this.deal, this.qty = 1});

  Map<String, dynamic> toJson() => {'deal': deal.toJson(), 'qty': qty};

  static CartItem fromJson(Map<String, dynamic> j) => CartItem(deal: Deal.fromJson(j['deal']), qty: (j['qty'] as num).toInt());
}

class DealsScreen extends StatefulWidget {
  const DealsScreen({super.key});

  @override
  State<DealsScreen> createState() => _DealsScreenState();
}

class _DealsScreenState extends State<DealsScreen> {
  final List<Deal> _catalog = [];
  final List<String> _wishlist = [];
  final List<CartItem> _cart = [];
  String _query = '';
  String _sort = 'Recommended';
  String _appliedCoupon = '';

  @override
  void initState() {
    super.initState();
    _buildMockCatalog();
    _loadState();
  }

  void _buildMockCatalog() {
    _catalog.clear();
    _catalog.addAll([
      Deal(id: 'd1', title: 'Wireless Earbuds', vendor: 'SoundCo', price: 1499, originalPrice: 2999, image: ''),
      Deal(id: 'd2', title: 'Smart Watch', vendor: 'TimeTech', price: 3499, originalPrice: 6999, image: ''),
      Deal(id: 'd3', title: 'Backpack', vendor: 'CarryAll', price: 799, originalPrice: 1599, image: ''),
      Deal(id: 'd4', title: 'Portable Speaker', vendor: 'BeatBox', price: 1299, originalPrice: 2499, image: ''),
      Deal(id: 'd5', title: 'Fitness Band', vendor: 'FitLife', price: 999, originalPrice: 1999, image: ''),
    ]);
  }

  Future<void> _loadState() async {
    final prefs = await SharedPreferences.getInstance();
    // Try loading from API first (if configured)
    try {
      final data = await ApiService.instance.fetchDeals();
      // Map API response to Deal model if possible
      _catalog.clear();
      for (final item in data) {
        if (item is Map<String, dynamic>) {
          _catalog.add(Deal.fromJson(item));
        }
      }
    } catch (_) {
      // Ignore API errors and fall back to local catalog
    }

    final rawWish = prefs.getStringList('ecom_wishlist') ?? [];
    final rawCart = prefs.getStringList('ecom_cart') ?? [];
    setState(() {
      _wishlist.clear();
      _wishlist.addAll(rawWish);
      _cart.clear();
      _cart.addAll(rawCart.map((s) => CartItem.fromJson(jsonDecode(s) as Map<String, dynamic>)));
      _appliedCoupon = prefs.getString('ecom_coupon') ?? '';
    });
  }

  Future<void> _saveState() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList('ecom_wishlist', _wishlist);
    await prefs.setStringList('ecom_cart', _cart.map((c) => jsonEncode(c.toJson())).toList());
    await prefs.setString('ecom_coupon', _appliedCoupon);
  }

  void _toggleWishlist(Deal d) async {
    setState(() {
      if (_wishlist.contains(d.id)) {
        _wishlist.remove(d.id);
      } else {
        _wishlist.insert(0, d.id);
      }
    });
    await _saveState();
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(_wishlist.contains(d.id) ? 'Added to wishlist' : 'Removed from wishlist')));
    }
  }

  void _addToCart(Deal d) async {
    final existing = _cart.where((c) => c.deal.id == d.id).toList();
    setState(() {
      if (existing.isNotEmpty) {
        existing.first.qty++;
      } else {
        _cart.add(CartItem(deal: d, qty: 1));
      }
    });
    await _saveState();
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Added to cart')));
    }
  }

  void _removeFromCart(String id) async {
    setState(() => _cart.removeWhere((c) => c.deal.id == id));
    await _saveState();
  }

  double get _cartTotal => _cart.fold(0.0, (p, c) => p + c.deal.price * c.qty);

  double get _discountedTotal {
    var total = _cartTotal;
    if (_appliedCoupon.toUpperCase() == 'SAVE10') total = total * 0.9;
    return total;
  }

  Future<void> _applyCouponDialog() async {
    final ctrl = TextEditingController(text: _appliedCoupon);
    final res = await showDialog<bool>(context: context, builder: (c) => AlertDialog(
      title: const Text('Apply Coupon'),
      content: TextField(controller: ctrl, decoration: const InputDecoration(labelText: 'Coupon code')),
      actions: [TextButton(onPressed: () => Navigator.pop(c, false), child: const Text('Cancel')), ElevatedButton(onPressed: () => Navigator.pop(c, true), child: const Text('Apply'))],
    ));
    if (res != true) return;
    setState(() => _appliedCoupon = ctrl.text.trim());
    await _saveState();
    if (mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Coupon applied')));
  }

  @override
  Widget build(BuildContext context) {
    final filtered = _catalog.where((d) => d.title.toLowerCase().contains(_query.toLowerCase()) || d.vendor.toLowerCase().contains(_query.toLowerCase())).toList();
    if (_sort == 'Price: Low') {
      filtered.sort((a,b) => a.price.compareTo(b.price));
    }
    if (_sort == 'Price: High') {
      filtered.sort((a,b) => b.price.compareTo(a.price));
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Deals & Offers')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(12.0),
            child: Row(children: [
              Expanded(child: TextField(decoration: const InputDecoration(prefixIcon: Icon(Icons.search), hintText: 'Search deals'), onChanged: (v) => setState(() => _query = v))),
              const SizedBox(width: 8),
              PopupMenuButton<String>(onSelected: (v) => setState(() => _sort = v), itemBuilder: (_) => const [PopupMenuItem(value: 'Recommended', child: Text('Recommended')), PopupMenuItem(value: 'Price: Low', child: Text('Price: Low')), PopupMenuItem(value: 'Price: High', child: Text('Price: High'))], icon: const Icon(Icons.sort)),
            ]),
          ),

          Expanded(
            child: filtered.isEmpty
                ? const Center(child: Text('No deals found'))
                : ListView.builder(
                    itemCount: filtered.length,
                    itemBuilder: (c, i) {
                      final d = filtered[i];
                      final saved = _wishlist.contains(d.id);
                      final discount = ((d.originalPrice - d.price) / d.originalPrice * 100).round();
                      return Card(
                        margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        child: ListTile(
                          leading: Container(width: 56, height: 56, color: Colors.grey.shade200, child: const Icon(Icons.shopping_bag)),
                          title: Text(d.title),
                          subtitle: Text('${d.vendor} • ₹${d.price.toStringAsFixed(0)}  ${discount>0? '• $discount% off':''}'),
                          trailing: Column(mainAxisSize: MainAxisSize.min, children: [
                            IconButton(icon: Icon(saved? Icons.favorite : Icons.favorite_border, color: saved? Colors.red : null), onPressed: () => _toggleWishlist(d)),
                            ElevatedButton(onPressed: () => _addToCart(d), child: const Text('Add')),
                          ]),
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          // show cart
          await showModalBottomSheet(context: context, builder: (c) => _buildCartSheet());
          setState((){});
        },
        label: Text('Cart (${_cart.length})'),
        icon: const Icon(Icons.shopping_cart),
      ),
      persistentFooterButtons: [
        TextButton(onPressed: _applyCouponDialog, child: Text(_appliedCoupon.isEmpty ? 'Apply Coupon' : 'Coupon: $_appliedCoupon')),
        Text('Total: ₹${_discountedTotal.toStringAsFixed(2)}'),
      ],
    );
  }

  Widget _buildCartSheet() {
    // Use a constrained height for the bottom sheet and make the list scrollable
    final maxHeight = MediaQuery.of(context).size.height * 0.65;
    return SafeArea(
      child: SizedBox(
        height: maxHeight,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Row(
                children: [
                  const Text('Your Cart', style: TextStyle(fontWeight: FontWeight.bold)),
                  const Spacer(),
                  Text('₹${_discountedTotal.toStringAsFixed(2)}')
                ],
              ),
            ),

            if (_cart.isEmpty)
              const Padding(padding: EdgeInsets.all(20), child: Text('Cart is empty'))
            else
              Expanded(
                child: ListView.builder(
                  itemCount: _cart.length,
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  itemBuilder: (c, i) {
                    final it = _cart[i];
                    return ListTile(
                      leading: const Icon(Icons.shopping_bag),
                      title: Text(it.deal.title),
                      subtitle: Text('₹${it.deal.price.toStringAsFixed(2)} x ${it.qty}'),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.remove_circle_outline),
                            onPressed: () async {
                              setState(() => it.qty = it.qty > 1 ? it.qty - 1 : 1);
                              await _saveState();
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.add_circle_outline),
                            onPressed: () async {
                              setState(() => it.qty++);
                              await _saveState();
                            },
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete_outline),
                            onPressed: () async {
                              _removeFromCart(it.deal.id);
                            },
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),

            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _cart.isEmpty
                          ? null
                          : () async {
                              // simulate checkout
                              if (!mounted) return;
                              setState(() {});
                              await Future.delayed(const Duration(seconds: 1));
                              setState(() => _cart.clear());
                              await _saveState();
                              if (mounted) {
                                Navigator.pop(context);
                                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Order placed')));
                              }
                            },
                      child: const Text('Checkout'),
                    ),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
