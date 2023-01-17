import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_API_KEY`,
  authDomain: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_AUTH_DOMAIN`,
  projectId: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_PROJECT_ID`,
  storageBucket: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_STORAGE_BUCKET`,
  messagingSenderId: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_SENDER_ID`,
  appId: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_APP_ID`,
  measurementId: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_MEASUREMENT_ID`,
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: `REPLACE_WITH_YOUR_VAPID_KEY` })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Send the token to your server and update the UI if necessary
        fetch("http://localhost:3000/test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: currentToken }),
        });
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
