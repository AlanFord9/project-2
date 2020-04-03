module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define("Comments", {
    // Giving the Author model a name of type STRING
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Comments.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Comments.belongsTo(models.User, {
      onDelete: "cascade"
    });
  };
  return Comments;
};
