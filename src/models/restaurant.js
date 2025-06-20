// models/restaurant.js
import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";


const Restaurant = sequelize.define(
   'restaurant',
   {
       id: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
       },


       name: {
           type: DataTypes.STRING,
           allowNull: false,
       },


       description: {
           type: DataTypes.TEXT,
       },


       location: {
           type: DataTypes.STRING,
       },


       ownerId: {
           type: DataTypes.INTEGER,
           allowNull: false,
       },


       deletedAt: {
           type: DataTypes.DATE,
           allowNull: true,
       },
   },
   {
       timestamps: true,
   }


);


Restaurant.associate = (models) => {
   Restaurant.belongsTo(models.User, {
       foreignKey: 'ownerId',
       as: 'owner',
       }
   )
};


export default Restaurant;
