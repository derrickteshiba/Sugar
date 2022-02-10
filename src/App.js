import "./firebase"
import { Container, Navbar, Nav } from "react-bootstrap"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import EditProfileCard from "./components/profile/EditProfileCard"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import LoadingSpinner from "./components/LoadingSpinner"
import { useEffect, useState } from "react"
import Center from './components/Center'

// TODO
const SearchPagePlaceholder = () => <p>Search</p>
// TODO
const MatchesPagePlaceholder = () => <p>Matches</p>

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      setLoading(false)
    })
  })

  if (loading)
    return (
      <Center>
        <LoadingSpinner />
      </Center>
    )

  if (!getAuth().currentUser) return null

  const {uid} = getAuth().currentUser

  return (
    <Router>
      <Navbar bg="light" expand="lg" expand={true}>
        <Container fluid>
          <Navbar.Brand href="#">Sugar</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="d-flex justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/search">
                Search
              </Nav.Link>
              <Nav.Link as={Link} to="/matches">
                Matches
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route exact path="/search" element={<SearchPagePlaceholder />} />
        <Route path="/matches" element={<MatchesPagePlaceholder />} />
        <Route
          path="/profile"
          element={<EditProfileCard uid={uid} />}
        />
      </Routes>
    </Router>
  )
}
