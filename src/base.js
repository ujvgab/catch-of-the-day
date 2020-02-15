import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyBEFRxHe3fGyvSJhWoOTyv4Q6IrcvHUB1I",
    authDomain: "catch-of-the-day-ujvgab.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-ujvgab.firebaseio.com"  
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;