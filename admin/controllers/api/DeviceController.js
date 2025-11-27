const DeviceInfo = require.main.require("./models/DeviceInfo");

async function register(req, res) {
  try {
    const {
      device_id,
      device_token,
      os,
      os_version,
      app_version,
      manufacturer,
      model,
    } = req.body;

    let device = await DeviceInfo.findOne({ device_id });

    if (!device) {
      device = await DeviceInfo.create({
        device_id,
        device_token,
        os,
        os_version,
        app_version,
        manufacturer,
        model,
      });
    } else {
      device.device_token = device_token;
      device.last_active = Date.now();
      await device.save();
    }

    res.json({ success: true, data: device });

  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}

module.exports = { register };
