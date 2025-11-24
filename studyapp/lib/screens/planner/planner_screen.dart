import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
// import '../shared/widgets/bottom_nav.dart';

class PlannerScreen extends StatefulWidget {
  const PlannerScreen({super.key});

  @override
  State<PlannerScreen> createState() => _PlannerScreenState();
}

class _PlannerScreenState extends State<PlannerScreen> {
  late final ValueNotifier<List<String>> _selectedTasks;
  CalendarFormat _calendarFormat = CalendarFormat.month;
  DateTime _focusedDay = DateTime.now();
  DateTime _selectedDay = DateTime.now();
  Map<String, List<String>> _tasks = {}; // Key: YYYY-MM-DD

  final TextEditingController _taskController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _selectedTasks = ValueNotifier(_getTasksForDay(_selectedDay));
    _loadTasks();
  }

  @override
  void dispose() {
    _selectedTasks.dispose();
    super.dispose();
  }

  List<String> _getTasksForDay(DateTime day) {
    final key = day.toIso8601String().split('T')[0];
    return _tasks[key] ?? [];
  }

  Future<void> _loadTasks() async {
    final prefs = await SharedPreferences.getInstance();
    final String? tasksJson = prefs.getString('planner_tasks');
    if (tasksJson != null) {
      setState(() {
        _tasks = Map<String, List<String>>.from(
          (json.decode(tasksJson) as Map).map(
            (k, v) => MapEntry(k, List<String>.from(v)),
          ),
        );
        _selectedTasks.value = _getTasksForDay(_selectedDay);
      });
    }
  }

  Future<void> _saveTasks() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('planner_tasks', json.encode(_tasks));
  }

  void _addTask(String task) {
    final key = _selectedDay.toIso8601String().split('T')[0];
    if (_tasks.containsKey(key)) {
      _tasks[key]!.add(task);
    } else {
      _tasks[key] = [task];
    }
    _saveTasks();
    _taskController.clear();
    setState(() {
      _selectedTasks.value = _getTasksForDay(_selectedDay);
    });
  }

  void _deleteTask(String task) {
    final key = _selectedDay.toIso8601String().split('T')[0];
    _tasks[key]?.remove(task);
    if (_tasks[key]?.isEmpty ?? false) _tasks.remove(key);
    _saveTasks();
    setState(() {
      _selectedTasks.value = _getTasksForDay(_selectedDay);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Planner")),
      body: Column(
        children: [
          // 📅 Calendar
          TableCalendar<String>(
            firstDay: DateTime(2000),
            lastDay: DateTime(2100),
            focusedDay: _focusedDay,
            calendarFormat: _calendarFormat,
            selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
            eventLoader: _getTasksForDay,
            onDaySelected: (selectedDay, focusedDay) {
              setState(() {
                _selectedDay = selectedDay;
                _focusedDay = focusedDay;
                _selectedTasks.value = _getTasksForDay(selectedDay);
              });
            },
            onFormatChanged: (format) {
              setState(() {
                _calendarFormat = format;
              });
            },
            calendarStyle: const CalendarStyle(
              todayDecoration: BoxDecoration(
                color: Colors.orange,
                shape: BoxShape.circle,
              ),
              selectedDecoration: BoxDecoration(
                color: Colors.blue,
                shape: BoxShape.circle,
              ),
            ),
          ),

          const SizedBox(height: 8),

          // 📝 Tasks List
          Expanded(
            child: ValueListenableBuilder<List<String>>(
              valueListenable: _selectedTasks,
              builder: (context, tasks, _) {
                if (tasks.isEmpty) {
                  return const Center(child: Text("No tasks for this day."));
                }
                return ListView.builder(
                  itemCount: tasks.length,
                  itemBuilder: (context, index) {
                    final task = tasks[index];
                    return ListTile(
                      title: Text(task),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () => _deleteTask(task),
                      ),
                    );
                  },
                );
              },
            ),
          ),

          // ➕ Add Task Input
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _taskController,
                    decoration: const InputDecoration(
                      hintText: "Enter task",
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(
                  onPressed: () {
                    if (_taskController.text.isNotEmpty) _addTask(_taskController.text);
                  },
                  child: const Text("Add"),
                ),
              ],
            ),
          ),
        ],
      ),
      // bottomNavigationBar: const BottomNav(),
    );
  }
}
