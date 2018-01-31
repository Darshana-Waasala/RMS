
from app.employee import GenerateEmployeeData,Employee
from app.visa import GenerateVisaDetails
import random

class TrainingPrograms:
    def __init__(self,
                 programId:int,
                 startDate:str,
                 endDate:str,
                 conductor:str,
                 purpose:str,
                 employeeLevel:list, # list of employee levelIDs
                 participants:list, # list of employeeIds
                 budget:str,
                 completion:bool, # this will mention wither the program is completed or not
                 comments=None,
                 ):
        self.id = programId
        self.startDate = startDate
        self.endDate = endDate
        self.conductor = conductor
        self.purpose = purpose
        self.employeeLevels = employeeLevel
        self.participants = participants
        self.budget = budget
        self.completion = completion
        self.comments = comments

class GenerateTrainigPrograms:
    def generateTrainingPrograms(self)->list:
        """this will give a list of training programs"""
        returningList=[]

        for i in range(0,50):
            tempStartDate = GenerateEmployeeData().randomTime('1/1/1978', '1/1/2005', random.random())
            tempEndDate = GenerateEmployeeData().randomTime(tempStartDate, '1/1/2005', random.random())
            tempEmployeeLevelList = self.getEmployeeLevelList()

            program = TrainingPrograms(
                programId=i,
                startDate=tempStartDate,
                endDate=tempEndDate,
                conductor=random.randint(0,109),
                purpose='purpose {}'.format(random.randint(1,10)),
                employeeLevel=tempEmployeeLevelList,
                participants=self.getProgramParticipants(),
                budget='$ {}'.format(random.randint(50,2000)),
                completion=GenerateVisaDetails().getAvailability(random.randint(0,1))
            )
            d = {'__classname__': type(program).__name__}
            d.update(vars(program))
            returningList.append(d)

        return returningList

    def getEmployeeLevelList(self):
        returnList=[]

        for i in range(1,4): # iterate for four since only 4 levels are available
            tempLevel = random.randint(1,4) #random int is generated between  1 & 4
            if tempLevel not in returnList: # if the level is not in the returnList already then add it
                returnList.append(tempLevel)
        return returnList

    # def getProgramParticipants(self,trainingProgramId,levelList,participantNo,employeeList)->list:
    #
    #     """this will return the list of employeeIds for the given level list"""
    #     participantList=[]
    #
    #     for i in range(1,participantNo): # iterating for the given number of participants
    #         randomNumber = random.randint(0,109)
    #         tempEmp = employeeList[randomNumber] # getting a randomly selected employee
    #         if tempEmp['employeeLevel'] in levelList:
    #             participantList.append(tempEmp['id']) # add the participant id to the returning list
    #
    #             # update the employee with the program id
    #             employeeList[randomNumber]['trainingProgramsParticipated'].append(trainingProgramId)
    #             print(employeeList)
    #     return participantList

    def getProgramParticipants(self):
        returnList=[]
        for i in range(1,random.randint(20,50)):
            tempId = random.randint(0,109)
            if tempId not in returnList:
                returnList.append(tempId)
        return returnList

# print(GenerateTrainigPrograms().generateTrainingPrograms())

