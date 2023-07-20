const db = require('./db');
   
const Employee = db.Employee;
const Project = db.Project;
const Employee_project = db.Employee_project;
 
 module.exports ={
  junctionCreate,
   insertEmployee,
   insertProject,
   findAllEmployees,
   findEmployeeProjects,
   findAllProjects,
   findProjectEmployees
  
 };
  
 
 
 async function  insertEmployee(name, position, email, wage) {

  await Employee.create({name, position, email, wage});
  
}
  
 
async function  insertProject(name) {
  
  await Project.create({name});
  
}
 
  
 async function junctionCreate(EmployeeId, ProjectId) {
   
  const employee_project = await Employee_project.create( { EmployeeId, ProjectId });
      
   return employee_project;
   
   
  }
   

async function findAllEmployees(){
 
const employees= await Employee.findAll({
  include: [
    {
      model: Project,
       
      attributes: ["name"],
      through: {
        attributes: ["EmployeeId", "ProjectId"],
      }
 
    },
  ],
});
 
return employees;

}

 
async function findEmployeeProjects(id){
 
  const employee= await Employee.findByPk(id, {
    include: [
      {
        model: Project,
         
        attributes: ["name"],
        through: {
          attributes: ["EmployeeId", "ProjectId"],
        }
   
      },
    ],
  });
   
  return employee;
   
  }
 

 
async function findAllProjects(){
 
  const projects = await Project.findAll({
    include: [
      {
        model: Employee,
         
        attributes: ["name"],
        through: {
          attributes: ["EmployeeId", "ProjectId"],
        }
   
      },
    ],
  });
   
  return projects;

   
  }
    

  async function findProjectEmployees(id){
 
    const project = await Project.findByPk(id, {
      include: [
        {
          model: Employee,
           
          attributes: ["name"],
          through: {
            attributes: ["EmployeeId", "ProjectId"],
          }
     
        },
      ],
    });
     
    return project;
     
     
     
    }