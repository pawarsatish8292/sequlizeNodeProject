const {Sequelize, DataTypes} = require('sequelize');
const db = require('../db.js');

const sequelize = db.sequelize;

const Employee = require('./employee.js');
const Project = require('./project.js');

const Employee_project = sequelize.define("Employee_project",{
    EmployeeId:{
        type:DataTypes.INTEGER,
        references:{
            model:Employee,
            key :'id'
        }
    },
    ProjectId:{
        type:DataTypes.INTEGER,
        references:{
            model:Project,
            key:'id'
        }
    }
},
{
    freezeTableName: true,
    timestamps: false
});

Employee.belongsToMany(Project, { through: Employee_project });
Project.belongsToMany(Employee, { through: Employee_project });

module.exports = Employee_project;