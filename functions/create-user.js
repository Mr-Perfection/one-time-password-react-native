const admin = require('firebase-admin');

module.exports = (request, response) => {
  // Verify user provided a phone
  if (!request.body.phone) {
    return response.status.send({ error: 'Bad Input' });
  }

  // Format the phone number to remove dashes and parens
  const phone = String(request.body.phone).replace(/[^\d]/g, '');
  if (phone.length !== 10) {
    return response.status.send({ error: 'Phone number is wrong. Follow US phone numbe pattern.' });
  }

  // Create a new user account using that phone number
  admin.auth().createUser({ uid: phone })
  .then(user => response.send(user))
  .catch(err => response.status(422).send({ error: err }));
  // Respond to the user's request, saying the account was made.
};
