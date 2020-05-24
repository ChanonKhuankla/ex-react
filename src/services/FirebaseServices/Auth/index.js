import firebase from "firebase/app";
import 'firebase/auth'
class FirebaseAuth {

    constructor(_firebase = firebase) {
        this._firebaseApp = _firebase.auth()
    }

    async login(users, password) {
        try {
            const auth = await this._firebaseApp.signInWithEmailAndPassword(users, password)
            localStorage.setItem('auth', auth.user.uid)
            return auth.user
        } catch (error) {
            return null
        }

    }

    async onAuthStateChanged() {
        return new Promise( (resolve, reject) => {
            this._firebaseApp.onAuthStateChanged( (user) =>  {
                if (user) {
                    resolve(user.uid);
                    return user
                } else {
                    reject(Error('It broke'));
                    return null
                }
            });
        });
    }

}

export default FirebaseAuth