import {db} from '../firebase';

export const firebaseLogin = async (uid) => {
  return db.collection('user').doc(uid).get()
}

