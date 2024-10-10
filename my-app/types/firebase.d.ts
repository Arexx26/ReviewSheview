declare module 'firebase/app' {
  import firebase from 'firebase/app';
  export default firebase;
}

declare module 'firebase/auth' {
  import firebase from 'firebase/app';
  export default firebase.auth;
}

declare module 'firebase/firestore' {
  import firebase from 'firebase/app';
  export default firebase.firestore;
}