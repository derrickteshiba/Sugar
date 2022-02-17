import React from "react";

import { Routes, Route, Outlet } from "react-router-dom";

import EditProfileCard from "../profile/EditProfileCard"
import CreateProfileCard from "../profile/CreateProfileCard"
import LoadingSpinner from "../LoadingSpinner"
import Center from "../Center"
import Protected from "../auth/Protected"
import AppNavbar from "../app/Navbar"
import useAuthLevel from "../app/useAuthLevel"
import Login from "../LoginSignup/Login"
import Signup from "../LoginSignup/Signup"
import Matches from "./matches"

const SignupPagePlaceholder = () => <Signup />
// TODO

// TODO
const LoginPagePlaceholder = () => <Login />;

const SearchPagePlaceholder = () => <p>Search</p>;
// TODO
const MatchesPagePlaceholder = () => <Matches />

/**
 * Auth Level:
 * 0 - Unauthorized, no firebase account
 * 1 - Authorized, but no public profile created
 * 2 - Authorized and has public profile
 */

export default function AppRoot() {
  const { loading, user, profile } = useAuthLevel();

  if (loading)
    return (
      <Center>
        <LoadingSpinner />
      </Center>
    );
    
  const uid = user?.uid;

  const authLevel = user ? (profile ? 2 : 1) : 0;

  const renderProtection = (targetLevel) => (
    <Protected authLevel={authLevel} targetLevel={targetLevel}>
      <Outlet />
    </Protected>
  );

  return (
    <>
      <AppNavbar authLevel={authLevel} />
      <Routes>
        <Route exact path="*" element={renderProtection(-1)} />
        <Route element={renderProtection(0)}>
          <Route exact path="/signup" element={<SignupPagePlaceholder />} />
          <Route exact path="/login" element={<LoginPagePlaceholder />} />
        </Route>
        <Route element={renderProtection(1)}>
          <Route
            exact
            path="/create"
            element={<CreateProfileCard uid={uid} />}
          />
        </Route>
        <Route element={renderProtection(2)}>
          <Route exact path="/search" element={<SearchPagePlaceholder />} />
          <Route exact path="/matches" element={<MatchesPagePlaceholder />} />

          <Route
            exact
            path="/profile"
            element={<EditProfileCard uid={uid} />}
          />
        </Route>
      </Routes>
    </>
  );
}
