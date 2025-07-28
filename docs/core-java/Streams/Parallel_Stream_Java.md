Parallel Stream in Java 

📖 Overview 

Parallel streams in Java allow you to process collections concurrently using multiple threads, thereby improving performance for large data sets. It is part of the Java Stream API and provides an easy way to perform parallel operations without manually managing threads.

🎯 Learning Objectives 

After reading this documentation, you will be able to:

- Understand the concept and purpose of parallel streams in Java
- Create and use parallel streams
- Compare sequential vs parallel stream performance
- Handle common pitfalls and thread-safety issues with parallel streams

⚡ Prerequisites 

- Familiarity with Java Streams and Collections
- Understanding of basic multithreading concepts
- Java Development Kit (JDK) installed
- IDE like Eclipse or IntelliJ IDEA


🔑 Key Concept 

 1. What is a Parallel Stream? 

A **parallel stream** divides the source data into multiple parts and processes them in parallel using the **ForkJoinPool**.

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
list.parallelStream().forEach(System.out::println);
2. Sequential vs Parallel
Feature	Sequential Stream	Parallel Stream
Processing	One thread (main thread)	Multiple threads (ForkJoinPool)
Performance	Slower for large data	Faster for large data
Thread Safety Needed?	No	Yes, if shared mutable state

3. Creating Parallel Streams
java
Copy
Edit
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.parallelStream().forEach(name -> System.out.println(name));
OR

java
Copy
Edit
Stream<String> parallel = names.stream().parallel();
💻 Code Examples
Basic Example
Title: Using parallelStream() on a list

java
Copy
Edit
import java.util.Arrays;
import java.util.List;

public class ParallelExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("John", "Jane", "Mark", "Tom");
        names.parallelStream().forEach(System.out::println);
    }
}
Output may not be in order due to parallel execution.

Intermediate Example
Title: Measure time difference between sequential and parallel

java
Copy
Edit
import java.util.stream.IntStream;

public class TimeTest {
    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        IntStream.range(1, 1000000).forEach(i -> Math.sqrt(i));
        long end = System.currentTimeMillis();
        System.out.println("Sequential Time: " + (end - start));

        start = System.currentTimeMillis();
        IntStream.range(1, 1000000).parallel().forEach(i -> Math.sqrt(i));
        end = System.currentTimeMillis();
        System.out.println("Parallel Time: " + (end - start));
    }
}
Advanced Example
Title: Summing numbers using parallel stream with reduce

java
Copy
Edit
import java.util.stream.IntStream;

public class SumExample {
    public static void main(String[] args) {
        int sum = IntStream.rangeClosed(1, 1000)
                           .parallel()
                           .reduce(0, Integer::sum);
        System.out.println("Sum: " + sum); // Output: 500500
    }
}
✅ Best Practices
Use parallel streams for large data sets where performance matters

Avoid using parallel streams on I/O-bound or shared mutable data

Use terminal operations like collect, reduce, forEach cautiously in parallel

Profile performance before and after using parallel stream

❌ Common Pitfalls
Unpredictable Order

java
Copy
Edit
list.parallelStream().forEach(System.out::println); // Order not guaranteed
Thread Safety Issues

Avoid modifying shared variables inside parallel stream operations.

java
Copy
Edit
List<Integer> list = Arrays.asList(1, 2, 3);
int[] sum = new int[1]; // Not thread-safe!
list.parallelStream().forEach(n -> sum[0] += n);
Use thread-safe constructs or reduce instead.

🔧 Hands-On Exercise
Exercise: Convert a list of strings to uppercase in parallel
Objective: Use a parallel stream to convert a list of lowercase strings to uppercase.

Starter Code:

java
Copy
Edit
import java.util.Arrays;
import java.util.List;

public class UpperCaseParallel {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("alice", "bob", "charlie");

        // TODO: Convert to uppercase in parallel and print
    }
}
Solution Hint:

Use map(String::toUpperCase) and forEach(System.out::println)

Expected Output:

nginx
Copy
Edit
ALICE
BOB
CHARLIE
🚀 Real-World Applications
Use Case 1: Large Data Processing
Useful in processing massive data sets like log files, big list transformations, or sensor data.

Use Case 2: Scientific Computation
Mathematical operations like statistics, transformations, and simulations benefit from parallel streams.

🔗 Integration with Other Topics
Multithreading: Uses ForkJoin framework under the hood

Stream API: Advanced use-case of Stream operations

Functional Programming: Encourages use of map, filter, reduce in parallel

📚 Further Reading
Oracle Docs – Parallel Streams

Java 8 in Action – Chapter on Streams and Parallelism

Baeldung – Guide to Parallel Streams

GeeksForGeeks – Java 8 Stream API

💡 Tips for Success
Use .parallelStream() only when there's actual performance gain

Avoid using parallel streams for small collections or short tasks

Always test for thread safety if shared resources are involved

🔍 Troubleshooting
Error: Incorrect Output Order
Cause: forEach() is non-deterministic in parallel

Solution: Use forEachOrdered() if order matters

Error: Race Conditions
Cause: Shared mutable state in stream operations

Solution: Use stateless operations and avoid shared variables

🏷️ Tags
#java #parallelstream #multithreading #performance #streamapi

Author: Aachal Rajendra  Katkar 

Last Updated: July 28, 2025

Reviewed By: T.Varnan Sir

Difficulty Level: Intermediate

Estimated Reading Time: 10 minutes