const admin = require('firebase-admin');
const sourceProjectConfig = { 
  apiKey: "AIzaSyDlPEOTUyjHM6N0pk8-Cw6nCB-9Ah-BcFE",
  authDomain: "staff-eac78.firebaseapp.com",
  projectId: "staff-eac78",
  storageBucket: "staff-eac78.appspot.com",
  messagingSenderId: "483148358074",
  appId: "1:483148358074:web:bd38c4939aa75496297d83",
  measurementId: "G-XJQM77FDKZ"

};
const targetProjectConfig = {
    apiKey: "AIzaSyCnapyLzzYqwe0dZVzNile3ZPV4ICO7tx4",
    authDomain: "principal-6fb7c.firebaseapp.com",
    projectId: "principal-6fb7c",
    storageBucket: "principal-6fb7c.appspot.com",
    messagingSenderId: "700182934260",
    appId: "1:700182934260:web:4b1a117a22a4d6d24064a1",
    measurementId: "G-DRMNXQ47TD"
  };
const sourceApp = admin.initializeApp(sourceProjectConfig, 'source');
const targetApp = admin.initializeApp(targetProjectConfig, 'target');
const sourceFirestore = sourceApp.firestore();
const targetFirestore = targetApp.firestore();
async function transferApprovedRequestData(requestId) {
  try {
    const requestDoc = await sourceFirestore.collection('requests').doc(requestId).get();
    if (!requestDoc.exists) {
      throw new Error(`Request with ID ${requestId} not found.`);
    }
    await targetFirestore.collection('approved_requests').doc(requestId).set(requestDoc.data());
    console.log(`Request data transferred successfully for ID ${requestId}.`);
  } catch (error) {
    console.error('Error transferring request data:', error);
  }
}
module.exports = transferApprovedRequestData;