# Abstract Class vs Interface in Java

## 📖 Overview

This documentation explains the concepts of **abstract classes** and **interfaces** in Java. Both are used to achieve abstraction, but they differ in implementation, flexibility, and purpose. Understanding the differences is essential for designing robust and scalable Java applications.

## 🎯 Learning Objectives

After reading this documentation, you will be able to:

- Understand what an abstract class is in Java
- Understand what an interface is in Java
- Distinguish between abstract classes and interfaces
- Apply abstract classes and interfaces appropriately in Java programs

## ⚡ Prerequisites

- Basic knowledge of Java syntax and class structure
- Java Development Kit (JDK) installed
- Familiarity with object-oriented programming (OOP) concepts

## 🔑 Key Concepts

### Abstract Class

An abstract class in Java is a class that cannot be instantiated and may contain abstract methods (methods without a body) as well as concrete methods.

```java
abstract class Animal {
    abstract void sound(); // abstract method

    void eat() {
        System.out.println("This animal eats food."); // concrete method
    }
}
```

### Interface

An interface in Java is a contract that classes can implement. All methods are implicitly abstract (until Java 8+ where default/static methods are allowed).

```java
interface Flyable {
    void fly(); // abstract method
}
```

### Differences Between Abstract Class and Interface

| Feature          | Abstract Class                              | Interface                                                             |
| ---------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| Inheritance      | Can extend only one class                   | Can implement multiple interfaces                                     |
| Methods          | Can have both abstract and concrete methods | Only abstract methods (Java 7), abstract + default + static (Java 8+) |
| Constructors     | Can have constructors                       | Cannot have constructors                                              |
| Access Modifiers | Can have any access modifier                | Methods are `public` by default                                       |
| Fields           | Can have instance variables                 | Only constants (public static final)                                  |

## 💻 Code Examples

### Basic Example

```java
// Title: Abstract Class Example
// Description: Demonstrates use of abstract class and concrete method

abstract class Vehicle {
    abstract void start();

    void fuel() {
        System.out.println("Filling fuel...");
    }
}

class Car extends Vehicle {
    void start() {
        System.out.println("Car started.");
    }

    public static void main(String[] args) {
        Car c = new Car();
        c.start();
        c.fuel();
    }
}
```

### Intermediate Example

```java
// Title: Interface Implementation Example
// Description: Demonstrates how to implement an interface

interface Printable {
    void print();
}

class Document implements Printable {
    public void print() {
        System.out.println("Printing Document...");
    }

    public static void main(String[] args) {
        Document doc = new Document();
        doc.print();
    }
}
```

### Advanced Example

```java
// Title: Multiple Interface and Abstract Class Example
// Description: Demonstrates use of abstract class and multiple interfaces

interface Scanner {
    void scan();
}

interface Fax {
    void fax();
}

abstract class Machine {
    abstract void powerOn();

    void powerOff() {
        System.out.println("Machine powered off.");
    }
}

class MultiFunctionPrinter extends Machine implements Scanner, Fax {
    void powerOn() {
        System.out.println("Machine powered on.");
    }

    public void scan() {
        System.out.println("Scanning document...");
    }

    public void fax() {
        System.out.println("Sending fax...");
    }

    public static void main(String[] args) {
        MultiFunctionPrinter mfp = new MultiFunctionPrinter();
        mfp.powerOn();
        mfp.scan();
        mfp.fax();
        mfp.powerOff();
    }
}
```

## ✅ Best Practices

1. **Use Abstract Class for Shared Behavior**

   - When multiple classes share common behavior or fields
   - Helps in code reusability

2. **Use Interface for Polymorphism**

   - Promotes flexibility and decoupling
   - Allows implementing multiple behaviors

3. **Prefer Interfaces for Constants**
   - Define constants in interfaces when used by multiple classes

## ❌ Common Pitfalls

1. **Trying to Instantiate Abstract Class**

```java
// Wrong way
Animal a = new Animal(); // Error
```

```java
// Correct way
Animal a = new Dog(); // Dog is subclass of Animal
```

**Why this matters**: Abstract classes cannot be instantiated directly.

2. **Not Implementing All Interface Methods**

   - Causes compilation error unless the class is also abstract

3. **Using Abstract Class Instead of Interface for Multiple Behavior**
   - Abstract class does not support multiple inheritance

## 🔧 Hands-On Exercise

### Exercise: Shape Abstraction

**Objective**: Create a system to calculate the area of different shapes.

**Requirements**:

- Use an abstract class `Shape`
- Include abstract method `area()`
- Create subclasses `Circle` and `Rectangle`

**Starter Code**:

```java
abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    double area() {
        // TODO: Complete formula for area
    }
}

class Rectangle extends Shape {
    double length, width;

    Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    double area() {
        // TODO: Complete formula for area
    }
}
```

**Solution Hints**:

- Use `Math.PI * radius * radius` for circle
- Use `length * width` for rectangle

**Expected Output**:

```
Area of Circle: 78.54
Area of Rectangle: 20.00
```

## 🚀 Real-World Applications

### Use Case 1: Payment Gateway

Use interfaces to define `PaymentMethod` that can be implemented by `CreditCard`, `UPI`, `Wallet`, etc.

### Use Case 2: GUI Frameworks

Abstract classes like `Component` serve as base for all UI elements (`Button`, `TextBox`, etc.)

## 🔗 Integration with Other Topics

- **Related to OOP Abstraction**: Provides tools to hide implementation
- **Prerequisite for Design Patterns**: Many patterns use interfaces and abstract classes
- **Combines with Polymorphism**: Enables dynamic method dispatch

## 📚 Further Reading

- [Oracle Java Docs - Abstract Classes](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html)
- [Oracle Java Docs - Interfaces](https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html)
- [GeeksForGeeks Guide](https://www.geeksforgeeks.org/difference-between-abstract-class-and-interface-in-java/)
- [Baeldung: Abstract vs Interface](https://www.baeldung.com/java-abstract-class-vs-interface)

## 💡 Tips for Success

- Use abstract classes for is-a relationships with shared code
- Use interfaces to represent capabilities (e.g., `Runnable`, `Serializable`)
- Java 8+ interfaces can now have default methods — use wisely

## 🔍 Troubleshooting

### Common Error: "Cannot instantiate the type"

**Cause**: Trying to create an object of an abstract class

**Solution**: Use a subclass to create the object

```java
// Fix
Animal a = new Dog(); // Dog extends Animal
```

### Common Error: "Class must implement inherited abstract method"

**Cause**: Forgot to implement all interface methods

**Solution**: Implement the missing methods or make the class abstract

## 🏷️ Tags

#java #oop #abstraction #interface #abstractclass #javabasics

---

**Author**: Sudhanshu Sakhare 
**Last Updated**: 2025-07-16  
**Reviewed By**: T.Varnan Sir 
**Difficulty Level**: Beginner  
**Estimated Reading Time**: 8 minutes
