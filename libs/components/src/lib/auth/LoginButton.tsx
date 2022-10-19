import { FirebaseError } from '@firebase/util';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const provider = new GoogleAuthProvider();

export const LoginButton = ({ redirectTo = '/' }: { redirectTo?: string }) => {
  const navigate = useNavigate();

  const login = useCallback(async () => {
    const auth = getAuth();
    try {
      await signInWithPopup(auth, provider);
      navigate(redirectTo);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error({ errorCode, errorMessage, credential });
      }
    }
  }, [navigate, redirectTo]);

  return (
    <button
      onClick={login}
      className="rounded bg-sky-500 p-2 text-lg font-semibold text-white transition-colors hover:bg-sky-400"
    >
      Login
    </button>
  );
};
