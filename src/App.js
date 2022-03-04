import "./firebase";

import { BrowserRouter as Router } from "react-router-dom";

import AppRoot from "./components/app/Root";
import { MatchProfileAccepted } from "./components/app/matchProfile";

export default function App() {
  return (
    <Router>
      <div className="d-flex w-100 vh-100 flex-column">
        <MatchProfileAccepted uid={'54X7E4YjS8R0en4qXGOWvfkUoeV2'}/>
      </div>
    </Router>
  );
}
