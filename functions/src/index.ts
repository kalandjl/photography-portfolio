import {onDocumentWritten} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import {logger} from "firebase-functions";

// Initialize Firebase Admin SDK
admin.initializeApp();

exports.twillioFirestoreReroute = onDocumentWritten({
    document: "messages/{docId}",
    secrets: ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "CLIENT_PHONE_NUMBER"],
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
        const clientPhoneNumber = process.env.CLIENT_PHONE_NUMBER

        const client = require('twilio')(accountSid, authToken);
        const message1 = await client.messages
            .create({
                body: `New message from "${messageData.name}", "${messageData.email}"Message: "${messageData.message}"`,
                from: '+13658326339',
                to: '+12366680975'
            })

        const message2 = await client.messages
            .create({
                body: `New message from "${messageData.name}", "${messageData.email}"Message: "${messageData.message}"`,
                from: '+13658326339',
                to: clientPhoneNumber
            })

        console.log("Message 1 status:", message1.status);
        console.log("Message 2 status:", message2.status);

        const smsRef = admin.firestore().collection("logs").doc();

        await smsRef.set({
            ...messageData,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            messages: [
            {
                to: "+12366680975",
                sid: message1.sid,
                status: message1.status,
            },
            {
                to: clientPhoneNumber,
                sid: message2.sid,
                status: message2.status,
            },
            ],
        });




      } catch (error: any) {
            console.error("Twilio error:", error);

            const smsRef = admin.firestore().collection("logs").doc();

            await smsRef.set({
                ...messageData,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                error: error.message,
                status: "failed",
        });      
        }
    }
  } else {
    logger.info("Document was deleted or does not exist after the change.");
  }
});


