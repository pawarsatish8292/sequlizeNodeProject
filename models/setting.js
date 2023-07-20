const { Sequelize, DataTypes } = require("sequelize");
    
const db = require('../db.js');
    

const Employee_one = require('./employee_one.js');    
const  sequelize = db.sequelize;
    
const Setting = sequelize.define("Setting", {
    
  id: {
 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  
  },
 
 theme: {
    
   type: DataTypes.STRING,
   allowNull: false,
    
 },
autoLogin: {
    
   type: DataTypes.BOOLEAN,
   allowNull: false,
    
 }
    
  
    
});

Employee_one.hasOne(Setting);
Setting.belongsTo(Employee_one);

module.exports = Setting;