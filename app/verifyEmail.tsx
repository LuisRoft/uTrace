import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { applyActionCode, getAuth } from 'firebase/auth';
import { set, ref } from "firebase/database";
import { FIREBASE_DB } from "@/FirebaseConfig"; 

const EmailVerification = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const auth = getAuth();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const oobCode = query.get('oobCode');

    if (oobCode) {
      applyActionCode(auth, oobCode)
        .then(async () => {
          const currentUser = auth.currentUser;
          if (currentUser) {
            // Save user data to the database
            await set(ref(FIREBASE_DB, 'users/' + currentUser.uid), {
              username: currentUser.displayName,
              email: currentUser.email,
              userId: currentUser.uid
            });
            setMessage('Email verified successfully and user data saved!');
          } else {
            setMessage('No user is currently signed in.');
          }
        })
        .catch((error) => {
          setMessage('Error verifying email: ' + error.message);
        });
    }
  }, [location, auth]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default EmailVerification;
