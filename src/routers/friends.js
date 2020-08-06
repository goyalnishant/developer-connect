const express = require('express') 
const User = require('../models/user')
const Friendship = require('../models/friendship')

const router = new express.Router() 

router.post('/addFriend', async (req,res)=>{
    try{
        const currentUser = await User.findByPk(req.body.userID)
        const userFriend = await User.findByPk(req.body.friendID)
        if(!currentUser || !userFriend){
            throw new Error('Not found')
        }
        await currentUser.addFriends(userFriend)
        await userFriend.addFriends(currentUser)
        res.status(200).send()
    }catch(e){
        res.status(400).send(e)
    }
})


module.exports = router