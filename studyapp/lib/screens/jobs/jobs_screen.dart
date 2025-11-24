import 'dart:async';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../services/api_service.dart';

class Job {
  final String id;
  final String title;
  final String company;
  final String location;
  final String salary;
  final String description;

  Job({
    required this.id,
    required this.title,
    required this.company,
    required this.location,
    required this.salary,
    required this.description,
  });
}

class JobsScreen extends StatefulWidget {
  const JobsScreen({super.key});

  @override
  State<JobsScreen> createState() => _JobsScreenState();
}

class _JobsScreenState extends State<JobsScreen> {
  final List<Job> _jobs = [];
  final ScrollController _scrollController = ScrollController();
  final TextEditingController _searchCtrl = TextEditingController();

  bool _loading = false;
  bool _loadingMore = false;
  bool _hasMore = true;
  String? _error;
  int _page = 1;
  String _query = '';
  Set<String> _bookmarks = {};

  @override
  void initState() {
    super.initState();
    _loadBookmarks();
    _fetchJobs(refresh: true);
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _searchCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadBookmarks() async {
    final prefs = await SharedPreferences.getInstance();
    final list = prefs.getStringList('bookmarked_jobs') ?? [];
    setState(() => _bookmarks = list.toSet());
  }

  Future<void> _toggleBookmark(String id) async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      if (_bookmarks.contains(id)) {
        _bookmarks.remove(id);
      } else {
        _bookmarks.add(id);
      }
    });
    await prefs.setStringList('bookmarked_jobs', _bookmarks.toList());
  }

  // Mock fetch - replace with real API call. Supports pagination and search.
  Future<List<Job>> _fetchFromServer({required int page, String query = ''}) async {
    try {
      final data = await ApiService.instance.fetchJobs(query: query, page: page);
      final List<Job> parsed = [];
      for (final item in data) {
        if (item is Map<String, dynamic>) {
          parsed.add(Job(
            id: item['id']?.toString() ?? DateTime.now().millisecondsSinceEpoch.toString(),
            title: item['title'] ?? 'Role',
            company: item['company'] ?? '',
            location: item['location'] ?? '',
            salary: item['salary']?.toString() ?? '',
            description: item['description'] ?? '',
          ));
        }
      }
      return parsed;
    } catch (_) {
      // fallback to local mock generation
      await Future.delayed(const Duration(seconds: 1)); // simulate network
      if (page > 5) return [];
      final base = (page - 1) * 10;
      final List<Job> items = List.generate(10, (i) {
        final idx = base + i + 1;
        final title = query.isEmpty ? 'Software Engineer $idx' : '$_query Role $idx';
        return Job(
          id: 'job_$idx',
          title: title,
          company: 'Company ${idx % 7 + 1}',
          location: ['Remote', 'Bengaluru', 'Mumbai', 'Delhi'][idx % 4],
          salary: (40000 + (idx % 10) * 2500).toString(),
          description: 'This is a sample description for job $idx. Responsibilities include building features and collaborating with teams.',
        );
      });
      if (query.isNotEmpty) {
        return items.where((j) => j.title.toLowerCase().contains(query.toLowerCase()) || j.company.toLowerCase().contains(query.toLowerCase())).toList();
      }
      return items;
    }
  }

  Future<void> _fetchJobs({bool refresh = false}) async {
    if (_loading || _loadingMore) return;
    setState(() {
      _error = null;
      if (refresh) {
        _loading = true;
        _page = 1;
        _hasMore = true;
      } else {
        _loadingMore = true;
      }
    });

    try {
      final pageToLoad = refresh ? 1 : _page + 1;
      final items = await _fetchFromServer(page: pageToLoad, query: _query);

      setState(() {
        if (refresh) {
          _jobs.clear();
          _jobs.addAll(items);
          _page = 1;
        } else {
          _jobs.addAll(items);
          _page = pageToLoad;
        }
        _hasMore = items.isNotEmpty;
      });
    } catch (e) {
      setState(() => _error = 'Failed to load jobs: $e');
    } finally {
      setState(() {
        _loading = false;
        _loadingMore = false;
      });
    }
  }

  void _onScroll() {
    if (!_hasMore || _loadingMore || _loading) return;
    if (_scrollController.position.pixels > _scrollController.position.maxScrollExtent - 200) {
      _fetchJobs(refresh: false);
    }
  }

  Future<void> _onRefresh() async {
    await _fetchJobs(refresh: true);
  }

  void _onSearchSubmitted(String q) {
    setState(() {
      _query = q.trim();
    });
    _fetchJobs(refresh: true);
  }

  void _openJobDetail(Job job) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) {
        return Padding(
          padding: MediaQuery.of(context).viewInsets,
          child: Container(
            padding: const EdgeInsets.all(16),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(child: Text(job.title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
                    IconButton(
                      icon: Icon(_bookmarks.contains(job.id) ? Icons.bookmark : Icons.bookmark_border),
                      onPressed: () => _toggleBookmark(job.id),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text('${job.company} • ${job.location}'),
                const SizedBox(height: 12),
                Text(job.description),
                const SizedBox(height: 18),
                Row(
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pop(context);
                        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Applied (mock)')));
                      },
                      child: const Text('Apply'),
                    ),
                    const SizedBox(width: 12),
                    OutlinedButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Close'),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Jobs'),
        actions: [
          IconButton(
            icon: const Icon(Icons.bookmarks),
            onPressed: () {
              // show bookmarked jobs
              final bookmarked = _jobs.where((j) => _bookmarks.contains(j.id)).toList();
              showModalBottomSheet(
                context: context,
                builder: (context) => ListView(
                  children: bookmarked.isEmpty
                      ? [const ListTile(title: Text('No bookmarks'))]
                      : bookmarked.map((j) => ListTile(
                          title: Text(j.title),
                          subtitle: Text('${j.company} • ${j.location}'),
                          onTap: () {
                            Navigator.pop(context);
                            _openJobDetail(j);
                          },
                        )).toList(),
                ),
              );
            },
          )
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              child: TextField(
                controller: _searchCtrl,
                textInputAction: TextInputAction.search,
                onSubmitted: _onSearchSubmitted,
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.search),
                  hintText: 'Search jobs or companies',
                  suffixIcon: _searchCtrl.text.isNotEmpty
                      ? IconButton(
                          icon: const Icon(Icons.clear),
                          onPressed: () {
                            _searchCtrl.clear();
                            _onSearchSubmitted('');
                          },
                        )
                      : null,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
            ),
            Expanded(
              child: RefreshIndicator(
                onRefresh: _onRefresh,
                child: _loading && _jobs.isEmpty
                    ? const Center(child: CircularProgressIndicator())
                    : _error != null && _jobs.isEmpty
                        ? ListView(children: [
                            Center(child: Padding(
                              padding: const EdgeInsets.all(24.0),
                              child: Column(
                                children: [
                                  Text(_error!),
                                  const SizedBox(height: 12),
                                  ElevatedButton(onPressed: () => _fetchJobs(refresh: true), child: const Text('Retry'))
                                ],
                              ),
                            )),
                          ])
                        : ListView.builder(
                            controller: _scrollController,
                            itemCount: _jobs.length + (_loadingMore ? 1 : 0),
                            itemBuilder: (context, index) {
                              if (index >= _jobs.length) {
                                return const Padding(
                                  padding: EdgeInsets.symmetric(vertical: 12),
                                  child: Center(child: CircularProgressIndicator()),
                                );
                              }
                              final job = _jobs[index];
                              return ListTile(
                                title: Text(job.title),
                                subtitle: Text('${job.company} • ${job.location}'),
                                trailing: IconButton(
                                  icon: Icon(_bookmarks.contains(job.id) ? Icons.bookmark : Icons.bookmark_border),
                                  onPressed: () => _toggleBookmark(job.id),
                                ),
                                onTap: () => _openJobDetail(job),
                              );
                            },
                          ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
