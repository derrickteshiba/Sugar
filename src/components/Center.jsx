import React from "react"

export default function Center({ children }) {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 align-items-center">
      {children}
    </div>
  )
}
