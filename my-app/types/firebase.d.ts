import * as firebase from 'firebase/app';

declare module 'firebase/app' {
  export default firebase;
}

declare module 'firebase/auth' {
  export * from '@firebase/auth';
}

declare module 'firebase/firestore' {
  export * from '@firebase/firestore';
}