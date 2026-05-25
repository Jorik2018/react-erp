const env = import.meta.env;

export const firebaseConfig = {
    apiKey: env.FIREBASE_API_KEY,
    authDomain: env.FIREBASE_AUTH_DOMAIN,
    databaseURL: env.FIREBASE_DATABASE_URL,
    storageBucket: env.FIREBASE_STORAGE_BUCKET
};

export const SERVER_URL = env.REACT_APP_VIRTUAL_HOST || "localhost:3001";

export const BASE_URL = 'http://localhost:3001/api'

