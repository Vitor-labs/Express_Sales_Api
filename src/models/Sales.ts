import { Model, DataTypes } from 'sequelize';
import db from '../config/db.config';

interface ISale {
    id: number;
    saler_id: string;
    venicle_id: string;
    status: string;
    value: number;
    madedAt: Date;
}

export class Sale extends Model<ISale> { }

Sale.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    saler_id: {
        type: DataTypes.UUIDV4,
        allowNull: false
    },
    venicle_id: {
        type: DataTypes.UUIDV4,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'sold',
        allowNull: false
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    madedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize: db,
    modelName: 'Sale'
});
