import { getDatabase, ref as dbRef, set, get } from "firebase/database"
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage"
import React, { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import EditProfileForm from "./EditProfileForm"
import { getProfilePicUrl } from "../../utils/storage"
import SuccessToast from "../SuccessToast"
import Center from "../Center"
import * as yup from 'yup'

const db = getDatabase()
const storage = getStorage()

const profileSchema = yup.object({
  name: yup.string().required("name is required"),
  status: yup.string().required("status is required"),
  bio: yup.string(),
  pfp: yup.mixed().required("profile picture is required")
})


export default function EditProfileCard({ uid }) {
  const picRef = storageRef(storage, "profilePic/" + uid)

  const [profile, setProfile] = useState({
    data: null,
    loading: true
  })

  useEffect(() => {
    const userRef = dbRef(db, "user/" + uid)

    return get(userRef).then((snap) => {
      setProfile({
        data: {
          ...snap.val()
        },
        loading: false
      })
    })
  }, [uid])

  const [toastText, setToastText] = useState(null)

  const onSubmit = async ({ pfp, ...newProfile }) => {
    const updates = [set(dbRef(db, "user/" + uid), newProfile)]
    if (pfp) updates.push(uploadBytes(picRef, pfp))

    await Promise.all(updates)

    setToastText("Profile Updated ✅")
  }

  if (profile.loading) return null

  return (
    <Center>
      <Card style={{ minWidth: 600 }}>
        <Card.Header>
          <Card.Title className="mb-0">Your Public Profile</Card.Title>
        </Card.Header>
        <Card.Body>
          <EditProfileForm
            defaultValues={profile.data}
            onSubmit={onSubmit}
            schema={profileSchema}
            initialSrc={getProfilePicUrl(uid)}
            buttonText="Save Profile"
          />
        </Card.Body>
      </Card>
      <SuccessToast
        isOpen={toastText !== null}
        onClose={() => setToastText(null)}
      >
        {toastText}
      </SuccessToast>
    </Center>
  )
}
