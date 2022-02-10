import "./firebase"

import {
  BrowserRouter as Router,
} from "react-router-dom"
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth'

import AppRoot from './components/app/Root'
import EditProfileCard from './components/profile/EditProfileCard'

export default function App() {

  return (
    <Router>
      <div className="d-flex w-100 vh-100 flex-column">
        <AppRoot />
      </div>
    </Router>
  )
}

signInWithEmailAndPassword(getAuth(), 'test@gmail.com', 'test123')