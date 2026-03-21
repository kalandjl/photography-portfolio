import {onDocumentWritten} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import {logger} from "firebase-functions";

// Initialize Firebase Admin SDK
admin.initializeApp();

exports.twillioFirestoreReroute = onDocumentWritten({
    document: "messages/{docId}",
    secrets: ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN"],
  }, async (event) => {
  const change: any = event.data;

  if (!change) {
    logger.error("No change data found.");
    return;
  }

  const afterDoc = change.after;

  if (afterDoc.exists) {
    const messageData = afterDoc.data();

    if (messageData) {
      try {
        // const smsRef = admin.firestore().collection("sms").doc();

        // await smsRef.set({
        //   ...messageData,
        //   createdAt: admin.firestore.FieldValue.serverTimestamp(),
        //   to: "+12366680975",
        //   body: 
        //   `New message from "${messageData.name}", "${messageData.email}" Message: "${messageData.message}"`
        // });
        // await smsRef.set({
        //   ...messageData,
        //   createdAt: admin.firestore.FieldValue.serverTimestamp(),
        //   to: "+17789576007",
        //   body: 
        //   `New message from "${messageData.name}", "${messageData.email}"Message: "${messageData.message}"`
        // });

        // logger.info(
        //   `Document added to 'sms' collection with ID: ${smsRef.id}`
        // );

        const accountSid = process.env.TWILIO_ACCOUNT_SID
        const authToken = process.env.TWILIO_AUTH_TOKEN
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: `New message from "${messageData.name}", "${messageData.email}"Message: "${messageData.message}"`,
                from: '+13658326339',
                to: '+12366680975'
            })
            .then((message: any) => console.log(message.sid));


      } catch (error) {
        logger.error("Error adding document to 'sms' collection:", error);
      }
    }
  } else {
    logger.info("Document was deleted or does not exist after the change.");
  }
});


