import { defineNuxtPlugin } from '#app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrIudzjFc5R6oQMgq8FOxdhxj0isybBDI",
  authDomain: "blackcountry-576e3.firebaseapp.com",
  projectId: "blackcountry-576e3",
  storageBucket: "blackcountry-576e3.firebasestorage.app",
  messagingSenderId: "67001512640",
  appId: "1:67001512640:web:57dbd0973738bea0bb3325",
  measurementId: "G-7YZJNNRLWJ"
};

export default defineNuxtPlugin(() => {
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  // Initialize Firebase Authentication
  const auth = getAuth(firebaseApp);

  // Provide Firebase and Auth services globally in the app
  return {
    provide: {
      firebaseApp,
      auth,
    },
  };
});


// {
//   "type": "service_account",
//   "project_id": "blackcountry-576e3",
//   "private_key_id": "7e49e883402b57fa607b8c24ec8a24603036ffe5",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDK8OLlpicqZ5Es\nsYJGMcqjLoy0c72IiIOWPw0MxI4lcyWGqMwPoaynyL0ulEY7z+29jZvp3V3lX7P2\n9uoSh2Ykg03fFpx3WKBipErcdIOOsXirFYG2TjZmbg37pF2ZPMfld5NFVAaq4LGC\n/Oapd7eq/HehuU4ObnZR0iuNbXZAOrI34CikzCCmXrKc7HxLmSxem7uKG4lfRpgt\nVvd+0tEAS4ZSbWBtV77Cm8MmgsLss7ovwsJgvi7oiBCY/0bWmdi1HuOrjip7AMIW\nFtQPlj//OlhZ5ib7GhV0yr0GFVIuP+UJS6LkmbMEoZZubKU+GecPYlBWAEnSPgtO\nb/hnRfw3AgMBAAECggEAJTA+S/oGHFGtO0TuDAHs0blihGDfPwlRH7O/JvNP3xH6\nMvJ0rnqggoCZFlOKiURhmwY7p3/uyG0gs+VsYGfacl9zYimpE3+0qE7V/w8E2p2v\n8J34zpkHg/6v5kio9D88nFKstJwguqiBLvE8LZroF9e67nJgGOnqGbVLUNfZvwwO\n6/6iqii7dgv32+OXILuIj1kXgvTOdL0E9dkZ2Cvya/rxmdUxxYwDpvsLuZjJF8a2\nEi1rWlfRW+GXd/G8gVsujshOxYjJZOBQOuILbsuMsCEfK9BsfpytwXWNT8h0vv31\nx/YXfjqbg+cyTNyj21BJA7NenMOVSkb3YUDYipi4PQKBgQDsVjW9McjDXR4b/D23\n2Q5nazNJJ9hU//ion/iCJxAAtH732kY3C9AktmPgsYl0Q3jsDjlT0LO49Fla850H\nPhBDcMpKGzlCmNLHKafnqGKA2830/9K+zACKuofS3loAiwaKaYb27uG6cw/z6wGp\nttupSox957IJ1hRc3S40yOzYxQKBgQDb018uDTU7T/qpaRcnWVI+FYhL7YxSZ/3N\njigIia2MalZ2LGCYu6ZLD0idFxMbVyIwHU5EdQIJVOK4NsH13DlOn/vDKo4T+9nS\nDkRu2kTM105um7p9TBNn1GDOI2NbHSZYNNOHvztL5PnFpEHWTNKFsN/2QtDgRDT8\nh9OCVo84ywKBgGj30V56oiTDUwAzBGaHrXIZlunDHL6EAjlC8+k62Ey33jzPYahJ\nQuVLbQj7UYWmAis2Fhg39dsMDDPtR61Tz31ktzQ66y+9GMEEq2Kk0ztQZSWQClZb\n3VHAj1sFDwx2syz+uccrSm65dDhuBIsQgHeseMHjCpx7zQeB5WfkZe3RAoGADyys\nKVWoEwwWVZN3kbPMxZRe8D7ZrOaY0pO5l71JSaQdi9LMaD6r4AqSDKYHH6AIMCIV\nwQwCs/o0HFtLUFl/azoH+xT48dA03Rc3Ch/vF+TU+TWuze9ud4BlnlU7CpMcjoI3\nB+vfgAGybD5GfTCYZ7op+6npGVIcBkKqCxlGkbkCgYAcnhUxtFZ3b+Bb8swKciwd\nR6m9l/GJgwK5H7gQ687JMVXrx1beP6uUkh11PjYI6EE/n1AljxvTI9OkBQQ9B1Pr\nHm00rKThVtIsVeCwKK7w2rck86xewB7KfOSZ+auOLa95hZk+0b+PHxTc3zyrvFCK\nPVeJ++xloELJjP0Nr8q/UQ==\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-fbsvc@blackcountry-576e3.iam.gserviceaccount.com",
//   "client_id": "105174424348020365138",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40blackcountry-576e3.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }