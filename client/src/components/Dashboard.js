import React from 'react'
import Header from './Header'
import AllUsers from './AllUsers'
import Friends from './Friends'
import Profile from './Profile'
import api from '../utils/api'
import ReactPaginate from 'react-paginate'

export default class Dashboard extends React.Component{
    state = {
        allUsers : [],
        selectedUser:undefined,
        friends :[],
        currentPageUser:1,
        currentPageFriend:1
    }
    async componentDidMount(){
        try{
            console.log('Fetching all users')
            let response = await api.get('/allUsers?pageNo=1&pageSize=2')
            const allUsers = response.data
            const selectedUser = allUsers[0]
            const user_id = selectedUser.user_id
            response = await api.get(`/user/${user_id}/friends?pageNo=1&pageSize=1`)
            const friends = response.data
            this.setState(()=>({
                allUsers,
                selectedUser,
                friends
            }))
        }catch(error){
            console.log(error)
        }
    }

    receivedNextUsers = async () =>{
        const response = await api.get(`/allUsers?pageNo=${this.state.currentPageUser}&pageSize=2`)
        const allUsers = response.data
        this.setState(()=>({
            allUsers
        }))
    }

    receivedNextFriends = async () =>{
        const response = await api.get(`/user/${this.state.selectedUser.user_id}/friends?pageNo=${this.state.currentPageFriend}&pageSize=1`)
        const friends = response.data
        this.setState(()=>({
            friends
        }))
    }

    handleAllUsersPageClick = (e) => {
        const currentPageUser = e.selected
        this.setState({
            currentPageUser:currentPageUser + 1
        }, () => {
            this.receivedNextUsers()
        })

    }

    handleFriendsPageClick = (e) =>{
        const currentPageFriend = e.selected
        this.setState({
            currentPageFriend:currentPageFriend + 1
        }, () => {
            this.receivedNextFriends()
        })
    }

    handleSelectUser = async (id)=>{
        try{
            let response = await api.get(`/user/${id}`)
            const selectedUser = response.data
            const user_id = selectedUser.user_id
            response = await api.get(`/user/${user_id}/friends?pageNo=1&pageSize=1`)
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
                            <ReactPaginate
                                previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={3}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handleFriendsPageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}/>
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <AllUsers 
                                allUsers={this.state.allUsers}
                                handleSelectUser = {this.handleSelectUser}
                            />
                            <ReactPaginate
                                previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={3}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handleAllUsersPageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}/>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
