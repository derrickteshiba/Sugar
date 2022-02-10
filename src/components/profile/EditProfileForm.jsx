import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Form, Button} from "react-bootstrap"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const profileSchema = yup.object({
  name: yup.string().required(),
  status: yup.string().required(),
  bio: yup.string()
})

export default function EditProfileForm({ defaultValues, onSubmit, buttonText }) {
  const { handleSubmit, control, formState: {isSubmitting} } = useForm({
    defaultValues,
    resolver: yupResolver(profileSchema)
  })

  return (
    <>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your name"
              {...field}
              noValidate
            />
            {fieldState.error?.message && (
              <Form.Text>{fieldState.error?.message}</Form.Text>
            )}
          </Form.Group>
        )}
      />
      <Controller
        control={control}
        name="status"
        render={({ field, fieldState }) => (
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select {...field}>
              <option value=""></option>
              <option value="moma">Sugar Moma</option>
              <option value="papa">Sugar Papa</option>
              <option value="boy">Baby boy</option>
              <option value="girl">Baby girl</option>
            </Form.Select>
            {fieldState.error?.message && (
              <Form.Text>{fieldState.error?.message}</Form.Text>
            )}
          </Form.Group>
        )}
      />
      <Controller
        control={control}
        name="bio"
        render={({ field, fieldState }) => (
          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control as="textarea" placeholder="About me..." {...field} />
            {fieldState.error?.message && (
              <Form.Text>{fieldState.error?.message}</Form.Text>
            )}
          </Form.Group>
        )}
      />
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {buttonText}
        </Button>
      </Form>
    </>
  )
}
