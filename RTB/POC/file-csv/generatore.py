from random import seed
from random import randint
from datetime import datetime

n= int(input("Points number: "))
fileName= input("File name: ")

file= open(fileName+".csv", "x")
seed(datetime.now())

file.write("A,B\n")

for i in range(n):
    file.write(str(randint(0,70))+","+str(randint(0,70))+"\n")