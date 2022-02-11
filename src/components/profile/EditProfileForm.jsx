import React, { useRef, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Form, Button, Image, InputGroup, Row, Col } from "react-bootstrap"
import { yupResolver } from "@hookform/resolvers/yup"

const initialValues = {
  name: "",
  status: "",
  bio: "",
  phoneNumber: "",
  venmoUsername: "",
  pfp: null
}

export default function EditProfileForm({
  defaultValues = {},
  schema,
  initialSrc = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  onSubmit,
  buttonText
}) {
  const fileInputRef = useRef()

  const [src, setSrc] = useState(null)

  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      ...initialValues,
      ...defaultValues
    },
    resolver: yupResolver(schema)
  })

  return (
    <>
      <Form
        noValidate
        onSubmit={handleSubmit(async (input) => {
          await onSubmit(input)
        })}
      >
        <Controller
          control={control}
          name="pfp"
          render={({ field, fieldState }) => {
            return (
              <div className="d-flex align-items-center flex-column">
                <Image
                  src={src ?? initialSrc}
                  width={200}
                  height={200}
                  className="border rounded-circle"
                />
                <div className="mx-3" />
                <input
                  hidden
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    setSrc(file ? URL.createObjectURL(file) : null)
                    field.onChange(file)
                  }}
                  ref={fileInputRef}
                />
                <Button
                  variant="link"
                  onClick={() => fileInputRef.current.click()}
                  disabled={isSubmitting}
                >
                  {field.value?.src ? "Upload new photo" : "Upload a photo"}
                </Button>
                {fieldState.error?.message && (
                  <Form.Text>{fieldState.error?.message}</Form.Text>
                )}
              </div>
            )
          }}
        />
        <Row>
          <Col>
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
                  />
                  {fieldState.error?.message && (
                    <Form.Text>{fieldState.error?.message}</Form.Text>
                  )}
                </Form.Group>
              )}
            />
          </Col>
          <Col>
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
          </Col>
        </Row>
        <Row>
          <Col>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field, fieldState }) => (
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="1234567890"
                    {...field}
                  />
                  {fieldState.error?.message && (
                    <Form.Text>{fieldState.error?.message}</Form.Text>
                  )}
                </Form.Group>
              )}
            />
          </Col>
          <Col>
            <Controller
              control={control}
              name="venmoUsername"
              render={({ field, fieldState }) => (
                <Form.Group className="mb-3">
                  <Form.Label>Venmo Username</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="your_username"
                      {...field}
                    />
                  </InputGroup>
                  {fieldState.error?.message && (
                    <Form.Text>{fieldState.error?.message}</Form.Text>
                  )}
                </Form.Group>
              )}
            />
          </Col>
        </Row>
        <Controller
          control={control}
          name="bio"
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="About me..."
                {...field}
              />
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
