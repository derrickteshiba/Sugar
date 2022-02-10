import React, {  useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database"
import { Form, Button,  } from "react-bootstrap"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import SuccessToast from "../SuccessToast"
import ProfileFormFields from './ProfileFormFields'

const db = getDatabase()

const initialValues = {
  name: "",
  bio: "",
  status: ""
}

const profileSchema = yup.object({
  name: yup.string().required(),
  status: yup.string().required(),
  bio: yup.string()
})

export default function EditProfileForm({ userId }) {
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const userRef = dbRef(db, "users/" + userId)

  const { handleSubmit, control, reset, formState: {isSubmitting} } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(profileSchema)
  })

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      if (!loading) return
      const data = snapshot.val()

      reset(data)
      setLoading(false)
    })
  }, [])

  const onSubmit = async (newProfile) => {
    await set(dbRef(db, "users/" + userId), newProfile)
    setIsOpen(true)
  }

  if (loading) return null
  
  return (
    <>
      <SuccessToast isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <ProfileFormFields control={control} />
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Save Changes
        </Button>
      </Form>
    </>
  )
}
