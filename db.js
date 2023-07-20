const config = require('./config.js');
const mysql = require('mysql2');
  
const Sequelize = require('sequelize');
   
module.exports = db = {};
   
   
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
       
   const pool =  mysql.createPool({ host, port, user, password });
   
     pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
   
    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql',
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
       
      } } 
    );
    db.sequelize = sequelize ;
   
    // init the Employee and Project models and add them to the exported db object
     
   const Employee = require('./models/employee.js');
    const Project = require('./models/project.js');
    const Employee_project = require('./models/employee_project');
    const Employee_one = require('./models/employee_one');
    const Setting = require('./models/setting.js')

  
    db.Employee = Employee;
    db.Project = Project;
    db.Employee_project = Employee_project;
    db.Employee_one = Employee_one;
    db.Setting = Setting;
    // sync all models with database
     sequelize.sync(); 