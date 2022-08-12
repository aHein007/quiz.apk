import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: "AIzaSyC949G8laqjC2nGHEPXH4LxiL1zbOuNqSs",
    authDomain: "quiz-apk-7e214.firebaseapp.com",
    projectId: "quiz-apk-7e214",
    storageBucket: "quiz-apk-7e214.appspot.com",
    messagingSenderId: "868778600772",
    appId: "1:868778600772:web:de94c3eedf5f648a38cf11"
  };

//fire base initial
firebase.initializeApp(firebaseConfig)

//fire store init
let db =firebase.firestore()


let timeStamp =firebase.firestore.FieldValue.serverTimestamp

let auth =firebase.auth()

export {db,timeStamp,auth}