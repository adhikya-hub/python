class Person:
    def __init__(self):
        self.__name="Geeks"
        self.__age=10
        
    def get_name(self):
        return self.__name
    
    def get_age(self):
        return self.__age
    
    def set_name(self,n):
        self.__name=n
    
    def set_age(self,a):
        self.__age=a
        
p=Person()
print(p.get_name())
p.set_name("J")
print(p.get_name())
print(p.get_age())
p.set_age(100)
print(p.get_age())
