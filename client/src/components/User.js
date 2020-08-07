import React from 'react'
import arrayBufferToImage from '../utils/arrayBufferToImage'
import showcase from '../img/profile-pic.jpg'
const User = (props) => {
    return (
        <div>
            {props.avatar && 
                <img className="avatar"
                    src={arrayBufferToImage(props.avatar.data)}
                    alt=""
                />
            }
            {
                props.username && !props.avatar && 
                <img className="avatar"
                    src={showcase}
                    alt=""
                />
            }
            {props.username &&
                <span 
                    onClick={(e)=>{props.handleSelectUser(props.user_id)}}
                >
                <strong className="m-1"> {props.username} </strong>
                </span>}
        </div>
    )
}
export default User
