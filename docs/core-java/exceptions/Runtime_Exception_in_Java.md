
# ⚠️ Runtime Exception in Java

## 📖 Overview

Runtime exceptions in Java are exceptions that occur **during program execution** (i.e., at runtime) and are not checked by the compiler. These exceptions typically represent programming bugs, such as logic errors or improper use of an API. They are a subset of unchecked exceptions and extend the RuntimeException class.

## 🎯 Learning Objectives

After reading this documentation, you will be able to:

- Understand what a runtime exception is and how it differs from checked exceptions.
- Identify common types of runtime exceptions.
- Use best practices to avoid runtime exceptions.
- Implement error handling to manage runtime exceptions.

## ⚡ Prerequisites

- Understanding of basic Java programming
- Familiarity with Java class hierarchy and exception handling
- Java JDK and IDE (like IntelliJ IDEA, Eclipse)

## 🔑 Key Concepts

### What is a Runtime Exception?

A runtime exception is an **unchecked exception** that occurs during the execution of a program. These exceptions are **not checked** at compile time, meaning the compiler does not require them to be caught or declared.

```java
public class RuntimeExample {
    public static void main(String[] args) {
        int a = 10 / 0; // Causes ArithmeticException
    }
}
```

### Common Types of Runtime Exceptions

- `NullPointerException`
- `ArrayIndexOutOfBoundsException`
- `ClassCastException`
- `ArithmeticException`
- `IllegalArgumentException`

### Unchecked vs Checked Exceptions

Unchecked exceptions (including runtime exceptions) do **not require** explicit handling, whereas checked exceptions do.

## 💻 Code Examples

### Basic Example

```java
// Title: ArithmeticException Example
// Description: Demonstrates a division by zero error

public class BasicExample {
    public static void main(String[] args) {
        // Step 1: Declare variables
        int a = 10;
        int b = 0;

        // Step 2: Perform division
        int c = a / b; // This will throw ArithmeticException

        // Output
        System.out.println("Result: " + c);
    }
}
```

### Intermediate Example

```java
// Title: NullPointerException Handling
// Description: Checks for null before accessing object

public class IntermediateExample {
    public static void main(String[] args) {
        String str = null;

        try {
            System.out.println(str.length()); // Causes NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Caught a NullPointerException!");
        }
    }
}
```

### Advanced Example

```java
// Title: Custom Error Logging for Runtime Exceptions
// Description: Handling multiple runtime exceptions with logging

public class AdvancedExample {
    public static void main(String[] args) {
        try {
            int[] arr = new int[3];
            arr[5] = 10; // ArrayIndexOutOfBoundsException
        } catch (RuntimeException e) {
            System.err.println("Runtime exception occurred: " + e.getClass().getSimpleName());
            e.printStackTrace();
        }
    }
}
```

## ✅ Best Practices

1. **Validate Inputs**

   - Check for null or invalid arguments before using them.
   - Prevents `NullPointerException`, `IllegalArgumentException`.

2. **Use Defensive Programming**

   - Validate array indexes, check object states.
   - Helps avoid `ArrayIndexOutOfBoundsException`, `IllegalStateException`.

3. **Handle Runtime Exceptions Gracefully**

   - Catch exceptions where recovery is possible.
   - Avoid crashing the entire program unnecessarily.

## ❌ Common Pitfalls

1. **Ignoring Null Checks**

   ```java
   String data = null;
   System.out.println(data.length()); // Causes NullPointerException
   ```

   **Fix**:

   ```java
   if (data != null) {
       System.out.println(data.length());
   }
   ```

2. **Wrong Array Index Access**

   ```java
   int[] arr = new int[2];
   arr[3] = 10; // ArrayIndexOutOfBoundsException
   ```

3. **Improper Type Casting**

   ```java
   Object obj = "Test";
   Integer num = (Integer) obj; // ClassCastException
   ```

## 🔧 Hands-On Exercise

### Exercise: Handle Array Index Error

**Objective**: Practice handling runtime exceptions caused by invalid array index.

**Requirements**:

- Declare an array with 3 elements.
- Access index 5 and handle the exception.

**Starter Code**:

```java
public class ExerciseClass {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3};

        // TODO: Handle index out of bounds error
        System.out.println(numbers[5]);
    }
}
```

**Solution Hints**:

- Use try-catch block
- Catch `ArrayIndexOutOfBoundsException`

**Expected Output**:

```
Caught ArrayIndexOutOfBoundsException
```

## 🚀 Real-World Applications

### Use Case 1: Input Validation in Web Forms

Validating user input prevents `IllegalArgumentException` or `NullPointerException`.

### Use Case 2: APIs and Microservices

Proper error handling ensures resilience when APIs fail unexpectedly.

## 🔗 Integration with Other Topics

- **Related to Exception Hierarchy**: All runtime exceptions extend `RuntimeException`.
- **Prerequisite for Defensive Coding**: Helps build safer programs.
- **Used with Logging and Monitoring**: Helps in tracing and debugging production bugs.

## 📚 Further Reading

- [Oracle Docs: RuntimeException](https://docs.oracle.com/javase/8/docs/api/java/lang/RuntimeException.html)
- [GeeksforGeeks: Runtime Exceptions](https://www.geeksforgeeks.org/runtime-exception-in-java/)
- [Baeldung: Exception Handling](https://www.baeldung.com/java-exceptions)

## 💡 Tips for Success

- Always validate user inputs.
- Use `Optional` to handle nulls gracefully.
- Prefer specific exception types over generic `RuntimeException`.

## 🔍 Troubleshooting

### Common Error: `NullPointerException`

**Cause**: Accessing methods on a null object reference  
**Solution**: Add null checks or use `Optional`.

### Common Error: `ArrayIndexOutOfBoundsException`

**Cause**: Accessing an invalid index in an array  
**Solution**: Check array length before accessing.

## 🏷️ Tags

#java #runtime-exception #unchecked-exception #error-handling #java-core

---

**Author**: Fulanshu Kuthe  
**Last Updated**: July 26, 2025  
**Reviewed By**: T.Varnan sir 
**Difficulty Level**: Beginner  
**Estimated Reading Time**: 10 minutes
