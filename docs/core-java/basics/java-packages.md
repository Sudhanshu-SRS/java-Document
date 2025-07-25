
# Packages in Java

## 📖 Overview

Packages in Java are used to group related classes, avoid name conflicts, and organize code logically. They enhance modularity and code maintenance in Java applications.

## 🎯 Learning Objectives

After reading this, you will be able to:

- Understand the role and purpose of Java packages
- Create and use custom packages
- Use built-in Java packages
- Follow package structure and compilation rules

## ⚡ Prerequisites

- Basic Java programming knowledge
- JDK installed
- Familiarity with classes and methods

## 🔑 Key Concepts

### What Is a Package?

Packages group related classes. Declared at the top of a file:

```java
package mypack;

public class MyClass {
    public void greet() {
        System.out.println("Hello from MyClass!");
    }
}
```

### Built-in Packages

Examples:  
- `java.lang` (auto-imported)  
- `java.util`, `java.io`, `java.sql`

### User-defined Packages

Create with `package` keyword and place in matching folder:

```java
package tools;

public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}
```

Use via `import tools.Calculator;`

## 💻 Code Examples

### Basic Example

```java
// Title: Simple Package Usage
// Description: Define and use a package

// File: mypack/Hello.java
package mypack;
public class Hello {
    public void sayHi() {
        System.out.println("Hi!");
    }
}

// File: Main.java
import mypack.Hello;
public class Main {
    public static void main(String[] args) {
        new Hello().sayHi();
    }
}
```

### Intermediate Example

```java
// Title: Multiple Classes in One Package

// File: geometry/Rectangle.java
package geometry;
public class Rectangle {
    public double area(double l, double b) {
        return l * b;
    }
}

// File: Main.java
import geometry.Rectangle;
public class Main {
    public static void main(String[] args) {
        System.out.println(new Rectangle().area(5, 10));
    }
}
```

## ✅ Best Practices

1. **Use lowercase package names** – Prevents naming conflicts.
2. **Follow folder structure** – Match folders to `package` names.
3. **Use reverse domain naming** – For uniqueness in large projects (`com.example.utils`).

## ❌ Common Pitfalls

1. **Mismatch in directory and package name**

```java
// Wrong: package mypack; but file not in mypack folder
```

2. **Not using `javac -d .`**  
Use `javac -d . FileName.java` to compile with proper structure.

## 🔧 Hands-On Exercise

### Exercise: Basic Calculator Package

**Objective**: Create and use a `mathutils.Calculator` class.

**Starter Code**:

```java
// File: mathutils/Calculator.java
package mathutils;
public class Calculator {
    public int add(int a, int b) { return a + b; }
}
```

```java
// File: Main.java
import mathutils.Calculator;
public class Main {
    public static void main(String[] args) {
        Calculator c = new Calculator();
        System.out.println("Sum: " + c.add(5, 10));
    }
}
```

**Expected Output**:
```
Sum: 15
```

## 🚀 Real-World Applications

- **Large Projects**: Modularize by feature (e.g., `auth`, `billing`)
- **APIs/Libraries**: Organize reusable components

## 🔗 Integration with Other Topics

- **Access Modifiers**: Affect visibility in packages
- **Modules (Java 9+)**: Built on top of packages

## 📚 Further Reading

- [Java Packages – Oracle](https://docs.oracle.com/javase/tutorial/java/package/index.html)
- [GeeksForGeeks](https://www.geeksforgeeks.org/packages-in-java/)
- [Baeldung](https://www.baeldung.com/java-packages)

## 💡 Tips for Success

- Always match directory with `package` name
- Use explicit imports for clarity
- Structure your code early in the project

## 🔍 Troubleshooting

### Common Error: `package does not exist`

**Cause**: Wrong import or missing compiled `.class` files  
**Solution**: Recompile with `javac -d . File.java`

```java
// Fix:
import mypack.Hello;
```

## 🏷️ Tags

#java #packages #modularity #javabasics #oop

---

**Author**: Mansi 
**Last Updated**: 2025-07-25  
**Reviewed By**: Java Curriculum Team  
**Difficulty Level**: Beginner  
**Estimated Reading Time**: 5–7 minutes
