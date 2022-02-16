import React from 'react'
import { useParams, Link, useHistory } from "react-router-dom";
import { callApi } from "../../api";

const UserProfile = ({userData, token, users}) => {

    const History = useHistory()
    const { userId } = useParams();
    const user = users.find((user) => parseInt(userId) === user.id)
    const isUser = userData.username === token.username

    return ( <div>
        {user ? (
            <h2>Hello {user.username}</h2>
        ) : (
            <h2> no User Here </h2>
        )}
        
        </div>
        )

}

export default UserProfile