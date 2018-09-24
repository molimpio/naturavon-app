import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import enviroment from './enviroment.js'

const config = {
    apiKey: enviroment.apiKey,
    authDomain: enviroment.authDomain,
    databaseURL: enviroment.databaseURL,
    projectId: enviroment.projectId,
    storageBucket: enviroment.storageBucket,
    messagingSenderId: enviroment.messagingSenderId
}

firebase.initializeApp(config)
firebase.firestore().settings( { timestampsInSnapshots: true })
const db = firebase.firestore();

module.exports = db