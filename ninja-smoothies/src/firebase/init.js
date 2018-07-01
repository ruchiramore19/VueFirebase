import firebase from 'firebase';
import firestore from 'firebase/firestore';

var config = {
    apiKey: "AIzaSyA5C5M9rpOISoldC2Ps0npUoVbhzt4BlRc",
    authDomain: "ninja-smoothies-9760e.firebaseapp.com",
    databaseURL: "https://ninja-smoothies-9760e.firebaseio.com",
    projectId: "ninja-smoothies-9760e",
    storageBucket: "ninja-smoothies-9760e.appspot.com",
    messagingSenderId: "126874210202"
  };
  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({timestampsInSnapshots: true})

  export default firebaseApp.firestore()