module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Post;
};
