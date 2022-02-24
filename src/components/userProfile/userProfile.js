import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = ({ userData, token, users, orders }) => {
  const { userId } = useParams();

  const user = users.find((user) => userData.id === user.id);

  // const ordersToDisplay = orders.filter((order) => order.userId === userData.id)

  return (
    <div>
      {user ? (
        <div className="profile">
          <h1>Our old nemesis, {user.username}</h1>
          <h2>
            {user.firstname} {user.lastname}
          </h2>
          <h3>{user.email}</h3>
        </div>
      ) : (
        <div> No Lurkers! Please sign in. </div>
      )}
    </div>
  );
};

export default UserProfile;
