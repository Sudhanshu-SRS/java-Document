# Stream in Java

## 📖 Overview

Java Streams represent a powerful abstraction for processing sequences of elements in a functional style. Introduced in Java 8, the Stream API allows operations such as filtering, mapping, and reducing on data collections with high performance and readable syntax. Streams enable declarative data processing and support parallel execution.

## 🎯 Learning Objectives

After reading this documentation, you will be able to:

- Understand what Java Streams are and how they differ from collections
- Perform operations like filtering, mapping, and reduction on data
- Write stream pipelines to process data concisely
- Use terminal and intermediate operations effectively

## ⚡ Prerequisites

- Basic understanding of Java collections (List, Set, Map)
- Familiarity with Java 8 or higher
- Knowledge of lambda expressions and functional interfaces
- IDE or text editor (e.g., IntelliJ, Eclipse, or Notepad++)

## 🔑 Key Concept

### 1. What is a Stream?

A **Stream** in Java is a sequence of elements supporting sequential and parallel aggregate operations. Unlike collections, streams do not store data but operate on data from a source (like a collection or an array) via a pipeline of operations.

### 2. Types of Stream Operations

- **Intermediate Operations**: Return a new stream (e.g., `filter`, `map`, `sorted`)
- **Terminal Operations**: Produce a result or a side effect (e.g., `collect`, `forEach`, `reduce`)

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

names.stream()
    .filter(name -> name.startsWith("A"))
    .forEach(System.out::println);
```

## 💻 Code Examples

### Basic Example

**Title**: Filtering a Stream

**Description**: Filters out elements that don’t match a given predicate.

```java
import java.util.*;

public class StreamExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Anna", "Brian", "Amanda");
        names.stream()
            .filter(name -> name.startsWith("A"))
            .forEach(System.out::println);
        // Output: Anna, Amanda
    }
}
```

### Intermediate Example

**Title**: Mapping and Collecting a Stream

**Description**: Converts all elements to uppercase and collects them into a list.

```java
import java.util.*;
import java.util.stream.*;

public class StreamMapExample {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("java", "stream", "api");

        List<String> result = words.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        System.out.println(result);  // Output: [JAVA, STREAM, API]
    }
}
```

### Advanced Example

**Title**: Reducing a Stream

**Description**: Finds the sum of integers using reduce.

```java
import java.util.*;
import java.util.stream.*;

public class StreamReduceExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        int sum = numbers.stream()
            .reduce(0, Integer::sum);

        System.out.println("Sum: " + sum);  // Output: Sum: 15
    }
}
```

## ✅ Best Practices

1. Prefer **Streams for Transformations**, not for storing data.

2. Use **method references** when possible for cleaner code:
   ```java
   list.stream().map(String::toUpperCase)
   ```

3. Chain operations fluently, but avoid overly long chains that reduce readability.

4. Use **parallelStream()** only when truly beneficial and the operation is thread-safe.

## ❌ Common Pitfalls

1. **Modifying source during stream operation**

   Modifying the list while streaming may cause `ConcurrentModificationException`.

2. **Reusing a consumed stream**

   A stream cannot be reused once a terminal operation has been called.

   ```java
   Stream<String> stream = list.stream();
   stream.forEach(System.out::println);
   stream.forEach(System.out::println); // Error
   ```

## 🔧 Hands-On Exercise

### Exercise: Process a list of students and filter based on marks

**Objective**: Use streams to filter students who scored above 70.

**Starter Code**:

```java
import java.util.*;
import java.util.stream.*;

class Student {
    String name;
    int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = Arrays.asList(
            new Student("Alice", 85),
            new Student("Bob", 65),
            new Student("Charlie", 90)
        );

        // TODO: Use stream to filter and print students with marks > 70
    }
}
```

**Expected Output**:
```
Alice
Charlie
```

## 🚀 Real-World Applications

### Use Case 1: Data Processing

Streams are ideal for transforming and filtering data from databases, APIs, and large datasets.

### Use Case 2: Log Analysis

Process logs using streams to filter by error level, timestamp, or message content.

## 🔗 Integration with Other Topics

- **Lambda Expressions**: Key to writing compact stream operations
- **Functional Interfaces**: Streams rely heavily on Predicate, Function, and Consumer interfaces
- **Collections API**: Streams are tightly coupled with Java’s Collection framework

## 📚 Further Reading

- Oracle Java Documentation on Streams
- Baeldung Guide to Java Streams
- Java 8 in Action (Book)
- GeeksForGeeks - Stream API in Java
- [Effective Java by Joshua Bloch – Chapter on Lambdas and Streams]

## 💡 Tips for Success

- Practice writing different stream pipelines using real data
- Know when to use sequential vs parallel streams
- Remember: Streams are lazy — nothing happens until a terminal operation is invoked

## 🔍 Troubleshooting

### Error: "Stream has already been operated upon or closed"
**Cause**: Trying to reuse a stream after terminal operation  
**Solution**: Create a new stream for each operation

### Error: "NullPointerException during stream processing"
**Cause**: Using stream operations on null elements  
**Solution**: Use `Objects::nonNull` filter or null checks

```java
list.stream().filter(Objects::nonNull).forEach(System.out::println);
```

## 🏷️ Tags

#java #streamapi #functionalprogramming #collections #javastreams #lambda

---

**Author**: Varsha Mohod  
**Last Updated**: July 28, 2025  
**Reviewed By**: T.Varnan Sir  
**Difficulty Level**: Intermediate  
**Estimated Reading Time**: 10–12 minutes
