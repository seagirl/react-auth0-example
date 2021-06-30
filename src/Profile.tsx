import React, { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [accessToken, setAccessToken] = useState("");
  const [responseBody, setResponseBody] = useState("");

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `http://localhost:3001`,
          scope: "read:current_user",
        });

        console.log(`AccessToken: ${accessToken}`)

        setAccessToken(accessToken)

        const response = await fetch('http://localhost:3001/api/authorized', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const responseBody = `${response.status}: ${await response.text()}`

        console.log(`[API Response] ${responseBody}`)
        setResponseBody(responseBody)

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
        <h2>{user.sub}</h2>
        <p>{user.email}</p>
        <h3>アクセストークン</h3>
        <p>{accessToken}</p>
        <h3>API レスポンス</h3>
        <p>{responseBody}</p>
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