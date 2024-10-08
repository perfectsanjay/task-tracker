import { initializeApp } from "firebase/app";
import { getFirestore, getDoc,setDoc, doc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDbocebkolac4m-RO8NZ8Lm_1OVRxzIsAg",
    authDomain: "task-tracker-9e610.firebaseapp.com",
    projectId: "task-tracker-9e610",
    storageBucket: "task-tracker-9e610.appspot.com",
    messagingSenderId: "963229123412",
    appId: "1:963229123412:web:650214278716da02997ec1",
    measurementId: "G-V2LRXZNCM1"
  };
  
export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;
    const userRef = doc(firestore,`users/${userAuth.uid}`)
    const snapShot = await getDoc(userRef)

    if(!snapShot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try{
            await setDoc(userRef,{
                displayName,
                email,
                createdAt,
                ...additionalData
            } )

        } catch(error) {
            console.log('error creating user', error.message);
        }


    }
    return userRef;


}



  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

// set up the google auth 
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'})

export const signInWithGoogle = () => signInWithPopup(auth, provider);