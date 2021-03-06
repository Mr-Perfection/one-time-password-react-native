# one-time-password-react-native

### Description
I will be building a one time password authentication using React Native.

### Tech Stack
* **React Native:** show user a form to sign-up and sign-in.
* **Twillo:** send text messages to users.
* **Firebase:** store user data, including user accounts and correct one-time password codes.
* **Google Cloud Function:** tiny bits of code that run one time on demand. Has access to data in Firebase.

### User Flow and Approach
#### *Basic user flow*
![alt text](../demo/basicFlow.png "basic user flow")

#### *Best Approach*
![alt text](../demo/approach.png "approach")

#### *Handling a New User*

*Cloud function #1*
1. User enters email and phone
2. Verify phone is not in use
3. Create a new user record in Firebase


*Cloud function #2*
4. User requests to log-in with phone number
5. Generate code
6. Save the code to the user's record
7. Text the code to the user


*Cloud function #3*
8. User enters code
9. Compare codes
10. Mark code as no longer being valid
11. Return a JWT (JSON Web Token) to user


### Create a Firebase Project
[Create Project here](https://console.firebase.google.com)
```bash
npm install -g firebase-tools # install firebase-tools npm package globally if not done so.
```
[npm package description here](https://www.npmjs.com/package/firebase-tools)

### Set up local Firebase Project
```bash
firebase login
firebase init
firebase deploy --project one-time-password-f9af0 
```
* Firebase project is comprised of:
Data store -> Service Client -> function #1...n

* *Service Client* has direct access to cloud functions. *Data Store* can have access to those via *Service Client*.

```js
// Make sure to get a private key before using this Service Account.
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-f9af0.firebaseio.com"
});
```


### Write Cloud Function to create a user

```js
// index.js
const createUser = require('./create-user');
exports.createUser = functions.https.onRequest(createUser);

// create-user.js
// Create a new user account using that phone number
admin.auth().createUser({ uid: phone })
.then(user => response.send(user))
.catch(err => response.status(422).send({ error: err }));
```
### Sign up for Twilio
```bash
npm install --save twilio@3.0.0-rc.13 # install twilio client
```

```js
// twilio.js
import { ACCOUNT_SID, AUTH_TOKEN } from './twilio-keys';

const twilio = require('twilio');

module.exports = twilio.Twillo(ACCOUNT_SID, AUTH_TOKEN);

admin.auth().getUser(phone)
.then(userRecord => {
  const code = Math.floor((Math.random() * 8999) + 1000);

  twilio.messages.create({
    body: `your code is + ${code}`,
    to: phone,
    from: '+19499545308'
  });
})
.catch((err) => {
  response.status(422).send({ error: err });
});
```

### Write Function to generate and text a user
Check out [this file](functions/request-one-time-password.js)

### Source
[Stephen Grider's React Native](https://www.udemy.com/react-native-advanced)
