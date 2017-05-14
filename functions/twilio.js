import { ACCOUNT_SID, AUTH_TOKEN } from './twilio-keys';

const twilio = require('twilio');

module.exports = twilio.Twillo(ACCOUNT_SID, AUTH_TOKEN);
