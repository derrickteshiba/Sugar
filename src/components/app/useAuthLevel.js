import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref as dbRef, onValue, get } from "firebase/database";
const db = getDatabase();

const initialState = {
  user: null,
  profile: null,
};

export default function useAuthLevel() {
  const [authState, setAuthState] = useState(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      async (user) => {
        unsubscribe();

        const authState = { ...initialState };
        if (user) {
          authState.user = user;
          const userRef = dbRef(db, "user/" + user.uid);

          const snap = await get(userRef);
          authState.profile = snap.val();
        }

        setAuthState(authState);
        setLoading(false);
      },
      null
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loading) return;
    return onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return setAuthState(initialState);

      const userRef = dbRef(db, "user/" + user.uid);

      return onValue(userRef, (snap) => {
        setAuthState({
          user,
          profile: snap.val(),
        });
      });
    });
  }, [loading]);

  return authState;
}
