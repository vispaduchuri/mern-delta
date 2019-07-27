const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/storage');
require('firebase/firestore');



//  Production

 config ={};


  var config = {
    apiKey: "AIzaSyB33wb0eBip24dlE28cIqwhr70FvGH6nA8",
    authDomain: "deltax-f5639.firebaseapp.com",
    databaseURL: "https://deltax-f5639.firebaseio.com",
    projectId: "deltax-f5639",
    storageBucket: "deltax-f5639.appspot.com",
    messagingSenderId: "10385051521",
    appId: "1:10385051521:web:d79845c12eb550f0"
  };
  // Initialize Firebase
  firebase.initializeApp(config);


  export default firebase;