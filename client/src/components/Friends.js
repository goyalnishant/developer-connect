import React from 'react'
import User from './User'

const Friends = (props) => {
    return (
        <div>
        <h2 className="text-primary">Friends</h2>
            {
                props.friends.map((friend,index)=>
                <User 
                    key={friend.user_id}
                    username={friend.username}
                    user_id={friend.user_id}
                    avatar={friend.avatar}
                    handleSelectUser={props.handleSelectUser}
                />
                )
            }
        </div>
    )
}

export default Friends
