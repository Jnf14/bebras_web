#https://de.wikipedia.org/wiki/Lindenmayer-System
#https://de.wikipedia.org/wiki/Fraktal
#http://paulbourke.net/fractals/lsys/

#!/usr/bin/env python

import turtle
from canvasvg import canvasvg   #use "pip install canvasvg" or "python -m pip install canvasvg"

def saveImg(name):
    nameSav = name + ".svg"
    #ts = t.getscreen().getcanvas()
    ts = turtle.getscreen().getcanvas()
    canvasvg.saveall(nameSav, ts)

#saveImg("test")

screen = turtle.Screen()
screen.setup(1200, 800)
myturtle = turtle.Turtle()
myturtle.hideturtle()           # Don't show the turtle
myturtle.speed(0)               # Make the turtle faster
myturtle.pensize(2)

D = 90
L = 10

def translate(current, axiom):
    """
    Translate all the "F" with the axiom for current string
    """
    result = ''
    consts = {'+', '-', '[', ']'}
    for c in current:
        if c in consts:
            result += c
            continue
        if c == 'F':
            result += axiom
    return result

def iterate(axiom, num=0, initator='F'):
    """
    Compute turtle rule string by iterating on an axiom
    """
    # Set initator
    result = initator
    for i in range(num):
        # For ever iteration, translate the rule string
        result = translate(result, axiom)
    return result

def draw(axiom, d=D, l=L, x=0, y=0, show_plug_points=False):
    #d: turn angle
    #l: move distance
    """
    Use turtle to draw the L-System
    """
    stack  = []                 # For tracking turtle positions
    myturtle.penup()
    myturtle.goto(x, y)
    myturtle.setheading(90)
    myturtle.pendown()
    myturtle.color("red")
    for i in range(4):
        myturtle.fd(20)
        myturtle.bk(20)
        myturtle.right(90)
    myturtle.color("black")
    if show_plug_points:
        myturtle.right(180)
        myturtle.fd(10)
        myturtle.showturtle()
        myturtle.stamp()
        myturtle.hideturtle()
        myturtle.bk(10)
        myturtle.right(180)					   
    for i in range(len(axiom)):
        c = axiom[i]
        if c == 'F':
            myturtle.forward(l)
        if c == 'f':
            myturtle.penup()
            myturtle.forward(l)
            myturtle.pendown()
        if c == '+':
            myturtle.right(d)
        if c == '-':
            myturtle.left(d)
        if c == '[':
            stack.append((myturtle.heading(), myturtle.pos()))
        if c == ']':
            heading, position = stack.pop()
            myturtle.penup()
            myturtle.goto(position)
            myturtle.setheading(heading)
            myturtle.pendown()
    if show_plug_points:
        myturtle.fd(10)
        myturtle.stamp()
        myturtle.bk(10)					

#-------------
angle=15
axiom = "F"
rule = "F[-F]+F"
axiom_pos = [-400,-200]
pos_list = [[-400,0],[-300,0],[-200,0],[-100,0],[0,0]]
len_list = [20,20,20,20,20]

draw(rule,angle,30,axiom_pos[0],axiom_pos[1],True)

i = 0
#---
result = iterate(rule, 0, axiom)
draw(result,angle,30,pos_list[i][0],pos_list[i][1])
i = i + 1

saveImg("axiom")
screen.onkey(screen.bye, 'q')
screen.listen()
turtle.mainloop()











    
