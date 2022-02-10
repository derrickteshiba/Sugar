import React from "react"
import { Spinner } from "react-bootstrap"

export default function LoadingSpinner() {
  return (
    <Spinner
      as="span"
      variant="primary"
      animation="grow"
      size="lg"
      role="status"
      aria-hidden="true"
    />
  )
}
