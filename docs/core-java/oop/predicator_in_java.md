# Predicator in Java

## 📖 Overview

A **Predicator** in Java refers to the use of the `Predicate<T>` functional interface introduced in Java 8 as part of the `java.util.function` package. It is widely used in functional programming for evaluating a boolean condition on a given input. This interface is especially useful in filtering, matching, and condition-checking operations within collections and streams.

## 🎯 Learning Objectives

After reading this documentation, you will be able to:

- Understand what a Predicate is in Java
- Learn how to implement and use Predicate
- Use Predicate with Java Streams
- Combine multiple Predicates for complex conditions

## ⚡ Prerequisites

- Basic understanding of Java programming
- Familiarity with Java 8+ features (Lambdas, Streams)
- Java Development Kit (JDK) installed
- IDE or text editor (e.g., IntelliJ, Eclipse, or VS Code)

## 🔑 Key Concept

### 1. What is a Predicate?

`Predicate<T>` is a functional interface that represents a boolean-valued function of one argument. It contains a single abstract method:

```java
boolean test(T t);
```

### 2. Functional Interface and Lambda Expressions

You can use Predicate as a lambda expression:

```java
Predicate<Integer> isEven = n -> n % 2 == 0;
System.out.println(isEven.test(4)); // Output: true
```

### 3. Built-in Methods

- `test(T t)` – evaluates the predicate
- `and(Predicate other)` – combines with another predicate using logical AND
- `or(Predicate other)` – combines using logical OR
- `negate()` – returns the negation of the predicate

## 💻 Code Examples

### Basic Example

**Title**: Predicate to Check Even Number

**Description**: A simple Predicate to check if a number is even

```java
import java.util.function.Predicate;

public class PredicateDemo {
    public static void main(String[] args) {
        Predicate<Integer> isEven = n -> n % 2 == 0;
        System.out.println(isEven.test(10)); // Expected Output: true
    }
}
```

### Intermediate Example

**Title**: Filter Strings Using Predicate

**Description**: Demonstrates Predicate with a collection

```java
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class StringFilter {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Andrew", "Brian");
        Predicate<String> startsWithA = name -> name.startsWith("A");

        List<String> filtered = names.stream()
                                     .filter(startsWithA)
                                     .collect(Collectors.toList());

        System.out.println(filtered); // Expected Output: [Alice, Andrew]
    }
}
```

### Advanced Example

**Title**: Combining Multiple Predicates

**Description**: Demonstrates `and()`, `or()`, and `negate()`

```java
import java.util.function.Predicate;

public class CombinePredicates {
    public static void main(String[] args) {
        Predicate<String> startsWithA = s -> s.startsWith("A");
        Predicate<String> lengthIs3 = s -> s.length() == 3;

        Predicate<String> combined = startsWithA.and(lengthIs3);

        System.out.println(combined.test("Ant")); // true
        System.out.println(combined.test("Apple")); // false
    }
}
```

## ✅ Best Practices

1. **Keep Predicates Simple and Focused**

   - Why: Improves readability and reusability

2. **Use Method References When Possible**

   - Example: `Predicate<String> isEmpty = String::isEmpty;`

3. **Chain Predicates for Complex Logic**

   - Use `and()`, `or()`, `negate()` for combining predicates logically

## ❌ Common Pitfalls

1. **Ignoring Null Checks**

   - Null inputs may throw `NullPointerException`. Use safeguards.

2. **Overcomplicating Lambda Expressions**

   - Keep lambdas concise and avoid embedding too much logic.

3. **Not Using Predicate’s Default Methods**

   - Missing out on `and()`, `or()`, `negate()` reduces code efficiency.

## 🔧 Hands-On Exercise

### Exercise: Validate a List of Integers

**Objective**: Use `Predicate` to filter and print only positive even numbers from a list

**Requirements**:

- Define a list of integers
- Use a Predicate to check for even and positive numbers
- Print valid numbers using streams

**Starter Code**:

```java
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.*;

public class PredicateExercise {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(-2, 3, 4, -1, 6, 0);

        // TODO: Create predicate and filter the list
    }
}
```

**Solution Hints**:

- Create two predicates: `isPositive`, `isEven`
- Combine using `.and()`

**Expected Output**:

```
4
6
```

## 🚀 Real-World Applications

### Use Case 1: Input Validation

Predicates are used to validate form fields or user inputs.

### Use Case 2: Filtering in Streams

Commonly used in filtering data in Java Streams (e.g., APIs, database queries).

## 🔗 Integration with Other Topics

- *Related to Functional Interfaces*: Predicate is part of Java’s functional interface set
- *Java Streams*: Works seamlessly with stream `.filter()`
- *Lambda Expressions*: Heavily used with Predicate

## 📚 Further Reading

- Official Java Docs on [Predicate](https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html)
- GeeksForGeeks - Java Predicate Interface
- JavaTPoint - Predicate Functional Interface
- Book: Effective Java by Joshua Bloch (Functional Programming Chapter)

## 💡 Tips for Success

- Practice combining predicates for various logical conditions
- Use with Java Streams for real-world collection processing
- Understand how default methods (`and`, `or`, `negate`) work

## 🔍 Troubleshooting

### Error: NullPointerException

**Cause**: Predicate was used on a null object **Solution**: Always validate or check for null before applying predicate

### Error: Complex Predicate Logic Confusion

**Cause**: Long chain of `.and()`/.or() **Solution**: Break logic into smaller predicates and test individually

## 🏷 Tags

\#java #predicate #functionalinterface #streams #lambda #javainterview

---

**Author**: Ishika P. Wadichar

**Last Updated**: July 28, 2025

**Reviewed By**: T.Varnan Sir

**Difficulty Level**: Beginner to Intermediate

**Estimated Reading Time**: 10–12 minutes

