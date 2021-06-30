import React, { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const getAccessToken = async () => {
      const domain = "s2factory.jp.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        console.log(`AccessToken: ${accessToken}`)

        setAccessToken(accessToken)
      } catch (e) {
        console.log(e.message);
        setAccessToken(e.message)
      }
    };

    getAccessToken();
  }, [ getAccessTokenSilently ]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated && user) {
  return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>アクセストークン</h3>
        <p>{accessToken}</p>
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