const { Sequelize } = require('sequelize');
let db = null
if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    db = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: true
        }
    })
}else{
    db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres'
    });
}

module.exports = db