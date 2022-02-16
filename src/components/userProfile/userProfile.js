import React from 'react'
import { useParams } from "react-router-dom";



const UserProfile = ({userData, token, users}) => {

    let { userId } = useParams()
    const user = users.find((user) => parseInt(userId) === user.id );

    return (
     <div>
         {user ? (
             <h2> {user.username}</h2>
         ) : (
             <h2>User does not exist</h2>
         )
         }
       
     </div>
    );

}

export default UserProfile