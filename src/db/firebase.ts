import { initializeApp } from 'firebase/app';
import firebaseAuth, { getAuth } from 'firebase/auth';
import * as Firestore from 'firebase/firestore';
import config from '../config/config';

const Firebase = initializeApp(config.firebase);
export const firestore = Firestore.getFirestore();
export const auth =  firebaseAuth;
export const actualUser = getAuth();
export default Firebase;