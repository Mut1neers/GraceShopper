import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { callApi } from '../../api';

const UserProfile = ({ userData, token, users, orders }) => {
  const History = useHistory();
  const { userId } = useParams();
  const user = users.find((user) => parseInt(userId) === user.id);
  const ordersToDisplay = orders.filter((order) => order.userId === parseInt(userId));
  console.log('ordersToDisplay', ordersToDisplay);

  // const isTheUser = token.id === user.id

  return (
    <div>
      <div>{user ? <h2>Hello {user.username}</h2> : <h2> no User Here </h2>}</div>

      <div>
        {ordersToDisplay ? (
          <div>
            {ordersToDisplay.map((order) => {
              return (
                <>
                  <h2>{order.datePlaced}</h2>
                </>
              );
            })}
          </div>
        ) : (
          <h2> no Orders </h2>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
