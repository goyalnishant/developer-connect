const express = require('express') 
const User = require('../models/user')
const multer = require('multer')
const sharp = require('sharp')


const router = new express.Router() 

router.post('/createUser',async (req, res)=>{
    const user = User.build(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/allUsers', async(req,res)=>{
    const pageNo = parseInt(req.query.pageNo)
    const pageSize = parseInt(req.query.pageSize)

    const users = await User.findAll({
        attributes: ['user_id','username', 'firstName','lastName','avatar'],
        offset:(pageNo-1)*pageSize,
        limit:pageSize
    })
    res.status(200).send(users)
})

router.get('/user/:id',async (req,res)=>{
    try{
        const user = await User.findOne({
            where:{
                user_id:req.params.id
            },
            attributes: ['user_id','username', 'firstName','lastName','avatar']
        })
        if(!user){
            throw new Error()
        }
        res.status(200).send(user)
    }catch(e){
        res.status(404).send()
    }
})

router.get('/user/:id/friends', async (req,res)=>{
    try{
        const userId = req.params.id
        const pageNo = parseInt(req.query.pageNo)
        const pageSize = parseInt(req.query.pageSize)
        const user = await User.findByPk(userId)
        // console.log(user.username)
        const friendsList = await user.getFriends({
            attributes: ['user_id','username', 'firstName','lastName','avatar'],
            offset:(pageNo-1)*pageSize,
            limit:pageSize
        })
        const responseList = friendsList.map((friend)=>(
            {
                user_id:friend.dataValues.user_id,
                username:friend.dataValues.username,
                firstName:friend.dataValues.firstName,
                lastName:friend.dataValues.lastName,
                avatar:friend.dataValues.avatar
            }
        ))
        res.status(200).send(responseList)
    }catch(e){
        res.status(404).send(e)
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file, cb){
        if(!file.originalname.match(/\.(png|jpeg|jpg)$/)){
            return cb(new Error('Please upload an valid image'))
        }
        cb(undefined,true)
    }
})

router.post('/user/:id/avatar', upload.single('avatar'), async(req,res)=>{
    try{
        const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
        await User.update({avatar:buffer},{
            where:{
                user_id:req.params.id
            }
        })
        res.status(200).send()
    }catch(e){
        res.status(400).send()
    }
})

router.get('/user/:id/avatar', async (req,res)=>{
    try{
        const user = await User.findByPk(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})


module.exports = router