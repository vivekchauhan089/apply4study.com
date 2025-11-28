let config = require('../config/config');
let request = require('request');
let notificationContent = require('../lib/notificationContent');
const phoneNoId = config.phoneID;
const metatk = config.METATK;

function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}

module.exports.sendWaNotification = async function (appData) {
    return new Promise(async (resolve, reject) => {
        var dataComps = [
            {
                type: "body",
                parameters: [
                    {
                        type: "text",
                        text: appData.name
                    }
                ]
            }
        ];

        if (typeof appData.otp != "undefined" && appData.otp != "") {
        	dataComps = [
            	{
	                type: "body",
	                parameters: [
	                    {
	                        type: "text",
	                        text: appData.name
	                    },
	                    {
	                        type: "text",
	                        text: appData.otp
	                    }
	                ]
	            }
	        ];
        }

        const sndFormData = {
            name: appData.template_name,
            language: { code: "en" },
            components: dataComps
        };

        const options = {
            url: `https://graph.facebook.com/v19.0/${phoneNoId}/messages`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${metatk}`
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: `91${appData.phone}`,
                type: "template",
                template: sndFormData
            })
        };

        request(options, async (err, res, body) => {
            if (err) {
                console.error("WhatsApp Error:", err);
                return reject(err);
            }

            // Optionally log response
            // console.log("WA Response:", body);

            await delay(500);
            return resolve(true);
        });
    });
};