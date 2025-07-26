
# Exception Handling

## 📖 Overview  
Exception Handling in Java is a powerful mechanism to handle runtime errors, ensuring the normal flow of the program. It helps identify, catch, and handle errors gracefully without crashing the application, which is crucial for building robust software systems.

---

## 🎯 Learning Objectives  
After reading this documentation, you will be able to:

- Understand the concept of exceptions and the Java Exception hierarchy  
- Use `try`, `catch`, `finally`, `throw`, and `throws` in Java  
- Create custom exceptions for specific scenarios  
- Apply best practices to write error-resilient Java code

---

## ⚡ Prerequisites

- Understanding of basic programming constructs (if-else, loops, methods)  
- Required Software/Tools: JDK (Java Development Kit), any Java IDE (Eclipse/IntelliJ/VSCode)  
- Assumed Knowledge Level: Basic Java programming knowledge

---

## 🔑 Key Concepts

### 1. Exception Hierarchy  
Java exceptions are divided into two main categories: **checked** and **unchecked** exceptions. Checked exceptions are verified at compile time, while unchecked ones occur at runtime.

```java
public class ExceptionHierarchyExample {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // This throws ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("Caught an exception: " + e.getMessage());
        }
    }
}
```

### 2. try-catch-finally  
The `try` block contains code that may throw an exception, `catch` handles it, and `finally` executes code regardless of exception occurrence.

```java
public class TryCatchFinally {
    public static void main(String[] args) {
        try {
            String text = null;
            System.out.println(text.length()); // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Exception: " + e);
        } finally {
            System.out.println("Finally block always runs.");
        }
    }
}
```

### 3. Custom Exceptions  
You can define your own exceptions by extending the `Exception` class to handle application-specific scenarios.

```java
class AgeException extends Exception {
    public AgeException(String message) {
        super(message);
    }
}
```

---

## 💻 Code Examples

### Basic Example  
**Title:** Handling Division by Zero  
**Description:** Demonstrates how to catch an `ArithmeticException`

```java
public class BasicExample {
    public static void main(String[] args) {
        // Step 1: Try to divide by zero
        try {
            int x = 5 / 0;
        } 
        // Step 2: Catch the exception
        catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");
        }

        // Step 3: Program continues
        System.out.println("Program continues after exception.");
    }
}
```

**Expected output:**
```
Cannot divide by zero!  
Program continues after exception.
```

### Intermediate Example  
**Title:** Multiple Catch Blocks  
**Description:** Handles different exception types separately

```java
public class IntermediateExample {
    public static void main(String[] args) {
        try {
            int[] arr = new int[3];
            System.out.println(arr[5]);
        } catch (ArithmeticException e) {
            System.out.println("Arithmetic error.");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index error.");
        } finally {
            System.out.println("Cleaning up...");
        }
    }
}
```

### Advanced Example  
**Title:** Creating and Using Custom Exception  
**Description:** Validates age and throws a custom exception

```java
class InvalidAgeException extends Exception {
    InvalidAgeException(String msg) {
        super(msg);
    }
}

public class AdvancedExample {
    static void validateAge(int age) throws InvalidAgeException {
        if (age < 18) throw new InvalidAgeException("You must be 18 or older.");
    }

    public static void main(String[] args) {
        try {
            validateAge(16);
        } catch (InvalidAgeException e) {
            System.out.println("Custom Exception: " + e.getMessage());
        }
    }
}
```

---

## ✅ Best Practices

### Use Specific Exceptions  
**Recommendation:** Use specific exception types (`IOException`, `NullPointerException`) rather than a generic `Exception`  
**Why important:** Helps with debugging and better error classification

### Always Close Resources  
Use `finally` or try-with-resources to close files, connections, etc.

```java
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    // file operations
} catch (IOException e) {
    e.printStackTrace();
}
```

### Avoid Silent Catch Blocks  
Always log or handle the exception meaningfully.

---

## ❌ Common Pitfalls

### Catching Generic Exception

```java
// Wrong way
catch (Exception e) {
    // do nothing
}

// Correct way
catch (IOException e) {
    System.out.println("File error: " + e.getMessage());
}
```

**Why this matters:** Generic catches hide actual errors and complicate debugging.

### Forgetting finally block cleanup  
**Problem:** Missing resource cleanup can lead to memory leaks.

### Throwing unchecked exceptions unnecessarily  
**Use checked exceptions** for predictable errors like file not found, input validation, etc.

---

## 🔧 Hands-On Exercise

**Exercise:** Age Validation Exception  
**Objective:** Create a program that throws a custom exception if age < 18  

### Requirements:
- Create a class `UnderAgeException`  
- Validate user age  
- Throw and handle the exception  

### Starter Code:

```java
// TODO: Complete the following class
class UnderAgeException extends Exception {
    UnderAgeException(String msg) {
        super(msg);
    }
}

public class ExerciseClass {
    public static void main(String[] args) {
        int age = 16;
        try {
            // TODO: Throw custom exception if age < 18
        } catch (UnderAgeException e) {
            // TODO: Handle exception and display message
        }
    }
}
```

### Solution Hints:

- Use `if (age < 18)`  
- Use `throw new UnderAgeException(...)`  
- Catch with a meaningful message  

### Expected Output:

```
You are under age!
```

---

## 🚀 Real-World Applications

### Use Case 1: Web Form Validation  
Exception handling is used to validate and handle incorrect user input (e.g., blank name, invalid email).

### Use Case 2: File Upload Systems  
Handles file-related errors such as file not found, read/write failure, or unsupported file type.

---

## 🔗 Integration with Other Topics

- **Related to File Handling:** Exceptions help manage file read/write errors  
- **Prerequisite for JDBC:** Exception handling is essential when connecting to databases  
- **Combines with Multithreading:** For thread synchronization and interruption handling

---

## 📚 Further Reading

- [Oracle Java Docs - Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/)  
- [GeeksforGeeks Java Exceptions](https://www.geeksforgeeks.org/exceptions-in-java/)  
- [Baeldung - Exception Handling in Java](https://www.baeldung.com/java-exceptions)  
- [Java Point Tutorial](https://www.javatpoint.com/exception-handling-in-java)  
- [Core Java Book - Chapter on Exceptions]

---

## 💡 Tips for Success

- Always read exception stack traces to understand issues  
- Use custom exceptions for application-specific rules  
- Keep exception handling blocks concise and focused  

---

## 🔍 Troubleshooting

### Common Error: `Exception in thread "main" java.lang.ArithmeticException: / by zero`  
**Cause:** Division by zero  
**Solution:** Check the divisor before performing division

```java
if (b != 0) {
    int c = a / b;
}
```

### Common Error: `NullPointerException`  
**Cause:** Using a null reference  
**Solution:** Always check if the object is null before using it

---

## 🏷️ Tags  
#java #exception-handling #error-handling #trycatch #customexceptions

**Author:** Utkarsha Ingale  
**Last Updated:** July 26, 2025  
**Reviewed By:** [Reviewer Names]  
**Difficulty Level:** Beginner to Intermediate  
**Estimated Reading Time:** 12 minutes  
