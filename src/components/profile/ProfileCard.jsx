import { get, getDatabase, ref as dbRef, set } from "firebase/database"
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage"
import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import EditProfileForm from "./EditProfileForm"
import EditProfilePicture from "./EditProfilePicture"
import { refExists, getProfilePicUrl } from "../../utils/storage"
import SuccessToast from "../SuccessToast"

const db = getDatabase()
const storage = getStorage()

export default function ProfileCard({ userId }) {
  const userRef = dbRef(db, "users/" + userId)
  const picRef = storageRef(storage, "profilePic/" + userId)

  const [profile, setProfile] = useState({
    data: null,
    loading: true
  })

  useEffect(() => {
    return get(userRef).then((snap) => {
      setProfile({
        data: snap.val(),
        loading: false
      })
    })
  }, [])

  const [toastText, setToastText] = useState(null)
  const [src, setSrc] = useState(() => getProfilePicUrl(userId))

  const onUpload = async (file) => {
    await uploadBytes(picRef, file).then(() => setSrc(() => getProfilePicUrl(userId)))
    setToastText("Photo Updated ✅")
  }

  const onSubmit = async (newProfile) => {
    const exists = await refExists(picRef)
    if (!exists) return

    await set(userRef, newProfile)

    setToastText("Profile Updated ✅")
  }

  if (profile.loading) return null

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Card style={{ minWidth: 600 }}>
        <Card.Header>
          <Card.Title className="mb-0">Public Profile</Card.Title>
        </Card.Header>
        <Card.Body>
          <EditProfilePicture userId={userId} onUpload={onUpload} src={src} />
          <EditProfileForm
            defaultValues={profile.data}
            onSubmit={onSubmit}
            buttonText="Save Changes"
          />
        </Card.Body>
      </Card>
      <SuccessToast
        isOpen={toastText !== null}
        onClose={() => setToastText(null)}
      >
        {toastText}
      </SuccessToast>
    </div>
  )
}
