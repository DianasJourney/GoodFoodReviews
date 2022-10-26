const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: { model: 'user', key: 'id'}
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored:true,
        modelName: 'comment'

    }
);

module.exports = Comment;
