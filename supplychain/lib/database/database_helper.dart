import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../models/cart_model.dart';

class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._init();
  static Database? _database;

  DatabaseHelper._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('supplychain.db');
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);
    return await openDatabase(path, version: 1, onCreate: _createDB);
  }

  Future _createDB(Database db, int version) async {
    await db.execute('''
      CREATE TABLE cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        price REAL NOT NULL,
        image_url TEXT,
        quantity INTEGER NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE orders_cache (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT NOT NULL,
        shipping_address TEXT,
        courier_service TEXT,
        tracking_number TEXT,
        delivery_date TEXT,
        created_at TEXT NOT NULL
      )
    ''');
  }

  // Cart Operations
  Future<int> addToCart(CartItem item) async {
    final db = await database;
    final existing = await db.query(
      'cart',
      where: 'product_id = ?',
      whereArgs: [item.productId],
    );

    if (existing.isNotEmpty) {
      final currentQuantity = existing.first['quantity'] as int? ?? 0;
      return await db.update(
        'cart',
        {'quantity': item.quantity + currentQuantity},
        where: 'product_id = ?',
        whereArgs: [item.productId],
      );
    }
    return await db.insert('cart', item.toJson());
  }

  Future<List<CartItem>> getCartItems() async {
    final db = await database;
    final result = await db.query('cart');
    return result.map((json) => CartItem.fromJson(json)).toList();
  }

  Future<int> updateCartItem(int productId, int quantity) async {
    final db = await database;
    return await db.update(
      'cart',
      {'quantity': quantity},
      where: 'product_id = ?',
      whereArgs: [productId],
    );
  }

  Future<int> removeFromCart(int productId) async {
    final db = await database;
    return await db.delete('cart', where: 'product_id = ?', whereArgs: [productId]);
  }

  Future<int> clearCart() async {
    final db = await database;
    return await db.delete('cart');
  }

  Future close() async {
    final db = await database;
    db.close();
  }
}
