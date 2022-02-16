import React from 'react'
import { useParams, Link, useHistory } from "react-router-dom";
import { callApi } from "../../api";

const UserProfile = ({userData, token}) => {

    const History = useHistory()
    const { userId } = useParams();
    const isUser = userData.username === token.username

    return (
        <h2>Hello {userData.username}</h2>
    )

}

export default UserProfile