# Four Access Modifiers in Java

## 📖 Overview

Java provides four types of access modifiers that determine the visibility of classes, methods, and variables. Understanding these modifiers is essential for applying the principles of **encapsulation**, **modularity**, and **security** in Java applications.

## 🎯 Learning Objectives

After reading this documentation, you will be able to:

- Identify the four access modifiers in Java
- Understand how each modifier affects the visibility of class members
- Apply appropriate access modifiers to control access
- Avoid common visibility-related bugs

## ⚡ Prerequisites

- Basic understanding of object-oriented programming concepts
- Java Development Kit (JDK) installed
- Familiarity with Java syntax and class structure

## 🔑 Key Concepts

### 1. `public`

Accessible from anywhere: same class, package, or other packages.

```java
public class DemoPublic {
    public void show() {
        System.out.println("Public method");
    }
}
```

### 2. `protected`

Accessible within the same package and subclasses in different packages.

```java
class DemoProtected {
    protected void display() {
        System.out.println("Protected method");
    }
}
```

### 3. `default` (no modifier)

Accessible only within the same package.

```java
class DemoDefault {
    void print() {
        System.out.println("Default access method");
    }
}
```

### 4. `private`

Accessible only within the same class.

```java
class DemoPrivate {
    private void secret() {
        System.out.println("Private method");
    }
}
```

## 💻 Code Examples

### Basic Example

// Title: Demonstration of all access modifiers // Description: Shows how visibility works with each modifier

```java
public class BasicExample {
    public int publicVar = 1;
    protected int protectedVar = 2;
    int defaultVar = 3;
    private int privateVar = 4;

    public static void main(String[] args) {
        BasicExample ex = new BasicExample();
        System.out.println("Public: " + ex.publicVar);
        System.out.println("Protected: " + ex.protectedVar);
        System.out.println("Default: " + ex.defaultVar);
        System.out.println("Private: " + ex.privateVar);
    }
}
```

### Intermediate Example

// Title: Inheritance and access // Description: Shows how `protected` and `public` are accessible in subclasses

```java
class Parent {
    protected void greet() {
        System.out.println("Hello from Parent");
    }
}

public class Child extends Parent {
    public static void main(String[] args) {
        Child c = new Child();
        c.greet();
    }
}
```

### Advanced Example

// Title: Encapsulation with private fields // Description: Best practice for data hiding and controlled access

```java
public class BankAccount {
    private double balance = 1000.0;

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}
```

## ✅ Best Practices

### Use `private` for data hiding

- Prevent external modification
- Encourage encapsulation

### Use `protected` for inheritance

- Allows controlled access in subclass hierarchy

### Avoid unnecessary `public`

- Overexposing class internals may cause security and maintenance issues

## ❌ Common Pitfalls

### Overusing `public`

```java
// Wrong way
public int data;

// Correct way
private int data;
public int getData() { return data; }
```

Why this matters: Protects the internal state from accidental modification.

### Ignoring default access

Default can expose sensitive methods unintentionally in large projects.

### Misusing `protected`

Using it without proper inheritance structure may cause confusion.

## 🔧 Hands-On Exercise

**Exercise**: Create a class with all four access modifiers **Objective**: Understand access visibility firsthand

### Requirements:

- One method for each access modifier
- Attempt to access them from different classes
- Observe compile-time errors if any

**Starter Code:**

```java
public class ModifierExercise {
    public void methodPublic() {}
    protected void methodProtected() {}
    void methodDefault() {}
    private void methodPrivate() {}
}
```

### Solution Hints:

- Try accessing all methods from another class in the same package
- Create a subclass in a different package
- Check which methods are accessible

### Expected Output:

Depending on access, some methods will run, others will give errors.

## 🚀 Real-World Applications

### Use Case 1: API Design

Using `public` selectively to expose only necessary methods

### Use Case 2: Framework Development

Using `protected` to allow subclass customization

## 🔗 Integration with Other Topics

- **Related to** Encapsulation: Controls what is exposed
- **Prerequisites for** Inheritance: Access modifiers govern subclass behavior
- **Combines with** OOP Principles: Works with abstraction and polymorphism

## 📚 Further Reading

- [Java Access Control - Oracle Docs](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html) - Official explanation
- [Baeldung: Java Access Modifiers](https://www.baeldung.com/java-access-modifiers) - Tutorial with real examples
- [GeeksforGeeks - Access Modifiers](https://www.geeksforgeeks.org/access-modifiers-java/) - Beginner-friendly guide

## 💡 Tips for Success

- Use `private` by default, increase access only when necessary
- Understand package and class visibility rules
- Practice with examples to reinforce understanding

## 🔍 Troubleshooting

### Common Error: `X has private access in Y`

**Cause**: Trying to access a private member from another class **Solution**: Use a public getter or move access logic inside the class

```java
// Fix
public int getBalance() {
    return this.balance;
}
```

### Common Error: `Cannot be accessed from outside package`

**Cause**: Default access modifier **Solution**: Change to `public` or place classes in the same package
🏷️ Tags
#java #AccessModifier #javabasics #oops

Author: Purva Ughade
Reviewed By: Java Curriculum Team
Difficulty Level: Beginner
Estimated Reading Time: 6–8 minutes
