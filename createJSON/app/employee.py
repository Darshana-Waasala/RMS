from app.visa import Visa,GenerateVisaDetails
from random import randint
import time
import random

class Employee:
    def __init__(self,
                 id:int,
                 employeeLevel:int, # 1-admin, 2-RM, 3-PM, 4-worker
                 fullName:str,
                 firstName:str,
                 lastName:str,
                 address:str,
                 email:str,
                 nic:str,
                 birthday:str,
                 gender:str,
                 skills:list, # string list
                 experience:str,
                 maritulStatus:str,
                 contactNo:str,
                 qualifications:list, # string list
                 visaDetails:Visa,
                 bloodGroup:str,
                 religion:str,
                 nationality:str,
                 comments:str,
                 joinedDate:str,
                 pastProjects:list=[], # list of projectIds
                 trainingProgramsParticipated:list=[], # list of training programIds
                 imagePath:str=None, # the path to the image
                 ):
        self.id = id
        self.employeeLevel = employeeLevel
        self.fullName = fullName
        self.firstName = firstName
        self.lastName = lastName
        self.address = address
        self.email = email
        self.nic = nic
        self.birthday = birthday
        self.gender = gender
        self.skills = skills
        self.experience = experience
        self.maritalStatus = maritulStatus
        self.contactNo = contactNo
        self.qualifications = qualifications
        self.visaDetails = visaDetails
        self.bloodGroup = bloodGroup
        self.religion = religion
        self.nationality = nationality
        self.comments = comments
        self.joinedDate = joinedDate
        self.pastProjects = pastProjects
        self.trainingProgramsParticipated = trainingProgramsParticipated
        self.imagePath = imagePath

class GenerateEmployeeData:
    def generateEmployeeData(self):
        empList = []
        for i in range(0,110):
            emp = Employee(
                id=i,
                # employeeLevel= self.getEmployeeLevel(0),
                employeeLevel= (i%4) + 1,
                fullName='fullName_{}'.format(i),
                firstName='firstName_{}'.format(i),
                lastName='lastName_{}'.format(i),
                address='address_{}'.format(i),
                email='email@{}'.format(i),
                nic='{}v'.format(randint(800018888,998658888)),
                birthday=self.randomTime('1/1/1978','1/1/1995',random.random()),
                gender=self.getGender(randint(0,10)),
                skills=self.getSkills(randint(1,20)),
                experience='{} years'.format(randint(1,8)),
                maritulStatus=self.getMaritalStatus(randint(0,1)),
                contactNo='0{}'.format(randint(761212123,778899888)),
                qualifications=self.getQualifications(randint(1,10)),
                visaDetails=GenerateVisaDetails().getVisaDetails(),
                bloodGroup=self.getBloodGroup(randint(0,8)),
                religion='religion',
                nationality='sri lankan',
                comments='comments ',
                joinedDate=self.randomTime('1/1/1998','1/1/2005',random.random()),
                trainingProgramsParticipated=self.getTrainingProgramsParticipated(),
                pastProjects=self.getPastProjects(),
                imagePath=self.getImagePath()
            )
            d = {'__classname__': type(emp).__name__}
            d.update(vars(emp))
            empList.append(d)
        return empList

    def randomTime(self,start:str,end:str,prop,format='%m/%d/%Y'):
        """this will return random date between the start and end defined"""
        stime = time.mktime(time.strptime(start, format))
        etime = time.mktime(time.strptime(end, format))

        ptime = stime + prop * (etime - stime)

        return time.strftime(format, time.localtime(ptime))

    def getGender(self,number)->str:
        """this will return gender depending the the number given"""
        if number%2 == 0:
            return 'male'
        else:
            return 'female'

    def getSkills(self,number):
        """this will return set of skills out of defined"""
        skills = ['java','javascript','nodejs','css','scss','angular',
                  'express','sql','mongodb','spark','python','opencv',
                  'native-script','reactjs','backbone-js','docker','unix']
        returnSkills = []

        if number< skills.__len__():
            for item in range(0,number):
                tempSkill = skills[randint(0,skills.__len__()-1)]
                if tempSkill not in returnSkills:
                    returnSkills.append(tempSkill)
                else:
                    continue
            return returnSkills
        else:
            return skills

    def getMaritalStatus(self,number:int)->str:
        if(number==0):
            return 'single'
        else:
            return 'married'

    def getQualifications(self,number:int)->list:
        setOfQualifications = [
            'ocjp','qualification_2','qualification_3','qualification_4','qualification_5'
            , 'qualification_6','qualification_7','qualification_8','qualification_9'
            , 'qualification_10','qualification_11','qualification_12','qualification_13'
        ]

        returnQualificatios = []

        if number< setOfQualifications.__len__():
            for i in range(0,number):
                tempQualificaiton = setOfQualifications[randint(0,setOfQualifications.__len__()-1)]
                if tempQualificaiton not in returnQualificatios:
                    returnQualificatios.append(tempQualificaiton)
                else:
                    continue
            return returnQualificatios
        else:
            return setOfQualifications

    def getBloodGroup(self,number:int)->str:
        if number%8 == 0:
            return 'AB+'
        elif number%8 == 1:
            return 'AB-'
        elif number%8 == 2:
            return 'A+'
        elif number%8 == 3:
            return 'A-'
        elif number%8 == 4:
            return 'B+'
        elif number%8 == 5:
            return 'B-'
        elif number%8 == 6:
            return 'O+'
        else:
            return 'O-'

    def getEmployeeLevel(self,number:int):
        """for parameter 0 this will return only one level/number else all the list"""
        allLevels = [1,2,3,4]
        if number == 0:
            return allLevels[randint(0,3)]
        else:
            return allLevels

    def getPastProjects(self)->list:
        """this will return a int list of projectIds [0-109]"""
        returnList=[]
        for i in range(0,randint(1, 10)):
            randumProjectId = randint(0, 109)
            if randumProjectId not in returnList:
                returnList.append(randumProjectId)

        return returnList

    def getTrainingProgramsParticipated(self)->list:
        """this will return a int list of trainingProgramIds [0-49]"""
        returnList = []
        for i in range(0,randint(1,20)):
            randumTrainingProgmId = randint(0,49)
            if randumTrainingProgmId not in returnList:
                returnList.append(randumTrainingProgmId)

        return returnList

    def getImagePath(self)->str:
        """this will randomly give the image paths
        assuming only 15 png images are there with 1-15 numbering"""

        returnStr = '../../../../assets/image/{}.png'.format(randint(1,15))
        return returnStr


# print('employee list',GenerateEmployeeData().generateEmployeeData())
