import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref as dbRef, onValue } from "firebase/database"
const db = getDatabase()

const initialState = {
  user: null,
  profile: null,
  loading: true
}

export default function useAuthLevel() {
  const [authState, setAuthState] = useState(initialState)

  useEffect(() => {
    return onAuthStateChanged(getAuth(), async (user) => {
      if (!user)
        setAuthState({
          user: null,
          profile: null,
          loading: false
        })

      const userRef = dbRef(db, "user/" + user.uid)

      return onValue(userRef, (snap) => {
        setAuthState({
          user,
          profile: snap.val(),
          loading: false
        })
      })
    })
  }, [])

  return authState
}
