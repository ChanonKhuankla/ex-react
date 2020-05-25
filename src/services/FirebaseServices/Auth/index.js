import firebase from "firebase/app";
import 'firebase/auth'
import swal from 'sweetalert';

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

    async logout() {
        try {
            const auth = await this._firebaseApp.signOut()
            console.log('auth', auth);

            localStorage.removeItem('auth')

        } catch (error) {
            console.log('error', error);

        }
    }

    async newPassword(password) {
        try {
            const user = await this._firebaseApp.currentUser;
            console.log('user',user);
            console.log('password',password);
            
            const newPass = await user.updatePassword(password)
        
            return newPass
        } catch (error) {
            if (error.message === 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN') {
                localStorage.removeItem('auth')
            }
        }
    }

    async createNewUser(email, password) {
        try {
            const auth = await this._firebaseApp.createUserWithEmailAndPassword(email, password)
            console.log('auth',auth);
            await swal({
                title: 'Create user success',
                icon: "success",
            });
            return auth.user
        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
            });
        }
    }
    
    async onAuthStateChanged() {
        return new Promise((resolve, reject) => {
            this._firebaseApp.onAuthStateChanged((user) => {

                if (user) {
                    resolve(user);
                    return user
                } else {
                    reject('It broke');
                    return null
                }
            });
        });
    }

}

export default FirebaseAuth