import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import hashUtils from '../utils/hash.js';

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("customer", "admin", "restaurant", "delivery"),
      allowNull: false,
      defaultValue: "customer",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    paranoid: true, // Enables soft deletes
  }
);

User.addHook("beforeCreate", async (user) => {
  if (user.password) {
    user.password = await hashUtils.hashPassword(user.password);
  }
});

User.addHook("beforeUpdate", async (user) => {
  if (user.changed("password")) {
    user.password = await hashUtils.hashPassword(user.password);
  }
});

User.prototype.validPassword = async function (password) {
  return await hashUtils.comparePassword(password, this.password);
};

export default User;
