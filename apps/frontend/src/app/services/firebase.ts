import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB7cG72fhdryIMg2yi0HFRyPBKsyTP7OPY',
  authDomain: 'levi-math.firebaseapp.com',
  projectId: 'levi-math',
  storageBucket: 'levi-math.appspot.com',
  messagingSenderId: '432449451610',
  appId: '1:432449451610:web:2251444da2f36d35140a63',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
