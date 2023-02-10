import Head from 'next/head'
import GoogleButton from 'react-google-button'
import {getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult} from "firebase/auth";
import {useRouter} from "next/router";
import { initializeApp } from 'firebase/app';

// Task 0: Initialize Firebase
// Replace the following with your app's Firebase project configuration
// https://firebase.google.com/docs/web/setup
const firebaseConfig = {
  apiKey: "AIzaSyBPgUclU83FPeIGdRqr9UTw_yhhAhlCQBc",
  authDomain: "checkmate-interview-test.firebaseapp.com",
  projectId: "checkmate-interview-test",
  storageBucket: "checkmate-interview-test.appspot.com",
  messagingSenderId: "585295346001",
  appId: "1:585295346001:web:f516df441fe0c980cf3b70"
};

const app = initializeApp(firebaseConfig);

// GoogleAuthProvider instance
const provider = new GoogleAuthProvider();
// Firebase Auth instance
const auth = getAuth(app);

export default function Home() {
  //Next.js router
  const router = useRouter();

  // Get the redirect result to see if the user is signed-in
  getRedirectResult(auth).then(result => {

    console.log(result);

    if (!result) return; // User is NOT signed in, there is no result. Do not redirect

    // Get Google Access Token
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential) return;

    const token = credential.accessToken;

    // Get user info
    const user = result.user;

    // Since user is signed in, redirect to signed-in page
    router.push('signed-in');

  }).catch(err => {

    console.error(err);

  });

  // Task 1: Implement Google Sign in with Firebase
  // https://firebase.google.com/docs/auth/web/google-signin
  const signIn = () => {
    /*
      1. Use the GoogleAuthProvider to sign in with Firebase
      2. Use signInWithRedirect to redirect the user to the Google sign in page
      3. (Optional) Use getRedirectResult to get the result of the redirect and check out what is inside :)
      4. Redirect the user to the signed-in page using Next.js router
     */

    // Sign in with redirect
    signInWithRedirect(auth, provider);
    // After signing in, getRedirectResult() will yield a result and we can redirect to signed-in page
  }

  return (
    <>
      <Head>
        <title>Sign in to see the public holidays in HK</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <main style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection: 'column'}}>
          <h1 className="title">
            Welcome to <a href="https://checkmatehk.io">CheckMate</a>
          </h1>
          <h3>Sign in to see a random programming joke 😳</h3>

          {/* Button for user to sign in with Google */}
          {/* Task 1: Implement Google Sign in with Firebase */}
          <GoogleButton
            label={'Sign in with Google'}
            type="light"
            style={{ width: '50%', display:"flex", justifyContent: 'center', alignItems: 'center', fontFamily: 'Roboto, sans-serif', color:'#444' }}
            onClick={signIn}
          />
        </main>
      </div>
      </>
  )
}
