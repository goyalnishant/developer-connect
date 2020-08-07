import React from 'react'
import Header from './Header'
import AllUsers from './AllUsers'
import Friends from './Friends'
import Profile from './Profile'
import api from '../utils/api'


export default class Dashboard extends React.Component{
    state = {
        allUsers : [],
        selectedUser:undefined,
        friends :[]
    }
    async componentDidMount(){
        try{
            console.log('Fetching all users')
            let response = await api.get('/allUsers?pageNo=1&pageSize=5')
            const allUsers = response.data
            const selectedUser = allUsers[0]
            const user_id = selectedUser.user_id
            response = await api.get(`/user/${user_id}/friends?pageNo=1&pageSize=2`)
            const friends = response.data
            this.setState(()=>({
                allUsers,
                selectedUser,
                friends
            }))
            // this.setState({
            //     allUsers,
            //     selectedUser,
            //     friends
            // })
        }catch(error){
            console.log(error)
        }
    }
    handleSelectUser = async (id)=>{
        try{
            let response = await api.get(`/user/${id}`)
            const selectedUser = response.data
            const user_id = selectedUser.user_id
            response = await api.get(`/user/${user_id}/friends?pageNo=1&pageSize=2`)
            const friends = response.data
            this.setState(()=>({
                selectedUser,
                friends
            })
            )

        }catch(error){
            console.log(error)
        }
       
    }
    render(){
        return(
            <div>
                <Header />
                <section className="container">
                    <div className="profile-grid my-1">
                        <div className="profile-top bg-primary p-2">
                            <Profile selectedUser={this.state.selectedUser} />
                        </div>
                        <div className="profile-exp bg-white p-2">
                            <Friends 
                                friends={this.state.friends}
                                handleSelectUser = {this.handleSelectUser}
                            />
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <AllUsers 
                                allUsers={this.state.allUsers}
                                handleSelectUser = {this.handleSelectUser}
                            />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
