import firebase from "firebase/app";
import "firebase/firestore"
import swal from 'sweetalert';

class FirebaseDatabase {

    constructor(_firebase = firebase) {
        this._firebaseApp = _firebase.firestore()
    }

    async getUser() {
        return await this._firebaseApp.collection('users').get()
    }

    async addUser(data) {
        try {
            const result = await this._firebaseApp.collection('users').add(data)
            swal({
                title: 'Create user success',
                icon: "success",
            });
            return result
        } catch (error) {
            console.log('error', error);

            swal({
                title: error.message,
                icon: "error",
            });
        }
    }

    async updateUser(id, data) {
        try {
            const result = await this._firebaseApp.collection('users').doc(id).set(data)
            await swal({
                title: 'Update user success',
                icon: "success",
            });
            return result
        } catch (error) {
            console.log('updateUser',error.message);
            
            swal({
                title: error.message,
                icon: "error",
            });
        }
    }

    async deleteUser(id) {
        try {
            const comfirm = await swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            if (comfirm) {
                const result = await this._firebaseApp.collection('users').doc(id).delete()
                swal({
                    title: 'Delete User success',
                    icon: "success",
                });
                return result
            }

        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
            });
        }
    }
}

export default FirebaseDatabase