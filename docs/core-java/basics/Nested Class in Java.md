# Nested Class in Java

## 📖 Overview

Nested classes in Java are classes defined within another class. They help logically group classes that are only used in one place, improve encapsulation, and can access members of the outer class. Nested classes make the code more readable and maintainable in object-oriented programming.

## 🎯 Learning Objectives

After reading this documentation, you will be able to:

- Understand the types of nested classes in Java
- Create and use static and non-static nested classes
- Understand how nested classes can access members of the outer class
- Apply nested classes in real-world applications and design patterns



## ⚡ Prerequisites

- Basic Java programming knowledge
- JDK installed and configured
- Understanding of Java classes and objects
- IDE or text editor (e.g., Eclipse, IntelliJ, or Notepad)


## 🔑 Key Concept
### 1. Types of Nested Classes

Java supports four types of nested classes:

1) Static nested class

2) Non-static (Inner) class

3) Local inner class

4) Anonymous inner class

```java
public class Outer {
    static class StaticNested {
        void display() {
            System.out.println("Static nested class");
        }
    }

    class Inner {
        void display() {
            System.out.println("Inner (non-static) class");
        }
    }
}

```

### 2. Accessing Outer Class Members
Non-static inner classes can access all members (even private) of the outer class.
Static nested classes can only access static members of the outer class.



## 💻 Code Examples

### Basic Example

Title: Creating and accessing a static nested class

Description: Demonstrates a static nested class

```java
public class Outer {
    static class StaticNested {
        void show() {
            System.out.println("Hello from static nested class");
        }
    }

    public static void main(String[] args) {
        Outer.StaticNested sn = new Outer.StaticNested();
        sn.show();  // Expected output: Hello from static nested class
    }
}

```

### Intermediate Example

Title: Non-static inner class accessing outer class field

Description: Demonstrates use of a non-static inner class accessing outer class members

```java
public class Outer {
    private String message = "Hello from Outer";

    class Inner {
        void display() {
            System.out.println(message);
        }
    }

    public static void main(String[] args) {
        Outer outer = new Outer();
        Outer.Inner inner = outer.new Inner();
        inner.display(); // Expected output: Hello from Outer
    }
}

```

### Advanced Example

Title: Anonymous inner class for event handling

Description: Real-world use of anonymous inner class with Runnable

```java
public class Demo {
    public static void main(String[] args) {
        Thread t = new Thread(new Runnable() {
            public void run() {
                System.out.println("Running inside anonymous inner class");
            }
        });
        t.start();
    }
}

```

## ✅ Best Practices

1. Use Inner Classes for Logical Grouping

   - Use nested classes only when they logically belong to the outer class.

   - Why: Enhances cohesion and encapsulation.
   

2. Avoid Excessive Nesting
  
   - Too many nested classes make the code harder to understand.

    - Why: Reduces readability and maintainability.

4. Use Static Nested Classes When No Outer Instance is Needed

     - If the nested class doesn’t need access to instance members of the outer class, make it static.

     - Why: Saves memory and clarifies purpose.
## ❌ Common Pitfalls

1. Using Non-static Inner Class Without Outer Object

  ```java
  // Wrong way
  Animal a = new Animal(); // Error
   ```

   ```java
  // Correct way
     Outer outer = new Outer();
     Outer.Inner obj = outer.new Inner();
   ```

   **Why this matters**: Non-static inner classes need an outer class instance.

## 🔧 Hands-On Exercise

### Exercise:  Build a Company-Department Relationship using Nested Class

**Objective**: Use a non-static inner class to represent a department within a company.
**Requirements**:

- Define a Company class with a name

- Create an inner class Department with a method to display both company and department names

- Use the inner class in the main method

**Starter Code**:

```java
public class Company {
    String companyName = "TechCorp";

    // TODO: Complete the inner class
    class Department {
        String deptName = "Engineering";
        void display() {
            // Print both names
        }
    }

    public static void main(String[] args) {
        // TODO: Instantiate and call the display method
    }
}

```

**Solution Hints**:

- Access outer class member using companyName directly

- Use outer.new Inner() syntax

**Expected Output**:

```
Company: TechCorp  
Department: Engineering  

```

## 🚀 Real-World Applications

### Use Case 1:  GUI Development

Java Swing uses nested classes heavily in event handling and UI components.

### Use Case 2:  Threading

Anonymous inner classes are widely used to define short-lived threads or event handlers.

## 🔗 Integration with Other Topics

- **Related to Encapsulation**: Nested classes help restrict visibility
- **Prerequisites for  Java GUI Development**: Required in Swing event handling
- **Combines with  Inheritance and Interfaces**: Nested classes can implement interfaces or extend other classes

## 📚 Further Reading

- Official Java Docs on Nested Classes
- Java Point Tutorial - Nested Classes
- GeeksForGeeks  - Java Nested Classes
- Oracle Java Tutorials
- [Book: Effective Java by Joshua Bloch - Item on Inner Classes]

## 💡 Tips for Success

- Practice writing nested classes with different access modifiers
- Focus on when to use static vs non-static inner classes
- Keep inner classes small and focused



## 🔍 Troubleshooting

### Common Error: Cannot create a static reference to the non-static inner class

**Cause**: Trying to create inner class object without outer class instance
**Solution**: Use Outer outer = new Outer(); Outer.Inner inner = outer.new Inner();


### Common Error: Local variable referenced from inner class must be final or effectively final
**Cause**: Using a mutable local variable inside a local/anonymous class
**Solution**: Declare variable as final or do not modify it after assignment

## 🏷️ Tags

#java #nestedclasses #oop #innerclass #staticclass #intermediatejava

---

**Author**: Vaibhavi Santoshrao Ghom

**Last Updated**: July 27, 2025

**Reviewed By**: T.Varnan Sir 

**Difficulty Level**: Beginner

**Estimated Reading Time**: 10–12 minutes
