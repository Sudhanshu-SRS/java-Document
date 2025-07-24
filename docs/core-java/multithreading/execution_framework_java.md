# Execution Framework in Java

## 📖 Overview

The Execution Framework in Java provides a powerful way to manage and control threads using high-level APIs. Instead of manually creating and managing threads, Java’s java.util.concurrent package provides the Executor framework, which decouples task submission from execution. This framework simplifies multithreaded programming and ensures better resource management, scalability, and control.

## 🎯 Learning Objectives

After reading this documentation, you will be able to:

- Understand the components of Java's Execution Framework
- Use different types of Executors like FixedThreadPool, 
  CachedThreadPool, and SingleThreadExecutor
- Implement tasks using Runnable and Callable
- Use Future to retrieve results from concurrent tasks
- Handle thread lifecycle efficiently

## ⚡ Prerequisites

- Basic understanding of Java syntax and classes
- Familiarity with Java interfaces (Runnable, Callable)
- Installed JDK (Java Development Kit) and an IDE (like IntelliJ or 
  Eclipse)

## 🔑 Key Concepts

### Executor Interface

The core interface that represents an object which executes submitted Runnable tasks. It provides a clean and simple API for task execution.

```java
// Code example demonstrating the concept
public class ConceptExample {
    Executor executor = Executors.newSingleThreadExecutor();
executor.execute(() -> System.out.println("Task executed"));

}
```

### ExecutorService

An extended subinterface of Executor that adds features like shutdown, submitting tasks, and getting results using Future.

```java
ExecutorService service = Executors.newFixedThreadPool(2);
service.submit(() -> System.out.println("Task via ExecutorService"));
service.shutdown();
```


### Callable and Future

Callable is similar to Runnable but can return a result and throw a checked exception. The result of a Callable can be retrieved using a Future object.

```java 
Callable<Integer> task = () -> 10 + 20;
Future<Integer> future = service.submit(task);
System.out.println("Result: " + future.get());

```
## 💻 Code Examples

### Basic Example

```java
// Title: Simple Executor Example
// Description: Executes a single task using an Executor

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class BasicExecutor {
    public static void main(String[] args) {
        Executor executor = Executors.newSingleThreadExecutor();

        executor.execute(() -> {
            System.out.println("Task executed by: " + Thread.currentThread().getName());
        });
    }
}


public class BasicExample {
    public static void main(String[] args) {
        // Step 1: [Explain what this step does]

        // Step 2: [Explain what this step does]

        // Step 3: [Explain what this step does]

        // Output explanation
        System.out.println("Expected output: [describe output]");
    }
}
```

### Intermediate Example

```java
// Title: FixedThreadPool Example
// Description: Executes multiple tasks using a fixed thread pool

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class FixedThreadPoolExample {
    public static void main(String[] args) {
        ExecutorService service = Executors.newFixedThreadPool(3);

        for (int i = 1; i <= 5; i++) {
            final int taskId = i;
            service.execute(() -> {
                System.out.println("Executing Task " + taskId + " by " + Thread.currentThread().getName());
            });
        }

        service.shutdown();
    }
}


public class IntermediateExample {
    // Implementation with more realistic scenario
}
```

### Advanced Example

```java
// Title: Callable and Future with Timeout
// Description: Demonstrates task execution with result retrieval and timeout

import java.util.concurrent.*;

public class CallableFutureExample {
    public static void main(String[] args) {
        ExecutorService service = Executors.newCachedThreadPool();

        Callable<String> task = () -> {
            Thread.sleep(1000);
            return "Callable Result";
        };

        Future<String> future = service.submit(task);

        try {
            String result = future.get(2, TimeUnit.SECONDS);
            System.out.println("Result: " + result);
        } catch (TimeoutException e) {
            System.out.println("Task timed out");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            service.shutdown();
        }
    }
}


public class AdvancedExample {
    // Full implementation with error handling, optimization, etc.
}
```

## ✅ Best Practices

1. **Always shut down the ExecutorService**

   - Use shutdown() or shutdownNow() to gracefully release resources
   - Prevents memory leaks and blocked threads
   
2. **Use appropriate Executor type**

   - FixedThreadPool for predictable load
   - CachedThreadPool for many short-lived tasks
   - SingleThreadExecutor for sequential tasks

3. **Handle exceptions in tasks**
   - Use try-catch blocks inside your Runnable/Callable
   - Avoid crashing the thread pool

## ❌ Common Pitfalls

1. **Forgetting to shut down the ExecutorService**

  ```java
  // Wrong way
ExecutorService service = Executors.newFixedThreadPool(2);
service.execute(() -> {});
// No shutdown
```

   ```java
   // Correct way
ExecutorService service = Executors.newFixedThreadPool(2);
service.execute(() -> {});
service.shutdown();

   ```

   **Why this matters**: Not shutting down leaves threads running, leading to memory leaks.

2. **Blocking forever on Future.get()**
   Use get(timeout, unit) to avoid hanging if a task never completes.


3. **Too many threads in CachedThreadPool**
   Unbounded threads can cause OutOfMemoryError under heavy load.

## 🔧 Hands-On Exercise

### Exercise: Prime Number Checker Using ExecutorService

**Objective**:  Use the Executor Framework to check if a number is prime using multiple threads.

**Requirements**:

- Accept multiple numbers
- Submit each number as a separate task
- Return whether each is prime

**Starter Code**:

```java
// TODO: Complete the following class
import java.util.concurrent.*;

public class PrimeChecker {
    public static void main(String[] args) {
        ExecutorService service = Executors.newFixedThreadPool(3);
        int[] numbers = {17, 19, 20, 23};

        for (int num : numbers) {
            // Submit Callable task to check if number is prime
        }

        service.shutdown();
    }

    // TODO: Write a method or Callable to check if a number is prime
}

```

**Solution Hints**:

- Use Callable<Boolean> for each number
- Return true if the number is prime
- Use Future.get() to print the result

**Expected Output**:

```
17 is Prime
19 is Prime
20 is Not Prime
23 is Prime

```

## 🚀 Real-World Applications

### Use Case 1: Web Server Thread Pool

Web servers like Tomcat use thread pools to handle incoming HTTP requests efficiently

### Use Case 2: Background Tasks in Desktop Apps

Applications can offload long-running tasks (like file processing) using Executors to keep the UI responsive.

## 🔗 Integration with Other Topics

- **Related to [Topic Name]**: Related to Threads: Built on Java thread 
  concepts
- **Prerequisites for [Topic Name]**: Prerequisites for Concurrency
  Utilities: Needed to understand ForkJoinPool, CompletionService
- **Combines with [Topic Name]**: Combines with Future/Callable: To 
  retrieve async results

## 📚 Further Reading

- [Link 1](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ExecutorService.html) - Official Java Docs
- [Link 2](https://www.baeldung.com/java-executor-service-tutorial) - In-depth explanation
- [Official Documentation](https://docs.oracle.com/javase/tutorial/essential/concurrency/executors.html) - Tutorial with examples

## 💡 Tips for Success

- Use Executors.newFixedThreadPool() for CPU-bound tasks
- Use Callable when result or exception handling is needed
- Monitor and log thread pool usage in production

## 🔍 Troubleshooting

### Common Error: RejectedExecutionException

**Cause**: Task is submitted after the executor has been shut down
**Solution**: Solution: Ensure all tasks are submitted before calling shutdown()

```java
// Example of the 
ExecutorService service = Executors.newSingleThreadExecutor();
service.shutdown();  // Shut down too early
service.execute(() -> System.out.println("This will fail")); // Exception

```

### Common Error: Future.get() blocks forever

**Cause**: Task hangs or deadlocks
**Solution**: Use timeout with get() or debug the task for possible infinite loops

## 🏷️ Tags

#java #executorframework #concurrency #multithreading #threadpool

---

**Author**: Sarang Marotkar

**Last Updated**: July 23, 2025 

**Reviewed By**: T.Varnan sir

**Difficulty Level**: Intermediate 

**Estimated Reading Time**: 15 minutes
