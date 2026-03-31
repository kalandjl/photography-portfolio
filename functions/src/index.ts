// import {onDocumentWritten} from "firebase-functions/v2/firestore";
// import * as admin from "firebase-admin";
// import {logger} from "firebase-functions";
// import { HttpsError, onCall } from "firebase-functions/https";

// // Initialize Firebase Admin SDK
// admin.initializeApp();

// exports.twillioFirestoreReroute = onDocumentWritten({
//     document: "messages/{docId}",
//     secrets: ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "CLIENT_PHONE_NUMBER", "TWILIO_PHONE_NUMBER"],
//   }, async (event) => {
//   const change: any = event.data;

//   if (!change) {
//     logger.error("No change data found.");
//     return;
//   }

//   const afterDoc = change.after;

//   if (afterDoc.exists) {
//     const messageData = afterDoc.data();

//     if (messageData) {
//       try {
//         // const smsRef = admin.firestore().collection("sms").doc();

//         // await smsRef.set({
//         //   ...messageData,
//         //   createdAt: admin.firestore.FieldValue.serverTimestamp(),
//         //   to: "+12366680975",
//         //   body: 
//         //   `New message from "${messageData.name}", "${messageData.email}" Message: "${messageData.message}"`
//         // });
//         // await smsRef.set({
//         //   ...messageData,
//         //   createdAt: admin.firestore.FieldValue.serverTimestamp(),
//         //   to: "+17789576007",
//         //   body: 
//         //   `New message from "${messageData.name}", "${messageData.email}"Message: "${messageData.message}"`
//         // });

//         // logger.info(
//         //   `Document added to 'sms' collection with ID: ${smsRef.id}`
//         // );

//         const accountSid = process.env.TWILIO_ACCOUNT_SID
//         const authToken = process.env.TWILIO_AUTH_TOKEN
//         const clientPhoneNumber = process.env.CLIENT_PHONE_NUMBER
//         const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

//         const client = require('twilio')(accountSid, authToken);
//         const message1 = await client.messages
//             .create({
//                 body: `New message from "${messageData.name}", "${messageData.email}"Message: "${messageData.message}"`,
//                 from: `+1${twilioPhoneNumber}`,
//                 to: '+12366680975'
//             })

//         let message2;

//         if (messageData.email != "karj5903@gmail.com") {

//             message2 = await client.messages
//             .create({
//                 body: `New message from "${messageData.name}", "${messageData.email}"Message: "${messageData.message}"`,
//                 from: `+1${twilioPhoneNumber}`,
//                 to: `+1${clientPhoneNumber}`
//             })
            
//             console.log("Message 2 status:", message2.status);
//         }

//         console.log("Message 1 status:", message1.status);

//         const smsRef = admin.firestore().collection("logs").doc();

//         const messages = message2 ? [{
//                 to: "+12366680975",
//                 sid: message1.sid,
//                 status: message1.status,
//             },
//             {
//                 to: clientPhoneNumber,
//                 sid: message2.sid,
//                 status: message2.status,
//             }
//         ] : [{
//             to: "+12366680975",
//             sid: message1.sid,
//             status: message1.status,
//         },]
  

//         await smsRef.set({
//             ...messageData,
//             createdAt: admin.firestore.FieldValue.serverTimestamp(),
//             messages: messages
//         });




//       } catch (error: any) {
//             console.error("Twilio error:", error);

//             const smsRef = admin.firestore().collection("logs").doc();

//             await smsRef.set({
//                 ...messageData,
//                 createdAt: admin.firestore.FieldValue.serverTimestamp(),
//                 error: error.message,
//                 status: "failed",
//         });      
//         }
//     }
//   } else {
//     logger.info("Document was deleted or does not exist after the change.");
//   }
// });

// let cachedFeed: any = null
// let lastFetchTime = 0
// const CACHE_TTL_MS = 1000 * 60 * 60

// exports.fetchLatestPosts = onCall(
//   { 
//     maxInstances: 10, // Prevent massive scaling costs
//     cors: true // Allow your Next.js frontend to call it
//   },
//   async (request) => {


//     const currentTime = Date.now();

//     if (cachedFeed && (currentTime - lastFetchTime < CACHE_TTL_MS)) {
//       console.log("Returning cached Instagram feed.");
//       return { posts: cachedFeed };
//     }

//     try {
//         console.log("Fetching fresh data from Instagram Graph API...");
      
//         const token = process.env.IG_ACCESS_TOKEN
//         const userId = process.env.INSTAGRAM_CLIENT_ID
        
//         if (!token) throw new HttpsError("internal", "Access token undefined")
//         if (!userId) throw new HttpsError("internal", "User ID undefined")

//         const url = `https://graph.instagram.com/v19.0/${userId}/media?fields=id,media_type,media_url,permalink&limit=10&access_token=${token}`;

//         const response = await fetch(url);
//         const data = await response.json();

//         if (data.error) {
//             console.error("Instagram API Error:", data.error);
//             throw new HttpsError("internal", "Instagram API rejected the request.");
//         }

//         const formattedPosts = data.data

//             .filter((post: any) => post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM")
//             .slice(0, 4) 
//             .map((post: any) => ({
//                 id: post.id,
//                 media_url: post.media_url,
//                 permalink: post.permalink
//             }));

//       cachedFeed = formattedPosts;
//       lastFetchTime = currentTime;

//       return { posts: formattedPosts };

//     } catch (error) {
//       console.error("Failed to fetch Instagram feed:", error);
//       // If the fetch fails but we have old cached data, return the stale data as a fallback
//       if (cachedFeed) {
//           console.log("Error occurred, returning stale cached data as fallback.");
//           return { posts: cachedFeed };
//       }
//       throw new HttpsError("internal", "Unable to load Instagram feed.");
//     }
//   }
// );