# Java Collections Framework

## 📖 Overview

The Java Collections Framework provides a unified architecture for representing and manipulating collections of objects. It includes interfaces, implementations, and algorithms to work with groups of objects efficiently.

## 🎯 Learning Objectives

After reading this documentation, you will be able to:

- Understand the hierarchy of collection interfaces
- Choose the right collection type for different scenarios
- Implement common collection operations
- Apply best practices for performance optimization

## ⚡ Prerequisites

- Basic Java programming knowledge
- Understanding of Object-Oriented Programming concepts
- Familiarity with generics in Java

## 🔑 Key Concepts

### Collection Hierarchy

```
Collection (Interface)
├── List (Interface)
│   ├── ArrayList (Class)
│   ├── LinkedList (Class)
│   └── Vector (Class)
├── Set (Interface)
│   ├── HashSet (Class)
│   ├── LinkedHashSet (Class)
│   └── TreeSet (Class)
└── Queue (Interface)
    ├── LinkedList (Class)
    ├── PriorityQueue (Class)
    └── ArrayDeque (Class)

Map (Interface) - Separate hierarchy
├── HashMap (Class)
├── LinkedHashMap (Class)
├── TreeMap (Class)
└── Hashtable (Class)
```

### Core Interfaces

#### List Interface

- Ordered collection (sequence)
- Allows duplicate elements
- Elements can be accessed by index

#### Set Interface

- No duplicate elements
- Models mathematical set abstraction
- May or may not be ordered

#### Map Interface

- Key-value pairs
- No duplicate keys
- Each key maps to exactly one value

## 💻 Code Examples

### List Examples

#### ArrayList - Dynamic Array

```java
import java.util.*;

public class ArrayListExample {
    public static void main(String[] args) {
        // Creating an ArrayList
        List<String> fruits = new ArrayList<>();

        // Adding elements
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        fruits.add("Apple"); // Duplicates allowed

        // Accessing elements by index
        System.out.println("First fruit: " + fruits.get(0));

        // Iterating through the list
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // Size and contains
        System.out.println("Size: " + fruits.size());
        System.out.println("Contains Cherry: " + fruits.contains("Cherry"));

        // Removing elements
        fruits.remove("Banana");
        fruits.remove(0); // Remove by index

        System.out.println("After removal: " + fruits);
    }
}
```

#### LinkedList - Doubly Linked List

```java
import java.util.*;

public class LinkedListExample {
    public static void main(String[] args) {
        LinkedList<Integer> numbers = new LinkedList<>();

        // Adding elements at different positions
        numbers.add(10);           // Add at end
        numbers.addFirst(5);       // Add at beginning
        numbers.addLast(20);       // Add at end
        numbers.add(1, 15);        // Add at specific index

        System.out.println("LinkedList: " + numbers);

        // Accessing first and last elements
        System.out.println("First: " + numbers.getFirst());
        System.out.println("Last: " + numbers.getLast());

        // Removing elements
        numbers.removeFirst();
        numbers.removeLast();

        System.out.println("After removal: " + numbers);
    }
}
```

### Set Examples

#### HashSet - Hash Table Implementation

```java
import java.util.*;

public class HashSetExample {
    public static void main(String[] args) {
        Set<String> colors = new HashSet<>();

        // Adding elements (duplicates ignored)
        colors.add("Red");
        colors.add("Green");
        colors.add("Blue");
        colors.add("Red");    // Duplicate - will be ignored

        System.out.println("Colors: " + colors); // Order not guaranteed
        System.out.println("Size: " + colors.size()); // Size is 3, not 4

        // Checking membership
        if (colors.contains("Green")) {
            System.out.println("Green is in the set");
        }

        // Iterating through set
        for (String color : colors) {
            System.out.println(color);
        }
    }
}
```

#### TreeSet - Sorted Set

```java
import java.util.*;

public class TreeSetExample {
    public static void main(String[] args) {
        TreeSet<Integer> sortedNumbers = new TreeSet<>();

        // Adding elements in random order
        sortedNumbers.add(30);
        sortedNumbers.add(10);
        sortedNumbers.add(50);
        sortedNumbers.add(20);
        sortedNumbers.add(40);

        System.out.println("Sorted numbers: " + sortedNumbers);

        // NavigableSet methods
        System.out.println("First: " + sortedNumbers.first());
        System.out.println("Last: " + sortedNumbers.last());
        System.out.println("Lower than 30: " + sortedNumbers.lower(30));
        System.out.println("Higher than 30: " + sortedNumbers.higher(30));

        // Subset operations
        System.out.println("Numbers between 20 and 40: " +
                          sortedNumbers.subSet(20, 40));
    }
}
```

### Map Examples

#### HashMap - Hash Table for Key-Value Pairs

```java
import java.util.*;

public class HashMapExample {
    public static void main(String[] args) {
        Map<String, Integer> studentGrades = new HashMap<>();

        // Adding key-value pairs
        studentGrades.put("Alice", 95);
        studentGrades.put("Bob", 87);
        studentGrades.put("Charlie", 92);
        studentGrades.put("Diana", 88);

        // Accessing values by key
        System.out.println("Alice's grade: " + studentGrades.get("Alice"));

        // Updating a value
        studentGrades.put("Bob", 90); // Updates Bob's grade

        // Checking for keys and values
        System.out.println("Has Charlie: " + studentGrades.containsKey("Charlie"));
        System.out.println("Has grade 95: " + studentGrades.containsValue(95));

        // Iterating through the map
        for (Map.Entry<String, Integer> entry : studentGrades.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        // Getting all keys and values
        System.out.println("All students: " + studentGrades.keySet());
        System.out.println("All grades: " + studentGrades.values());
    }
}
```

### Advanced Example - Student Management System

```java
import java.util.*;

class Student {
    private String name;
    private int id;
    private double gpa;

    public Student(int id, String name, double gpa) {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
    }

    // Getters and toString
    public int getId() { return id; }
    public String getName() { return name; }
    public double getGpa() { return gpa; }

    @Override
    public String toString() {
        return String.format("Student{id=%d, name='%s', gpa=%.2f}", id, name, gpa);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Student student = (Student) obj;
        return id == student.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

public class StudentManagementSystem {
    public static void main(String[] args) {
        // Using different collections for different purposes

        // List to maintain order of enrollment
        List<Student> enrollmentOrder = new ArrayList<>();

        // Set to ensure no duplicate students
        Set<Student> uniqueStudents = new HashSet<>();

        // Map for quick lookup by ID
        Map<Integer, Student> studentDatabase = new HashMap<>();

        // Adding students
        Student[] students = {
            new Student(101, "Alice Johnson", 3.8),
            new Student(102, "Bob Smith", 3.5),
            new Student(103, "Charlie Brown", 3.9),
            new Student(104, "Diana Wilson", 3.7)
        };

        for (Student student : students) {
            enrollmentOrder.add(student);
            uniqueStudents.add(student);
            studentDatabase.put(student.getId(), student);
        }

        // Try to add duplicate (will be ignored in set)
        Student duplicate = new Student(101, "Alice Johnson", 3.8);
        uniqueStudents.add(duplicate);

        System.out.println("Enrollment order: " + enrollmentOrder.size());
        System.out.println("Unique students: " + uniqueStudents.size());

        // Quick lookup by ID
        Student found = studentDatabase.get(102);
        System.out.println("Student 102: " + found);

        // Find students with GPA > 3.7
        List<Student> highAchievers = new ArrayList<>();
        for (Student student : uniqueStudents) {
            if (student.getGpa() > 3.7) {
                highAchievers.add(student);
            }
        }

        System.out.println("High achievers: " + highAchievers);
    }
}
```

## ✅ Best Practices

### Choosing the Right Collection

1. **Use ArrayList** when:

   - You need indexed access to elements
   - You do more reading than inserting/deleting
   - You need to maintain insertion order

2. **Use LinkedList** when:

   - You frequently insert/delete at the beginning or middle
   - You don't need indexed access
   - You implement queue/stack behavior

3. **Use HashSet** when:

   - You need to eliminate duplicates
   - You need fast lookup/insertion/deletion
   - Order doesn't matter

4. **Use TreeSet** when:

   - You need sorted elements
   - You need to perform range operations
   - You want to maintain natural ordering

5. **Use HashMap** when:

   - You need key-value associations
   - You need fast lookup by key
   - Order doesn't matter

6. **Use TreeMap** when:
   - You need sorted key-value pairs
   - You need to perform range operations on keys

### Performance Considerations

```java
// Good: Use appropriate initial capacity
List<String> list = new ArrayList<>(1000); // If you expect ~1000 elements

// Good: Use enhanced for loop for iteration
for (String item : list) {
    // Process item
}

// Avoid: Using for loop with get() on LinkedList
// for (int i = 0; i < linkedList.size(); i++) {
//     linkedList.get(i); // O(n) operation for each access!
// }

// Good: Use iterator for LinkedList
Iterator<String> it = linkedList.iterator();
while (it.hasNext()) {
    String item = it.next();
    // Process item
}
```

### Memory and Concurrency

```java
// For thread-safe operations, use concurrent collections
Map<String, String> concurrentMap = new ConcurrentHashMap<>();
List<String> synchronizedList = Collections.synchronizedList(new ArrayList<>());

// Or use Collections utility methods
Set<String> synchronizedSet = Collections.synchronizedSet(new HashSet<>());
```

## ❌ Common Pitfalls

1. **Modifying collection during iteration**

```java
// Wrong: ConcurrentModificationException
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
for (String item : list) {
    if (item.equals("B")) {
        list.remove(item); // Exception!
    }
}

// Correct: Use iterator's remove method
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String item = it.next();
    if (item.equals("B")) {
        it.remove(); // Safe removal
    }
}
```

2. **Not overriding equals() and hashCode()**

```java
// Wrong: Custom objects in HashSet without proper equals/hashCode
class Person {
    String name;
    // Missing equals() and hashCode()
}

Set<Person> people = new HashSet<>();
people.add(new Person("John"));
people.add(new Person("John")); // Will be treated as different objects!
```

3. **Using == instead of equals() for String comparison**

```java
// Wrong
if (list.get(0) == "Hello") { /* May not work as expected */ }

// Correct
if ("Hello".equals(list.get(0))) { /* Safe null check too */ }
```

## 🔧 Hands-On Exercise

Create a simple library management system that demonstrates the use of different collections:

```java
// TODO: Implement a LibrarySystem class that:
// 1. Uses a List to maintain books in order of acquisition
// 2. Uses a Set to track unique book ISBNs
// 3. Uses a Map to associate member IDs with borrowed books
// 4. Implements methods for adding books, registering members, borrowing, and returning books
```

## 📚 Further Reading

- [Oracle Collections Tutorial](https://docs.oracle.com/javase/tutorial/collections/) - Official comprehensive guide
- [Java Collections Performance](https://www.baeldung.com/java-collections-complexity) - Big O complexity analysis
- [Effective Java by Joshua Bloch](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/) - Chapter 7: Collections

## 🏷️ Tags

#java #collections #datastructures #arraylist #hashmap #performance

---

**Author**: [Your Name]  
**Last Updated**: July 21, 2025  
**Reviewed By**: [Reviewer Names]
