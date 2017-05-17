const { ACCOUNT_SID, AUTH_TOKEN } = require('./twilio-keys');
const twilio = require('twilio');

module.exports = new twilio.Twilio(ACCOUNT_SID, AUTH_TOKEN);
