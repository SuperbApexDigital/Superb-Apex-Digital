import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let appInstance: any = null;
try {
  appInstance = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
} catch (e) {
  console.warn('Firebase initializeApp notice:', e);
}

let firestoreInstance: any = null;
try {
  if (appInstance) {
    firestoreInstance = getFirestore(appInstance, firebaseConfig.firestoreDatabaseId);
  }
} catch (e) {
  try {
    if (appInstance) {
      firestoreInstance = getFirestore(appInstance);
    }
  } catch (err) {
    console.warn('Firestore initialization notice:', err);
  }
}

export const db = firestoreInstance;
export const auth = appInstance ? getAuth(appInstance) : null;

// Test connection on boot using valid non-reserved document ID
async function testConnection() {
  if (!db) return;
  try {
    await getDocFromServer(doc(db, 'team_members', 'test-connection'));
  } catch (error) {
    if (error instanceof Error) {
      console.warn('Firestore initial connection status:', error.message);
    }
  }
}
testConnection();

