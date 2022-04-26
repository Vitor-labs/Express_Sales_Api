import { Model, DataTypes } from 'sequelize';
import db from '../config/db.config';

interface IUser {
    id: string;
    cpf: string;
    name: string;
    email: string;
    avatar: string;
    password: string;
    biography: string;
    sales: number;
    reservations: number;
    isAdmin: boolean;
}

export class User extends Model<IUser> { }

User.init({
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    biography: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sales: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    reservations: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: db,
    tableName: 'users'
});
