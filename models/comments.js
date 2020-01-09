'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        body: DataTypes.TEXT
    }, {});
    Comments.associate = function (models) {
        // associations can be defined here
        Comments.belongsTo(models.Posts, {
            as: 'Posts',
            foreignKey: 'id'
        })
    };
    return Comments;
};