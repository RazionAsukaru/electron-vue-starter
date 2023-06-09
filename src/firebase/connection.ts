import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBldVdJLUSG0NjfyMUxZn3dHIYrjEgqkaE',
    authDomain: 'maintenance-report-mz.firebaseapp.com',
    projectId: 'maintenance-report-mz',
    storageBucket: 'maintenance-report-mz.appspot.com',
    messagingSenderId: '864882350954',
    appId: '1:864882350954:web:3c751c6a20e0cd92822313',
    measurementId: 'G-QBKTQBYK1G',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// used for the firestore refs
export const db = getFirestore(firebaseApp);
