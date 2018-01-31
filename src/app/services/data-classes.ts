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
        public employeeLevel: number, // 1-dev,SE,QA, 2-PM, 3-RM, 4-Admin
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
        public pastProjects?: Array<string>,
        public trainingProgramsParticipated?: Array<string>,
        public imagePath?:string

    ) { }
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

export class APIResults<T>{
    constructor(
        public items:T[],
        public total_count:number
    ){}
}
