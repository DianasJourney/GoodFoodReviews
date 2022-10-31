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
        user_id: {
            type: DataTypes.INTEGER,
            references: { model: 'user', key: 'id' }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        //this will belong to the user who wrote it for and will also belong to the review it is written on
        review_id: {
            type: DataTypes.INTEGER,
            references: { model: 'review', key: 'id' }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: false,
        modelName: 'comment'

    }
);

module.exports = Comment;
