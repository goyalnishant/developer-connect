const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/postgres')
const bcrypt = require('bcryptjs')

const User = db.define('user',{
    userId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            len: [5, 10]
          }
      },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    avatar:{
        type:DataTypes.BLOB
    }
},{
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
})

const Friendship = db.define('friendships', {
    userId: {
      type: Sequelize.INTEGER
    },
  
    friendId: {
      type: Sequelize.INTEGER
    }  
  })

User.sync().then(()=>{
    console.log('User Table created')
})

module.exports = User