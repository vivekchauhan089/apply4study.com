const Notification = require("../models/Notification");

module.exports = {
  
  // Send (create) a new notification
  async sendNotification(req, res) {
    try {
      const { user_id, title, message } = req.body;

      const notify = new Notification({
        user_id,
        title,
        message
      });

      await notify.save();

      res.status(201).json({
        success: true,
        data: notify
      });
    } catch (err) {
      console.error("Notification Error:", err);
      res.status(500).json({ success: false, message: "Failed to send notification" });
    }
  },

  // Get all notifications for a user
  async getUserNotifications(req, res) {
    try {
      const { user_id, page = 1, limit = 10 } = req.body;

      if (!user_id) {
        return res.status(400).json({
          success: false,
          message: "user_id is required",
        });
      }

      const skip = (page - 1) * limit;

      // Fetch notifications
      const [notifications, total] = await Promise.all([
        Notification.find({ user_id })
          .sort({ created_at: -1 })
          .skip(skip)
          .limit(parseInt(limit)),
          
        Notification.countDocuments({ user_id }),
      ]);

      return res.status(200).json({
        success: true,
        total,
        current_page: parseInt(page),
        per_page: parseInt(limit),
        total_pages: Math.ceil(total / limit),
        data: notifications,
      });

    } catch (error) {
      console.error("Error fetching notifications:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to load notifications",
      });
    }
  },

  // Mark notification as read
  async markAsRead(req, res) {
    try {
      const { user_id, notification_ids } = req.body;
      if (!user_id) return res.status(400).json({ success: false, message: "user_id required" });

      let filter = { user_id, is_read: false };

      if (notification_ids && notification_ids.length > 0) {
        filter._id = { $in: notification_ids };
      }

      await Notification.updateMany(filter, {
        is_read: true,
        read_at: new Date()
      });

      res.status(200).json({ success: true, message: "Notifications marked as read" });

    } catch (error) {
      console.error("Mark Read Error:", error);
      res.status(500).json({ success: false, message: "Failed to mark notifications as read" });
    }
  },

  // Delete notification
  async deleteNotification(req, res) {
    try {
      const { user_id, notification_ids } = req.body;
      if (!user_id) return res.status(400).json({ success: false, message: "user_id required" });

      let filter = { user_id };

      if (notification_ids && notification_ids.length > 0) {
        filter._id = { $in: notification_ids };
      }

      await Notification.deleteMany(filter);

      res.status(200).json({ success: true, message: "Notifications deleted successfully" });

    } catch (error) {
      console.error("Delete Notification Error:", error);
      res.status(500).json({ success: false, message: "Failed to delete notifications" });
    }
  }

};
