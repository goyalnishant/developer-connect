import React from 'react'
import User from './User'
const AllUsers = (props) => {
    return (
        <div>
         <h2 className="text-primary">All Users</h2>
            {
                props.allUsers.map((user,index)=>
                    <User 
                        key={user.username}
                        username={user.username}
                        user_id={user.user_id}
                        avatar={user.avatar}
                        handleSelectUser = {props.handleSelectUser}
                    />
                )
            }
            <User />
        </div>
    )
}

export default AllUsers
