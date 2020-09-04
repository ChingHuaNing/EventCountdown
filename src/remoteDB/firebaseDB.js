import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

// From Firebase console "Add Web App"
const firebaseConfig = {
  apiKey: 'AIzaSyDKClizZGihmVplWAIVYRiyIzFLoahXfaI',
  authDomain: 'eventcountdown-7c30f.firebaseapp.com',
  databaseURL: 'https://eventcountdown-7c30f.firebaseio.com',
  projectId: 'eventcountdown-7c30f',
  storageBucket: 'eventcountdown-7c30f.appspot.com',
  messagingSenderId: '892646530342',
  appId: '1:892646530342:web:3bd825bacca7cd0c8d35e7',
  measurementId: 'G-KK9GLK7CLW',
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
