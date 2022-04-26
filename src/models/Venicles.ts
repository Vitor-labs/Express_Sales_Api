import { Model, DataTypes } from 'sequelize';
import db from '../config/db.config';

interface IVenicle {
    id: number;
    mark: string;
    model: string;
    year: number;
    color: string;
    chassis: string;
    engine: string;
    price: number;
    description: string;
    status: string;
}

class Venicle extends Model<IVenicle> { }

Venicle.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    mark: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chassis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    engine: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'on_sale'
    }
}, {
    sequelize: db,
    tableName: 'venicles'
});

export default Venicle;