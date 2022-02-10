import React, { useRef, useState } from "react"
import { Button, Image, Spinner } from "react-bootstrap"

export default function EditProfilePicture({ src, onUpload, uploadText }) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef()
  
  const onFileChange = async (file) => {
    setUploading(true)
    await onUpload(file)
    setUploading(false)
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
          uploadText
        )}
      </Button>
    </div>
  )
}
