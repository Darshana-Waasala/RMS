
from app import employee,project,training_program
import numpy
import cv2
import json

class Main:

    def serialize_instance(obj):
        d = {'__classname__': type(obj).__name__}
        d.update(vars(obj))
        return d



    # data = {
    #     'employee':{
    #         'items':employee.GenerateEmployeeData().generateEmployeeData(),
    #         'total_count':len(employee.GenerateEmployeeData().generateEmployeeData()) # 110
    #     },
    #     'project':{
    #         'items':project.GenerateProjectData().generateProjectData(),
    #         'total_count':len(project.GenerateProjectData().generateProjectData()) # 110
    #     },
    #     'training_program':{
    #         'items':training_program.GenerateTrainigPrograms().generateTrainingPrograms(),
    #         'total_count':len(training_program.GenerateTrainigPrograms().generateTrainingPrograms()) # 50
    #     },
    #     # 'name': 'ACME1',
    #     # 'shares': 100,
    #     # 'price': 542.23
    # }



    data = {
        'employee':employee.GenerateEmployeeData().generateEmployeeData(),
        'training_program': training_program.GenerateTrainigPrograms().generateTrainingPrograms(),
        'project':project.GenerateProjectData().generateProjectData(),
        'skills':employee.GenerateEmployeeData().getSkills(858585),
        'qualifications':employee.GenerateEmployeeData().getQualifications(858585),
        'employeeLevels':employee.GenerateEmployeeData().getEmployeeLevel(1),

        # 'name': 'ACME1',
        # 'shares': 100,
        # 'price': 542.23
    }

    json_str = json.dumps(data) # convert to json string

    # writing json data
    with open('db.json','w') as f:
        json.dump(data,f)


    # # reading json data
    # with open('db.json','r') as f:
    #     readData = json.load(f)
    #     print(readData)
