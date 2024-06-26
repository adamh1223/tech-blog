// hash the pw using bcrypt
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(passwordToCheck) {
    return bcrypt.compareSync(passwordToCheck, this.user_password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  },
  {
    hooks: {
      beforeCreate: async (userData) => {
        userData.user_password = await bcrypt.hash(userData.user_password, 10);
        return userData;
      },
      beforeUpdate: async (userData) => {
        userData.user_password = await bcrypt.hash(userData.user_password, 10);
        return userData;
      },
    },
  }
);

module.exports = User;
