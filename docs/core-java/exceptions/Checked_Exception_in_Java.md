
# ✅ Checked Exception in Java

## 📖 Overview

Checked exceptions in Java are exceptions that are checked at **compile-time**. These exceptions must be either **caught** using a `try-catch` block or declared using the `throws` keyword. They represent errors that are **outside the programmer’s control** but that a program should be prepared to handle—like file handling or database access errors.

## 🎯 Learning Objectives

After reading this documentation, you will be able to:

- Understand what a checked exception is in Java.
- Differentiate between checked and unchecked exceptions.
- Use `try-catch` blocks or `throws` to handle checked exceptions.
- Create and throw your own custom checked exceptions.

## ⚡ Prerequisites

- Basic understanding of Java syntax and structure
- Familiarity with classes, methods, and inheritance in Java
- Java installed (JDK 8 or later) and an IDE like IntelliJ or Eclipse

## 🔑 Key Concepts

### What is a Checked Exception?

Checked exceptions are exceptions that **extend `Exception` class (but not `RuntimeException`)** and are checked at **compile-time**. The compiler ensures that the programmer handles these exceptions explicitly.

```java
// Example of a checked exception: FileNotFoundException
import java.io.*;

public class CheckedExample {
    public static void main(String[] args) {
        try {
            FileReader fr = new FileReader("nonexistentfile.txt");
        } catch (FileNotFoundException e) {
            System.out.println("File not found! Please check the filename.");
        }
    }
}
```

### Why Handle Checked Exceptions?

Checked exceptions force the programmer to **anticipate and handle potential errors**, making the code more robust and less likely to crash unexpectedly in real-world environments (e.g., file operations, database access).

### Declaring Exceptions with `throws`

If a method might throw a checked exception, it must declare it using the `throws` keyword.

```java
public void readFile(String fileName) throws IOException {
    FileReader reader = new FileReader(fileName);
}
```

## 💻 Code Examples

### Basic Example

```java
// Title: File Handling with Checked Exception
// Description: Shows how to handle a FileNotFoundException using try-catch

import java.io.*;

public class BasicExample {
    public static void main(String[] args) {
        // Step 1: Try to open a file
        try {
            FileReader fr = new FileReader("example.txt");

            // Step 2: Read from file (not shown fully for simplicity)

            fr.close();
        } catch (FileNotFoundException e) {
            // Step 3: Handle the exception
            System.out.println("The file does not exist.");
        } catch (IOException e) {
            System.out.println("Error while closing the file.");
        }

        // Output explanation
        System.out.println("Expected output: If file not found, prints an error.");
    }
}
```

### Intermediate Example

```java
// Title: Propagating Checked Exception
// Description: Shows how to declare exceptions using throws

import java.io.*;

public class IntermediateExample {
    public static void readFile(String filename) throws IOException {
        FileReader reader = new FileReader(filename);
        reader.close();
    }

    public static void main(String[] args) {
        try {
            readFile("test.txt");
        } catch (IOException e) {
            System.out.println("Handled in main: " + e.getMessage());
        }
    }
}
```

### Advanced Example

```java
// Title: Custom Checked Exception
// Description: Demonstrates how to create and throw a custom checked exception

class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class AdvancedExample {
    public static void validateAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Age must be 18 or older.");
        }
    }

    public static void main(String[] args) {
        try {
            validateAge(16);
        } catch (InvalidAgeException e) {
            System.out.println("Caught custom exception: " + e.getMessage());
        }
    }
}
```

## ✅ Best Practices

1. **Always Handle Checked Exceptions**

   - Catch the exception or declare it with `throws`.
   - Ensures the program does not crash unexpectedly.

2. **Use Specific Exceptions**

   - Catch specific exception types instead of a generic `Exception`.
   - Makes the code clearer and avoids hiding other bugs.

3. **Log Exception Details**

   - Use logging frameworks or `e.printStackTrace()` during debugging.
   - Helps in identifying the source of the problem.

## ❌ Common Pitfalls

1. **Catching Exception Instead of Specific Exception**

   ```java
   // Wrong way
   try {
       FileReader fr = new FileReader("test.txt");
   } catch (Exception e) {
       System.out.println("Error occurred");
   }
   ```

   ```java
   // Correct way
   try {
       FileReader fr = new FileReader("test.txt");
   } catch (FileNotFoundException e) {
       System.out.println("File not found.");
   }
   ```

   **Why this matters**: Catching generic exceptions may hide the actual issue.

2. **Not Handling or Declaring Checked Exceptions**

   - Leads to compile-time errors.
   - Java requires explicit handling.

3. **Swallowing Exceptions Without Action**

   - Logging or taking action is important.
   - Empty `catch` blocks are discouraged.

## 🔧 Hands-On Exercise

### Exercise: Create Custom Checked Exception

**Objective**: Practice creating and using a custom checked exception.

**Requirements**:

- Define a custom exception `BankException`.
- Throw the exception if withdrawal amount > balance.
- Catch and display the custom message.

**Starter Code**:

```java
// TODO: Complete the following class
class BankException extends Exception {
    // Constructor
}

public class ExerciseClass {
    public static void withdraw(int amount, int balance) throws BankException {
        // Implement logic here
    }

    public static void main(String[] args) {
        try {
            withdraw(15000, 10000);
        } catch (BankException e) {
            System.out.println("Caught Exception: " + e.getMessage());
        }
    }
}
```

**Solution Hints**:

- Use `super(message)` in constructor.
- Throw exception when condition is met.
- Catch in `main()`.

**Expected Output**:

```
Caught Exception: Insufficient Balance
```

## 🚀 Real-World Applications

### Use Case 1: File I/O Operations

Checked exceptions like `IOException` ensure programs properly handle file not found or read/write errors.

### Use Case 2: Database Access

JDBC methods throw `SQLException`, a checked exception, which must be handled to ensure reliable DB operations.

## 🔗 Integration with Other Topics

- **Related to Exception Hierarchy**: Checked exceptions extend the base `Exception` class.
- **Prerequisite for File Handling**: FileReader, BufferedReader, etc., all involve checked exceptions.
- **Combines with Custom Exception Handling**: Helpful when designing robust APIs.

## 📚 Further Reading

- [Oracle Docs: Checked Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html) – Official explanation
- [GeeksforGeeks: Checked vs Unchecked Exceptions](https://www.geeksforgeeks.org/checked-vs-unchecked-exceptions-in-java/) – Comparison article
- [Baeldung: Custom Exceptions](https://www.baeldung.com/java-new-custom-exception) – Guide to writing your own exceptions

## 💡 Tips for Success

- Don’t ignore exceptions; handle or propagate them properly.
- Catch the **most specific** exception first.
- Use custom checked exceptions for meaningful application logic.

## 🔍 Troubleshooting

### Common Error: `unreported exception java.io.IOException; must be caught or declared to be thrown`

**Cause**: You called a method that throws a checked exception without handling it.

**Solution**: Wrap in `try-catch` or use `throws`.

```java
// Fix
public void myMethod() throws IOException {
    FileReader fr = new FileReader("abc.txt");
}
```

### Common Error: Custom exception not compiling

**Cause**: Missing `extends Exception` or incorrect constructor.

**Solution**: Ensure the class properly extends `Exception`.

```java
class MyException extends Exception {
    public MyException(String msg) {
        super(msg);
    }
}
```

## 🏷️ Tags

#java #exception-handling #checked-exception #java-core #error-handling

---

**Author**: Jayant Meshram
**Last Updated**: July 26, 2025  
**Reviewed By**: Java Experts Team  
**Difficulty Level**: Beginner  
**Estimated Reading Time**: 10 minutes
