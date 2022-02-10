import React from "react"
import { Card, Image } from "react-bootstrap"
import EditProfileForm from "./EditProfileForm"
import EditProfilePicture from "./EditProfilePicture"


export default function ProfileCard({userId}) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Card style={{ minWidth: 600 }}>
        <Card.Header>
          <Card.Title className="mb-0">Public Profile</Card.Title>
        </Card.Header>
        <Card.Body>
          <EditProfilePicture userId={userId}/>
          <EditProfileForm userId={userId} />
        </Card.Body>
      </Card>
    </div>
  )
}
