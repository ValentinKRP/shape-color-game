import { initializeApp } from "firebase/app";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  push,
  get,
} from "firebase/database";
import { getDatabase } from "firebase/database";
import { set, Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAD62Cpqo0f8EtBZUb_M0eLROssOcR26h8",
  authDomain: "shapes-6f0ee.firebaseapp.com",
  databaseURL: "https://shapes-6f0ee-default-rtdb.firebaseio.com",
  projectId: "shapes-6f0ee",
  storageBucket: "shapes-6f0ee.appspot.com",
  messagingSenderId: "255926726168",
  appId: "1:255926726168:web:1ea30e3175f1993ef71d6d",
  measurementId: "G-94E9DLGDFQ",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const shapesRef = ref(db, "shapes");

const saveScore = async (name: string, score: number, callback: () => void) => {
  try {
    const playerRef = ref(db, `players/${name}`);

    const snapshot = await get(playerRef);
    if (snapshot.exists()) {
      const existingScore = snapshot.val().score;


      if (score < existingScore) {
        set(playerRef, { score });
      }
    } else {
      set(playerRef, { score });
    }
    callback();
  } catch (error) {
    console.error('Error saving score:', error);

  }
};

interface PlayerData {
  name: string;
  score: number;
}

const fetchPlayers = async (db: Database): Promise<PlayerData[]> => {
  try {
    const playersRef = ref(db, 'players');
    const snapshot = await get(playersRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => ({
        name: key,
        score: data[key].score,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching players:', error);

    return [];
  }
};


export { app, db, shapesRef, saveScore, fetchPlayers };
