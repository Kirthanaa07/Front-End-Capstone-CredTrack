import firebase from 'firebase/app';
import 'firebase/auth';

const signIn = (router) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      router.push('/');
    });
};

const signOut = () => {
  firebase.auth().signOut();
};

export { signIn, signOut };
