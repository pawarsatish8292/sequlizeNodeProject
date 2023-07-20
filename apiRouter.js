 //apiRouter.js
  
 const express =require('express');
 const apiRouter = express.Router();
 const  {junctionCreate, findAllEmployees,findEmployeeProjects, findAllProjects,findProjectEmployees, insertEmployee,
     insertProject }= require('./controller.js');
   
   
   
   
     // Create an employee
   
 apiRouter.post('/employee',  async (req, res, next)=>{
     try{
         const name = req.body.employee.name;
         const position = req.body.employee.position;
         const email = req.body.employee.email;
         const wage = req.body.employee.wage;
         console.log(name);
               if (!name || !position || !wage) {
                 return res.sendStatus(400);
              }
    
         const employee =  await insertEmployee(name, position, email, wage).then(() => res.json({ message: 'Employee created.' }));
           
           
    
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });
  
  
  
  
  
  
  
  
  // Create a project
   
 apiRouter.post('/project',  async (req, res, next)=>{
     try{
         const name = req.body.project.name;
          
         console.log(name);
               if (!name) {
                 return res.sendStatus(400);
              }
    
         const company =  await insertProject(name).then(() => res.json({ message: 'Project created.' }));
           
           
    
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });
  
   
  
  
  
  
  
  
  
   // Create a record in the junction table Employee_project.
   
 apiRouter.post('/employee-project',  async (req, res, next)=>{
     try{
         const employeeId = req.body.employeeProject.EmployeeId;
         const projectId = req.body.employeeProject.ProjectId;
         console.log(employeeId);
         console.log(projectId);
          
               if (!employeeId || !projectId) {
                 return res.sendStatus(400);
              }
    
         const employeeProject =  await junctionCreate(employeeId, projectId).then(() => res.json({ message: 'Employee project created.' }));
           
           
    
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });
   
     
   
   
   
   
     
    
   
    // Get all employees and the projects they are working on using the junction table.
    
  apiRouter.get('/employee-project', async (req, res, next)=>{
     try {
         const employees = await findAllEmployees();
         res.status(200).json({employees: employees});
     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
  });
   
  
  
  
 // Get an employee projects
  
  apiRouter.param('employeeId', async (req, res, next, employeeId)=> {
     try{
         const employee = await findEmployeeProjects(employeeId);
         console.log(employee);
         req.employee = employee;
         next(); // go to apiRouter.get('/employee/:employeeId')
     } catch(e) {
         console.log(e);
         res.sendStatus(404);
     }
  });
    
    
    
    
  apiRouter.get('/employee/:employeeId',  (req, res, next)=>{
     res.status(200).json({employee: req.employee});
  });
  
  
  
  
  
  
  
  
  
  
  
  
 // Get all projects and the employees  working on them using the junction table.
    
 apiRouter.get('/project-employee', async (req, res, next)=>{
     try {
         const projects = await findAllProjects();
         res.status(200).json({projects: projects});
     } catch(e) {
         console.log(e);
         res.sendStatus(500);
     }
  });
  
  
  
  // Get a project employees
   
  apiRouter.param('projectId', async (req, res, next, projectId)=> {
     try{
         const project = await findProjectEmployees(projectId);
         req.project = project;
         next(); // go to apiRouter.get('/project/:projectId')
     } catch(e) {
         console.log(e);
         res.sendStatus(404);
     }
  });
    
    
  apiRouter.get('/project/:projectId',  (req, res, next)=>{
     res.status(200).json({project: req.project});
  });
   
   
 module.exports = apiRouter;