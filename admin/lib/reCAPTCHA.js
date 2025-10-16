let router = require('express').Router();
let config = require('../config/config');
let request = require('request');

// ✅ Verify reCAPTCHA with request
const verifyRecaptcha = async (recaptchaToken) => {
  return new Promise((resolve, reject) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;

    const formData = {
      secret,
      response: recaptchaToken,
    };

    request.post({ url: verifyUrl, form: formData }, (err, httpResponse, body) => {
      if (err) {
        return reject(new Error("Failed to connect to Google reCAPTCHA service"));
      }

      try {
        const data = JSON.parse(body);
        if (data.success) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (parseErr) {
        reject(new Error("Invalid reCAPTCHA response"));
      }
    });
  });
};
