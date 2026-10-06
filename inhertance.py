class A():
    def __init__(self,a):
        self.a=a
    
    def f1(self):
        print("F1",self.a)

class B(A):

    def __init__(self,a,b):
        super().__init__(a)
        self.b=b

    def f2(self):
        print("F2",self.a,self.b)

o=B("xyz",'j')
o.f2()
o.f1()

print(B.mro())

