import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:pull_to_refresh_flutter3/pull_to_refresh_flutter3.dart';
import '../providers/notification_provider.dart';

class NotificationScreen extends StatefulWidget {
  final VoidCallback? onBack; // ✅ add onBack callback
  
  const NotificationScreen({super.key, this.onBack});

  @override
  State<NotificationScreen> createState() => _NotificationScreenState();
}

class _NotificationScreenState extends State<NotificationScreen> {
  final RefreshController _refreshController = RefreshController();

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<NotificationProvider>(context, listen: false).fetchFromApi();
    });
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<NotificationProvider>(context);
    final groups = provider.grouped();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
        leading: widget.onBack != null
          ? IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: widget.onBack ?? () => Navigator.pop(context),
            )
          : null,
        actions: [
          IconButton(
            icon: const Icon(Icons.delete_sweep),
            onPressed: () => provider.clearAll(),
          ),
        ],
      ),

      body: Column(
        children: [
          Expanded(
            child: SmartRefresher(
                controller: _refreshController,
                enablePullDown: true,
                enablePullUp: true,

                onRefresh: () async {
                  await provider.refreshNotifications();
                  _refreshController.refreshCompleted();
                },

                onLoading: () async {
                  final more = await provider.loadMore();
                  more ? _refreshController.loadComplete() : _refreshController.loadNoData();
                },

                child: ListView(
                  physics: const BouncingScrollPhysics(),
                  shrinkWrap: true,
                  children: groups.entries.map((entry) {
                    final title = entry.key;
                    final list = entry.value;

                    if (list.isEmpty) return const SizedBox.shrink();

                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // ---------- Group Header ----------
                        Padding(
                          padding: const EdgeInsets.fromLTRB(16, 16, 16, 6),
                          child: Text(
                            title,
                            style: const TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),

                        // ---------- Notification Cards ----------
                        ...list.map((n) {
                          return GestureDetector(
                            onLongPress: () => provider.deleteNotification(n.id),
                            onTap: () => provider.markAsRead(n.id),

                            child: Container(
                              margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 12),
                              padding: const EdgeInsets.all(14),
                              decoration: BoxDecoration(
                                color: n.isRead ? Colors.white : Colors.blue.shade50,
                                borderRadius: BorderRadius.circular(12),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.06),
                                    blurRadius: 4,
                                    offset: const Offset(0, 2),
                                  ),
                                ],
                              ),

                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  // ---------- Image ----------
                                  if (n.image != null && n.image!.isNotEmpty)
                                    ClipRRect(
                                      borderRadius: BorderRadius.circular(8),
                                      child: Image.network(
                                        n.image!,
                                        width: 50,
                                        height: 50,
                                        fit: BoxFit.cover,
                                        errorBuilder: (_, __, ___) =>
                                            const Icon(Icons.broken_image, size: 40),
                                      ),
                                    )
                                  else
                                    Container(
                                      width: 50,
                                      height: 50,
                                      decoration: BoxDecoration(
                                        color: Colors.grey.shade200,
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: const Icon(Icons.notifications, color: Colors.grey),
                                    ),

                                  const SizedBox(width: 12),

                                  // ---------- Title + Message ----------
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          n.title,
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                          style: TextStyle(
                                            fontSize: 16,
                                            fontWeight:
                                                n.isRead ? FontWeight.w500 : FontWeight.bold,
                                          ),
                                        ),

                                        const SizedBox(height: 5),

                                        Text(
                                          n.message,
                                          maxLines: 2,
                                          overflow: TextOverflow.ellipsis,
                                          style: const TextStyle(
                                            fontSize: 14,
                                            color: Colors.black87,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),

                                  const SizedBox(width: 10),

                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      // ---------- Time Ago ----------
                                      Text(
                                        provider.humanTime(n.timestamp),
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: Colors.grey.shade600,
                                        ),
                                      ),

                                      const SizedBox(height: 6),

                                      // ---------- Unread DOT ----------
                                      if (!n.isRead)
                                        Container(
                                          width: 10,
                                          height: 10,
                                          decoration: const BoxDecoration(
                                            color: Colors.blue,
                                            shape: BoxShape.circle,
                                          ),
                                        ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          );
                        }),
                      ],
                    );
                  }).toList(),
                ),
              ),
          ),
        ],
      ),
    );
  }
}
