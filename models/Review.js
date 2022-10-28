const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: { model: 'user', key: 'id' }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: 'review'
}
);

module.exports = Review;

