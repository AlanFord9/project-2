module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 240]
      }
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Personal"
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "N/A",
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "N/A",
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
