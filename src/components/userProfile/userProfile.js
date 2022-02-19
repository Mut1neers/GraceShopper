import React from 'react'
import { useParams } from "react-router-dom";

const UserProfile = ({userData, token, users, orders, action}) => {

    const { userId } = useParams();

    const user = users.find((user) => userData.id === user.id)

    const ordersToDisplay = orders.filter((order) => order.userId === userData.id)


return ( <div>
            { user ? (
                <h2>Hello {user.username}</h2>
            ) : (
                <h2> no User Here </h2>
            )}
        
            {ordersToDisplay ? (
                <div>
                {ordersToDisplay.map((order) => {
                    return (
                        <>
                        <h2>{order.datePlaced}</h2>
                        </>
                    )
                }
                )}
                
                </div>
                
            ) : (
                <h2> no Orders </h2>
            )}
        </div>
        )

}

export default UserProfile
