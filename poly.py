class A:
    def __init__(self, a):
        self.a = a

    # define behavior of +
    def __add__(self, other):
        return self.a + other.a 

ob1 = A(1)
ob2 = A(2)
ob3 = A("Geeks")
ob4 = A("For")

print(ob1 + ob2)   # integer addition
print(ob3 + ob4)   # string concatenation

# actual working (internally)
print(A.__add__(ob1, ob2))
print(ob1.__add__(ob2))