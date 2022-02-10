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

const defaultValues = {
  name: "",
  status: "",
  bio: ""
}

export default function CreateProfileCard({ userId }) {
  const userRef = dbRef(db, "users/" + userId)
  const picRef = storageRef(storage, "profilePic/" + userId)

  const [toastText, setToastText] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hasPhoto, setHasPhoto] = useState(false)
  const [src, setSrc] = useState(null)

  useEffect(() => {
    refExists(picRef).then((exists) => {
      setHasPhoto(exists)
      setSrc(
        exists
          ? getProfilePicUrl(userId)
          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      )
      setLoading(false)
    })
  }, [])

  const onUpload = async (file) => {
    await uploadBytes(picRef, file).then(() =>
      setSrc(() => getProfilePicUrl(userId))
    )
    setHasPhoto(true)
  }

  const onSubmit = async (newProfile) => {
    const exists = await refExists(picRef)
    if (!exists) setToastText("Please set a photo! ❌")

    await set(userRef, newProfile)
  }

  if (loading) return null

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Card style={{ minWidth: 600 }}>
        <Card.Header>
          <Card.Title className="mb-0">Create Public Profile</Card.Title>
        </Card.Header>
        <Card.Body>
          <EditProfilePicture
            onUpload={onUpload}
            src={src}
            uploadText={hasPhoto ? "Upload New Photo" : "Upload a Photo"}
          />
          <EditProfileForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            buttonText="Create Profile"
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
