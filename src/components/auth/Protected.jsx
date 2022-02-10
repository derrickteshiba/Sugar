import React from "react"
import { Navigate } from "react-router-dom"

export default function Protected({ authLevel, targetLevel, children }) {
  if (authLevel === targetLevel) return children
  switch (authLevel) {
    case 0:
      return <Navigate to="/signup" />
    case 1:
      return <Navigate to="/create" />
    case 2:
      return <Navigate to="/search" />
    default:
      return <Navigate to="/signup" />
  }
}
