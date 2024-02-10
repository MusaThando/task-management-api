class Task
{
    TaskID:number;
    TaskDescription: string;
    CompletionRemarks:string;
    DueDateUpdateReason:string;
    ReassignUpdateReason:string
    StartDate:Date;
    EndDate:Date;
    DueDate:Date;
    AssignedBy:number;
    AssignedTo:number;
}
export default Task;