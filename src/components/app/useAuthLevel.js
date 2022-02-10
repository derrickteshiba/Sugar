import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref as dbRef, onValue } from "firebase/database"
const db = getDatabase()

export default function useAuthLevel() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(getAuth(), async () => {
      const user = getAuth()?.currentUser
      if (!user) setLoading(false)
      else setUser(user)
    })
  }, [])

  useEffect(() => {
    if (!user) return
    const userRef = dbRef(db, "user/" + user.uid)
    return onValue(userRef, (snap) => {
      setProfile(snap.val())

      if (loading) setLoading(false)
    })
    
  }, [user])

  return { loading, authLevel: user ? (profile ? 2 : 1) : 0, user, profile }
}
