const sqlConfig = require('db/dbconfig')
import Person from 'models/person';
import Task from 'models/task';
import * as sql from 'mssql';

// GET Functions
async function  getPersonType() : Promise<any>
{
    let pool = await sql.connect(sqlConfig);
    let persomTypes =  await  pool.request().execute("GetPersonType");
    return persomTypes;
}

async function getTasksById(personId:number,personTypeId:number) : Promise<any>{
    let pool = await sql.connect(sqlConfig);
    let tasksByAssignedId =  await  pool.request()
    .input('PersonID',sql.Int,personId)
    .input('PersonTypeId',sql.Int,personTypeId)
    .execute("GetTasksById");
    return tasksByAssignedId;
}

async function getTaskDetails(taskId:number) : Promise<any>{
    let pool = await sql.connect(sqlConfig);
    let taskDetails =  await  pool.request()
    .input('TaskID',sql.Int,taskId)
    .execute("GetTaskDetails");
    return taskDetails;
}

async function getLoginDetails(personId:number) :Promise<any> {
    let pool = await sql.connect(sqlConfig);
    let personLoginDetails =  await  pool.request()
    .input('PersonID',sql.Int,personId)
    .execute("GetLoginDetails");
    return personLoginDetails;
}

//POST Functions
async function CreateTask(task:Task) :Promise<any> {
    let pool = await sql.connect(sqlConfig);
    let results =  await  pool.request()

    .input('TaskDescription',sql.NVarChar(sql.MAX),task.TaskDescription)
    .input('DueDate',sql.Date,task.DueDate)
    .input('AssignedBy',sql.Int,task.AssignedBy)
    .input('AssignedTo',sql.Int,task.AssignedTo)
    .execute("CreateTask");

    return  results.rowsAffected;
}

async function RegisterUser(person:Person) :Promise<any> {
    person.FullName = person.FirstName + ' ' + person.LastName;
    let pool = await sql.connect(sqlConfig);
    let results =  await pool.request()

    .input('FirstName',sql.NVarChar(50),person.FirstName)
    .input('LastName',sql.NVarChar(50),person.LastName)
    .input('FullName',sql.NVarChar(250),person.FullName)
    .input('Age',sql.Int,person.Age)
    .input('Username',sql.NVarChar(100),person.Username)
    .input('Password',sql.NVarChar(50),person.Password)
    .input('PersonTypeId',sql.Int,person.PersonTypeID)
    .execute("RegisterUser");

    return  results.rowsAffected;
}

//PUT Functions
async function UpdateDueDate(newDueDate:Date,dueDateUpdateReason:string,taskId:number) :Promise<any> {
    let dueDate = newDueDate;
    let pool = await sql.connect(sqlConfig);
    let results =  await  pool.request()
    .input('DueDate',sql.Date,dueDate)
    .input('Password',sql.NVarChar(50),dueDateUpdateReason)
    .input('TaskID',sql.Int,taskId)
    .execute("UpdateDueDate");

    return  results.rowsAffected;

}
async function UpdateLoginDetails(username:string,password:string,personId:number) :Promise<any> {
    let pool = await sql.connect(sqlConfig);
    let results =  await  pool.request()
    .input('Username',sql.NVarChar(100),username)
    .input('Password',sql.NVarChar(50),password)
    .input('PersonID',sql.Int,personId)
    .execute("UpdateLoginDetails");

    return  results.rowsAffected;


}
async function UpdateTaskAssignedPerson(taskId:number,reassignUpdateReason:string,assignedTo:number) :Promise<any> {
    let pool = await sql.connect(sqlConfig);
    let results =  await  pool.request()
    .input('TaskID',sql.Int,taskId)
    .input('ReassignUpdateReason',sql.NVarChar(sql.MAX),reassignUpdateReason)
    .input('AssignedTo',sql.Int,assignedTo)
    .execute("UpdateTaskAssignedPerson");

    return  results.rowsAffected;
}