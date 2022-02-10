import "./firebase"

import {
  BrowserRouter as Router,
} from "react-router-dom"

import AppRoot from './components/app/Root'

export default function App() {
  return (
    <Router>
      <div className="d-flex w-100 vh-100 flex-column">
        <AppRoot />
      </div>
    </Router>
  )
}