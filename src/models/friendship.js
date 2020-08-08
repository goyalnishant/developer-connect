const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/postgres')
const User = require('./user')


const Friendship = db.define('friendships', {
    userId: {
      type: DataTypes.INTEGER
    },
  
    friendId: {
      type: DataTypes.INTEGER
    }  
  })

Friendship.sync().then(()=>{
    console.log('Friendship Table created')
})

User.belongsToMany(User, {through:'friendships', as:'Friends', foreignKey:'userId', otherKey:'friendId'})

module.exports = Friendship