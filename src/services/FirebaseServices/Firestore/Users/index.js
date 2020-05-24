import firebase from "firebase/app";
import "firebase/firestore"
class FirebaseDatabase {

    constructor(_firebase=firebase) {
        this._firebaseApp = _firebase.firestore()
    }

    async getUser() {
        return await this._firebaseApp.collection('users').get()
    }
    
}

export default FirebaseDatabase