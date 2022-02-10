import React from "react"
import { Controller, useForm } from "react-hook-form"
import { getDatabase, ref as dbRef, set } from "firebase/database"
import { Form, Button } from "react-bootstrap"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import ProfileFormFields from "./ProfileFormFields"
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage"

const db = getDatabase()
const storage = getStorage()

const initialValues = {
  name: "",
  bio: "",
  status: "",
  profilePic: null
}

const profileSchema = yup.object({
  name: yup.string().required('full name is required'),
  status: yup.string().required('status is required'),
  bio: yup.string(),
  profilePic: yup.mixed().required('profile picture is required')
})

export default function CreateProfileForm({ userId }) {
  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(profileSchema)
  })

  const onSubmit = async ({ profilePic, ...profile }) => {
    const picRef = storageRef(storage, "profilePic/" + userId)

    await uploadBytes(picRef, profilePic)
    await set(dbRef(db, "users/" + userId), profile)
  }

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <ProfileFormFields control={control} />
      <Controller
        name="profilePic"
        control={control}
        render={({ field, fieldState }) => {
          return (
            <Form.Group className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  console.log('here')
                  field.onChange(e.target.files[0])
                }}
              />
              {fieldState.error?.message && (
                <Form.Text>{fieldState.error?.message}</Form.Text>
              )}
            </Form.Group>
          )
        }}
      />
      <Button variant="primary" type="submit" disabled={isSubmitting}>
        Create Profile
      </Button>
    </Form>
  )
}
