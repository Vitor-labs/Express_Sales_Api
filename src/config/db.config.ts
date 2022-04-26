import { Sequelize } from 'sequelize';

const db = new Sequelize('app', '', '', {
    storage: '../database/test.sqlite3', // ':memory:' for sqlite in-memory database 
    // '../database/db.sqlite' for sqlite on disk database
    dialect: 'sqlite',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default db;