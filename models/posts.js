module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define("Posts", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Posts.associate = function(models) {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade"
    });
  };

  return Posts;
};
