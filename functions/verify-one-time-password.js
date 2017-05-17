const admin = require('firebase-admin');

module.exports = (request, response) => {
  if (!request.body.phone || !request.body.code) {
    return response.status(422).send({ error: 'phone and code must be provided.' });
  }

  const phone = String(request.body.phone).replace(/[^\d]/g, '');
  const code = parseInt(request.body.code, 10);

  admin.auth().getUser(phone)
  .then(() => {
    const ref = admin.database().ref(`users/${phone}`);
    ref.on('value', snapshot => {
      ref.off();
      const user = snapshot.val();

      if (user.code !== code || !user.codeValid) {
        return response.status(422).send({ error: `user code ${user.code} not valid!` });
      }

      ref.update({ codeValid: false });
      admin.auth().createCustomToken(phone)
        .then(token => response.send({ token }));
    });
  })
  .catch((err) => response.status(422).send({ error: err }));
};
