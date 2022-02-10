export const getProfilePicUrl = (uid) =>
  `https://firebasestorage.googleapis.com/v0/b/sugar-4e94c.appspot.com/o/profilePic%2F${uid}?alt=media&t=${new Date().getTime()}`;
