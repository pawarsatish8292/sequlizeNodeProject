const { Sequelize, DataTypes } = require("sequelize");
    
const db = require('../db.js');
    
    
const  sequelize = db.sequelize;
    
const Employee_one = sequelize.define("Employee_one", {
    
 id: {
    
   type: DataTypes.INTEGER,
   autoIncrement: true,
   allowNull: false,
   primaryKey: true,
    
 },
 name: {
    
   type: DataTypes.STRING,
   allowNull: false,
    
 },
position: {
    
   type: DataTypes.STRING,
   allowNull: false,
    
 },
    
 email: {
    
   type: DataTypes.STRING,
   allowNull: false,
    
 },
wage: {
    
   type: DataTypes.INTEGER,
   allowNull: false,
    
 },
    
});
    
    
    
    
module.exports = Employee_one;