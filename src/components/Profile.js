import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="expense m-1" >
        <img  src={user.picture} alt={user.name} style={{width:'30px', height: '30px'}}/>
        <span className="bg-primary">{user.email}</span>
      </div>
    )
  );
};

export default Profile;