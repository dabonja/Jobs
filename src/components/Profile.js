import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div  style={{position: 'relative', top:'10px', left:'90%', width:'10%'}}>
        <img src={user.picture} alt={user.name} style={{width:'40px', height: '40px'}}/>
        <p>{user.email}</p>
      {
          /*
          <h4>{user.name}</h4>
          
          */
      }
      </div>
    )
  );
};

export default Profile;