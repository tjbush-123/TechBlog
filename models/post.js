const { Model, DataTypes } = require('sequelize');
const  sequelize  = require('../config/connection.js');

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    sequelize,
    timestamps: true,
    modelName: 'posts',
});

module.exports = Post;