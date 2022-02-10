import React, { useRef, useState } from "react"
import { Button, Image, Spinner } from "react-bootstrap"
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage"

const storage = getStorage()
export default function EditProfilePicture({ userId }) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef()

  const urlPrefix = `https://firebasestorage.googleapis.com/v0/b/sugar-4e94c.appspot.com/o/profilePic%2F${userId}?alt=media`
  const [src, setSrc] = useState(urlPrefix)

  const onFileChange = (file) => {
    setUploading(true)
    const picRef = storageRef(storage, "profilePic/" + userId)

    uploadBytes(picRef, file)
      .then(() => setSrc(`${urlPrefix}&t=${new Date().getTime()}`))
      .finally(() => setUploading(false))
  }

  return (
    <div className="d-flex align-items-center flex-column">
      <Image
        src={src}
        width={200}
        height={200}
        className="border rounded-circle"
      />
      <div className="mx-3" />
      <input
        hidden
        type="file"
        onChange={(e) => onFileChange(e.target.files[0])}
        ref={fileInputRef}
      />
      <Button
        variant="link"
        onClick={() => fileInputRef.current.click()}
        disabled={uploading}
      >
        {uploading ? (
          <>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Uploading{" "}
          </>
        ) : (
          "Upload new photo"
        )}
      </Button>
    </div>
  )
}
