import React from 'react'
import arrayBufferToImage from '../utils/arrayBufferToImage'
import showcase from '../img/profile-pic.jpg'
const Profile = (props) => {
    return (
        <div>
        {props.selectedUser && props.selectedUser.avatar && 
            <img className="round-img my-1"
                src={arrayBufferToImage(props.selectedUser.avatar.data)}
                alt=""
             />
        }
        {props.selectedUser && !props.selectedUser.avatar && 
            <img className="round-img my-1"
                src={showcase}
                alt=""
             />
        }
        {props.selectedUser && <h1 className="large">{props.selectedUser.username}</h1>}
        {props.selectedUser && <p className="lead">{props.selectedUser.firstName} {props.selectedUser.lastName}</p>}        
        </div>
    )
}

export default Profile
