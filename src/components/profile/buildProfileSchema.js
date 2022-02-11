import * as yup from "yup"
export default function buildProfileSchema ({
  pfpRequired = false
} = {}) {
  return yup.object({
    name: yup.string().required("name is required"),
    status: yup.string().required("status is required"),
    bio: yup.string(),
    pfp: yup
      .mixed()
      .concat(
        pfpRequired ? yup.mixed().required("profile picture is required") : null
      ),
    phoneNumber: yup
      .string()
      .matches(/^\d{10}$/, "phone number must be 10 digits")
      .required("phone number is required"),
    venmoUsername: yup.string().required("account is required")
  })
}
