import React from "react"
import { Card } from "react-bootstrap"
import CreateProfileForm from "./CreateProfileForm"
import EditProfileForm from "./EditProfileForm"
import EditProfilePicture from "./EditProfilePicture"

export default function CreateProfileCard({userId}) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Card style={{ minWidth: 600 }}>
        <Card.Header>
          <Card.Title className="mb-0">Create Public Profile</Card.Title>
        </Card.Header>
        <Card.Body>
          <CreateProfileForm userId={userId} />
        </Card.Body>
      </Card>
    </div>
  )
}
