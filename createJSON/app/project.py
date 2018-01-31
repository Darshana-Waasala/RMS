from random import randint
import random
from app.employee import GenerateEmployeeData

class Project:
    def __init__(self,
                 projectId:int,
                 projectManager:int, # employeeId
                 budjet:str,
                 totalExpences:str,
                 startDate:str,
                 deadLine:str,
                 projectTeam:list, # list of employeeId
                 expectedIncome:str,
                 comments:str,
                 customer:str,
                 projectCatagory:str,
                 technologiesUsed:list, # list of strings
                 developmentMethodalogy:str, # waterfall,ajile,scrum,prototype,spiral,extreeme programming
                 projectSituation:int, # 0-pendingProject, 1-onGoingProject, 2-pastProject
                 ):
        self.id = projectId
        self.projectManager = projectManager
        self.budjet = budjet
        self.totalExpences = totalExpences
        self.startDate = startDate
        self.deadLine = deadLine
        self.projectTeam = projectTeam
        self.expectedIncome = expectedIncome
        self.comments = comments
        self.customer = customer
        self.projectCatogary = projectCatagory
        self.technologiesUsed = technologiesUsed
        self.developmentMethodalogy = developmentMethodalogy
        self.projectSituation = projectSituation


class GenerateProjectData:
    def generateProjectData(self)->list:

        projectList = []
        for i in range(0,110):

            tempStartDate = GenerateEmployeeData().randomTime('1/1/1978','1/1/2005',random.random())
            tempEndDate = GenerateEmployeeData().randomTime(tempStartDate,'1/1/2005',random.random())
            tempBudget = randint(100000,888888)
            tempCustomerName = 'name_{}'.format(randint(1,30))

            project = Project(
                projectId=i,
                projectManager=self.getOnetProjectManager(),
                budjet='$ {}'.format(tempBudget),
                totalExpences='$ {}'.format(randint(100000,tempBudget)),
                startDate=tempStartDate,
                deadLine=tempEndDate,
                projectTeam=self.getListOfEmployees(randint(5,20)),
                expectedIncome='$ {}'.format(randint(tempBudget,888888)),
                comments='comments',
                customer=tempCustomerName,
                projectCatagory='catogary_{}'.format(randint(1,30)),
                technologiesUsed=GenerateEmployeeData().getSkills(randint(5,15)),
                developmentMethodalogy=self.getDevelopmentMethodalogy(),
                projectSituation=self.getProjectSituation()
            )
            d = {'__classname__': type(project).__name__}
            d.update(vars(project))
            projectList.append(d)

        return projectList

    def getListOfEmployees(self,number):
        """number argument will give the nuber of people in the team"""
        retuningList =[]
        for i in range(0,number):
            retuningList.append(randint(0,109))
        return retuningList

    def getDevelopmentMethodalogy(self)->str:
        """this will return one of defined development methodalogies"""
        listOfDevelopmentMethods = [
            'water-fall','agile','scrum','extreeme-programming','prototyping','spiral'
        ]
        return listOfDevelopmentMethods[randint(0,(listOfDevelopmentMethods.__len__()-1))]

    def getOnetProjectManager(self)->int:
        """PMs are having the employee level 2"""
        foundPM = False

        while not foundPM:
            tempID =randint(0,109)
            if (tempID%4+1) == 2:
                foundPM = True
                return tempID
            else:
                continue

    def getProjectSituation(self)->int:
        """this will randomly return one of the project situations"""
        listOfAllSituations = [0,1,2] # 0-pendingProject, 1-onGoingProject, 2-pastProject
        return listOfAllSituations[randint(0,2)]

# print('project list ',GenerateProjectData().generateProjectData())
