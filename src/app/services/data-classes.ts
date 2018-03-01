export class DataClasses {
}

/**
 * the data clases for the views/component rendering
 */

export class SideNavDetails {
    constructor(
        public name: string,    // name of the router link to display
        public icon: string,    // the material icon name
        public routerLink: string,  // the routing path
    ) {
        // this.name = name;
        // this.icon = icon;
        // this.routerLink = routerLink;
    }
    /** the commented lines (above and below) were required
     *  when the constructor parameters were not public 
     */
    // name:string;
    // icon:string;
    // routerLink:string;

}

export class Employee {
    constructor(
        public id: number,
        public employeeLevel: number, // 1-admin, 2-RM, 3-PM, 4-SSE, 5-SE, 6-QA, 7-BA, 8-Intern
        public fullName: string,
        public firstName: string,
        public lastName: string,
        public address: string,
        public email: string,
        public nic: string,
        public birthday: string,
        public gender: string,
        public skills: Array<string>,
        public experience: string,
        public maritalStatus: string,
        public contactNo: string,
        public qualifications: Array<string>,
        public visaDetails: Visa,
        public bloodGroup: string,
        public religion: string,
        public nationality: string,
        public comments: string,
        public joinedDate:string,
        public leavesTaken:string, // this is of the format "3-days,1-half_days"
        public currentProject:number, // the project ID
        public pastProjects?: Array<string>,
        public trainingProgramsParticipated?: Array<string>,
        public imagePath?:string
    ) { }
}

export class EmployeeLevelDetails{
    constructor(
        public id:number, 
        public employeeLevel:number,// 1-admin, 2-RM, 3-PM, 4-SSE, 5-SE, 6-QA, 7-BA, 8-Intern
        public levelName:string, // 1-admin, 2-RM, 3-PM, 4-SSE, 5-SE, 6-QA, 7-BA, 8-Intern
        public leaveLimit:number,
        public monthlySalary:number
    ){}
}

export class Visa{
    constructor(
        public visaAvailablity:boolean,
        public attribute_1:string,
        public attribute_2:string,
    ){}
}

export class TrainingProgram{
    constructor(
        public id:number,
        public startDate:Date,
        public endDate:Date,
        public conductor:string,
        public purpose:string,
        public participants:Array<number>, //array of employee ids
        public budget:string,
        public completion:boolean,
        public comments?:string,
    ){}
}

export class Project{
    constructor(
        public id:number,
        public projectName:string,
        public projectManager:number, // employeeId
        public budjet:string,      // total expected  expences
        public totalExpences:string, // expences upto now
        public startDate:Date,
        public deadLine:Date,
        public projectTeam:Array<number>, // array of employeeId
        public expectedIncome:string,
        public comments:string,
        public customer:string,
        public projectCatogary:string, // critical, urgent, deadline concerned, etc
        public technologiesUsed:Array<string>,
        public developmentMethodalogy:string, // waterfall,ajile,scrum,prototype,spiral,extreeme programming
        public projectSituation:number, // 0-pendingProject, 1-onGoingProject, 2-pastProject
    ){}
}

export class LeaveDetails{
    constructor(
        public id:number, 
        public leaveNumber:number, // 1-full_day 2-first_half 3-second_half
        public name:string, // 1-full_day 2-first_half 3-second_half
    ){}
}

export class Leaves{
    constructor(
        public id:number,
        public employeeId:number,
        // public employeeName:string,
        // public department:string,
        // public designation:string,
        // public email:string,
        public reason: string,
        public contactDuringLeave:string,
        public leaveType:number, // 1 for full_day 2 for first_half 3 for second_half
        public startDate:Date,
        public endDate:Date,
        public leaveDuration:string, // k-days and half
        public approvedByPM:Boolean,
        public approvedByAdmin:Boolean,
        public finalMessageSeen:Boolean,
    ){}
}

export class APIResults<T>{
    constructor(
        public items:T[],
        public total_count:number
    ){}
}
