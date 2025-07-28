
# Single Stream in Java

## 📖 Overview

In Java, the **Stream API** introduced in Java 8 allows you to process collections of objects in a functional and declarative way. A **single stream** refers to the processing of data in a single pipeline, without combining multiple streams. It helps in writing cleaner, more concise code for transformations, filtering, and aggregations.

## 🎯 Learning Objectives

After reading this documentation, you will be able to:

- Understand what a single stream is in Java
- Perform operations using a single stream
- Apply functional-style operations like `filter`, `map`, and `reduce`
- Use stream pipelines for real-world scenarios like filtering and transforming data

## ⚡ Prerequisites

- Knowledge of Java Collections (like List, Set)
- Familiarity with Java 8 features (especially Lambda expressions)
- JDK 8+ installed and configured
- IDE or text editor (e.g., IntelliJ, Eclipse, VS Code)

## 🔑 Key Concept

### What is a Single Stream?

A single stream represents a **pipeline of operations** on a collection of data. It does **not** branch or merge with other streams. It's typically used to:

1. Filter elements  
2. Transform elements  
3. Perform aggregation or terminal operations (like `forEach`, `count`, `collect`)

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

names.stream()
     .filter(name -> name.startsWith("A"))
     .map(String::toUpperCase)
     .forEach(System.out::println);
```

> Output: `ALICE`

## 💻 Code Examples

### Basic Example

**Title**: Filtering a List using a Single Stream  
**Description**: Select names starting with "S"

```java
import java.util.*;

public class StreamExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Sam", "Sara", "John", "Sita");

        names.stream()
             .filter(name -> name.startsWith("S"))
             .forEach(System.out::println);
    }
}
```

> **Expected Output**:
```
Sam
Sara
Sita
```

### Intermediate Example

**Title**: Transforming Numbers  
**Description**: Multiply even numbers by 2 and print them

```java
import java.util.*;

public class NumberStream {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(2, 3, 4, 5, 6);

        numbers.stream()
               .filter(n -> n % 2 == 0)
               .map(n -> n * 2)
               .forEach(System.out::println);
    }
}
```

> **Expected Output**:
```
4
8
12
```

### Advanced Example

**Title**: Sum of Squares using Reduce  
**Description**: Square all numbers and calculate the total sum using a single stream

```java
import java.util.*;

public class StreamSum {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4);

        int sumOfSquares = numbers.stream()
                                  .map(n -> n * n)
                                  .reduce(0, Integer::sum);

        System.out.println("Sum of squares: " + sumOfSquares);
    }
}
```

> **Expected Output**:
```
Sum of squares: 30
```

## ✅ Best Practices

1. **Use Terminal Operations**
   - Always end the stream with a terminal operation like `collect()`, `forEach()`, `reduce()`
   - **Why**: Without terminal ops, streams do nothing

2. **Keep Streams Pure**
   - Avoid modifying external state within streams
   - **Why**: Breaks functional behavior and can cause bugs

3. **Avoid Reusing Streams**
   - Streams can only be used once
   - **Why**: They are closed after a terminal operation

## ❌ Common Pitfalls

1. **Using the same stream twice**

```java
Stream<String> stream = list.stream();
stream.forEach(System.out::println); // OK
stream.forEach(System.out::println); // ERROR: stream already consumed
```

2. **Forgetting terminal operation**

```java
list.stream().filter(n -> n > 5); // NO output - no terminal operation
```

## 🔧 Hands-On Exercise

### Exercise: Filter and Sort Names using Single Stream

**Objective**: Use a single stream to filter names starting with "A" and sort them

**Requirements**:

- Use `filter()` to select names starting with "A"
- Use `sorted()` to sort the result
- Print each name

**Starter Code**:

```java
import java.util.*;

public class NameFilter {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Ankit", "Asha", "Ravi", "Arun", "Sneha");

        // TODO: Filter, sort, and print names starting with "A"
    }
}
```

**Solution Hints**:

- Use `filter(name -> name.startsWith("A"))`
- Chain with `sorted()`
- End with `forEach(System.out::println)`

> **Expected Output**:
```
Ankit
Arun
Asha
```

## 🚀 Real-World Applications

### Use Case 1: Data Filtering in Web Apps  
Used in Java-based backend applications to filter large datasets from user inputs.

### Use Case 2: Report Generation  
Processing financial or log data using stream operations to calculate summaries.

## 🔗 Integration with Other Topics

- **Related to Lambda Expressions**: Streams often use lambdas for logic
- **Used in Collections API**: All collections can create streams
- **Foundation for Functional Programming**: Streams promote immutability and clean data processing

## 📚 Further Reading

- Oracle Java Stream Documentation  
- GeeksforGeeks – Java Stream API  
- Java 8 in Action (Book)  
- Baeldung – Stream Tutorials

## 💡 Tips for Success

- Chain stream methods thoughtfully to form a clean pipeline  
- Use `peek()` for debugging streams  
- Explore collectors like `Collectors.toList()`, `toSet()`, and `joining()`

## 🔍 Troubleshooting

### Error: `stream has already been operated upon or closed`  
**Cause**: Trying to reuse the same stream  
**Solution**: Create a new stream for each operation

### Error: `NullPointerException` when streaming  
**Cause**: Null collection  
**Solution**: Always check if the collection is null before streaming

## 🏷️ Tags

#java #streamapi #singleStream #functionalProgramming #javacollections

---

**Author**: Sarika Khorgade 
**Last Updated**: July 28, 2025  
**Reviewed By**: T.Varnan Sir  
**Difficulty Level**: Beginner  
**Estimated Reading Time**: 10–12 minutes
