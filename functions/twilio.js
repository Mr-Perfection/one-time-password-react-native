const keys = require('./twilio-keys');
const twilio = require('twilio');

module.exports = twilio.Twilio(keys.ACCOUNT_SID, keys.AUTH_TOKEN);
