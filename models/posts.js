module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define("Posts", {
    // Giving the Author model a name of type STRING
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
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Posts.hasMany(models.Comments, {
      onDelete: "cascade"
    });
  };

  return Posts;
};
