import { getDatabase, ref as dbRef, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import React from "react";
import { Card } from "react-bootstrap";
import EditProfileForm from "./EditProfileForm";

import buildProfileSchema from './buildProfileSchema'

const db = getDatabase();
const storage = getStorage();

const profileSchema = buildProfileSchema({pfpRequired: true})

export default function CreateProfileCard({ uid }) {
  const userRef = dbRef(db, "user/" + uid);
  const picRef = storageRef(storage, "profilePic/" + uid);

  const onSubmit = async ({ pfp, ...newProfile }) => {
    const setProfile = set(userRef, newProfile);
    const storePfp = uploadBytes(picRef, pfp);

    await Promise.all([setProfile, storePfp]);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 align-items-center">
      <Card style={{ minWidth: 600 }}>
        <Card.Header>
          <Card.Title className="mb-0">Create Public Profile</Card.Title>
        </Card.Header>
        <Card.Body>
          <EditProfileForm
            onSubmit={onSubmit}
            buttonText="Create Profile"
            schema={profileSchema}
            pfpRequired
          />
        </Card.Body>
      </Card>
    </div>
  );
}