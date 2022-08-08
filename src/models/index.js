import { readdirSync } from 'fs';
import { basename, join } from 'path';
import Sequelize from 'sequelize';
import config from '../../config/database.js';

const db = {};
const sequelize = new Sequelize(config);

readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename(__filename)) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = sequelize.import(join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

export default db;