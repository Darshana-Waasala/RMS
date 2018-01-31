# from random import randint,random
# from app import employee
from random import randint


class Testing:
    """this is used to test things on"""
    # skills = ['java', 'javascript', 'nodejs', 'css', 'scss', 'angular',
    #           'express', 'sql', 'mongodb', 'spark', 'python', 'opencv',
    #           'native-script', 'reactjs', 'backbone-js', 'docker', 'unix']
    #
    # for i in range(0,10):
    #     print(randint(0,1))

# print(employee.Employee().randomTime('1/1/1978','1/1/1995',random.random()))
    testingList = [1,2,3,4,5,67,6,8,90,0]
    testingObject={'a':'a','b':'b'}

    def updateList(self,listPara):
        listPara.append(111111111)

    def printList(self):
        self.updateList(self.testingList)
        print(self.testingList)

    def printObjectAttr(self):
        print(self.testingObject['a'])

    def returnDoubleLists(self):
        listOne = [1,2,3,3,4,5]
        listTwo = ['sdf','asdf','asdf','asdf']
        return listOne,listTwo

    def getTrainingProgramsParticipated(self)->list:
        """this will return a int list of trainingProgramIds [0-49]"""
        returnList = []
        for i in range(0,randint(1,20)):
            randumTrainingProgmId = randint(0,49)
            if randumTrainingProgmId not in returnList:
                returnList.append(randumTrainingProgmId)

        return returnList

    def serialize_instance(self,obj):
        d = {'__classname__': type(obj).__name__}
        d.update(vars(obj))
        return d

list = [1,2,3,4]
print(list[4])