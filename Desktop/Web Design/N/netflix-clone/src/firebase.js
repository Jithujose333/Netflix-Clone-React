
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, 
         getAuth, 
         signInWithEmailAndPassword,
         signOut} from 'firebase/auth'
import {addDoc, 
        collection,
        getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDQhkLwdlMjLf9N0o59ynHsTNS5HhCOU_Q",
  authDomain: "netflix-clone-ef752.firebaseapp.com",
  projectId: "netflix-clone-ef752",
  storageBucket: "netflix-clone-ef752.firebasestorage.app",
  messagingSenderId: "510437681963",
  appId: "1:510437681963:web:e628293ce9f6eae7d5336e"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)


const signup = async (name,email,password) => {
    try {
      
        const res =  await createUserWithEmailAndPassword(auth,email,password)

        const user = res.user;

        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


const login = async(email,password)=>{
    try {

     await signInWithEmailAndPassword(auth,email,password) 
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
        
    }
}


const logout = ()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout}