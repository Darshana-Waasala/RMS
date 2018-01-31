from random import randint

class Visa:
    def __init__(self,
                 visaAvailablity: bool,
                 attribute_1: str,
                 attribute_2: str,
                 ):
        self.visaAvailablity = visaAvailablity
        self.attribute_1 = attribute_1
        self.attribute_2 = attribute_2


class GenerateVisaDetails:
    def getVisaDetails(self):
        """return a new instance of Visa"""

        availability = self.getAvailability(randint(0,1))
        if availability:

            visa = Visa(
                visaAvailablity=True,
                attribute_1= 'attribute one',
                attribute_2='attribute two'
            )
        else:
            visa = Visa(
                visaAvailablity=False,
                attribute_1='None',
                attribute_2='None',
            )
        d = {'__classname__': type(visa).__name__}
        d.update(vars(visa))
        return d

    def getAvailability(self,num)->bool:
        if num%2 ==0:
            return True
        else:
            return False

print(GenerateVisaDetails().getVisaDetails())