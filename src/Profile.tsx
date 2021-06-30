import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated && user) {
  return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Logout />
      </div>
    );
  }

  return (
    <div>
      <p>Auth0 Example</p>
      <Login />
    </div>
  );
};

export default Profile;