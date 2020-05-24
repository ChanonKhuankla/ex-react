import firebase from "firebase/app";
import { firebaseConfig } from "../../config";
import { Users } from './Firestore'
import Auth from './Auth'
class Firebase {
    constructor() {
        this._firebaseApp = null
    }

    getDatabase() {
        return new Users(this._firebaseApp)
    }

    getAuth() {
        return new Auth(this._firebaseApp)
    }

    initializeApp() {
        this._firebaseApp = firebase.initializeApp(firebaseConfig)

    }
}

export default new Firebase()