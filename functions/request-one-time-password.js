const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = (request, response) => {
  if (!request.body.phone) {
    return response.status(422).send({ error: 'You must provide a phone number!' });
  }

  // sanitize the phone string
  const phone = String(request.body.phone).replace(/[^\d]/g, '');

  admin.auth().getUser(phone)
  .then(userRecord => {
    const code = Math.floor((Math.random() * 8999) + 1000);
    const codeValid = true;

    twilio.messages.create({
      body: `your code is + ${code}`,
      to: phone,
      from: '+19499545308'
    }, (err) => {
      if (err) { return response.status(422).send(err); }

      admin.database().ref(`users/${phone}`)
        .update({ code, codeValid }, () => {
          response.send({ success: true });
        });
    });
  })
  .catch((err) => {
    response.status(422).send({ err });
  });
};
