import '@mantine/core/styles.css';
import { initializeApp } from 'firebase/app';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyA1wsBytaA_dPxXVIta6_bLZlaQSlYl7SQ',
    authDomain: 'needful-6cfc6.firebaseapp.com',
    databaseURL: 'https://needful-6cfc6-default-rtdb.firebaseio.com',
    projectId: 'needful-6cfc6',
    storageBucket: 'needful-6cfc6.appspot.com',
    messagingSenderId: '370296357131',
    appId: '1:370296357131:web:5d76449267af1d099ba20e',
    measurementId: 'G-MB3FFBW6GP',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
