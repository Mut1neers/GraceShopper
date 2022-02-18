import React from 'react'
import { useParams } from "react-router-dom";

const UserProfile = ({userData, token, users, orders, action}) => {

    const { userId } = useParams();
    const user = users.find((user) => parseInt(userId) === user.id)
    const theUser = users.find((theUser) => userData.id === theUser.id)

    console.log("THE USER", theUser)

    const ordersToDisplay = orders.filter((order) => order.userId === parseInt(userId))
    console.log('ordersToDisplay', ordersToDisplay)

    console.log('Action', action)


    return ( <div>
                    { action === 'myAccount' ? (
                        <div>{ theUser.username }</div>

                    ) : (
                        <div>
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
                        </div>) 
                                }

        
        </div>
        )

}

export default UserProfile