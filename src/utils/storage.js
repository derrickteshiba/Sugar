const { getMetadata } = require("firebase/storage")

export const refExists = (ref) => {
  return new Promise((resolve) =>
    getMetadata(ref)
      .then(() => resolve(true))
      .catch(() => resolve(false))
  )
}

export const getProfilePicUrl = (userId) =>
`https://firebasestorage.googleapis.com/v0/b/sugar-4e94c.appspot.com/o/profilePic%2F${userId}?alt=media&t=${new Date().getTime()}`
