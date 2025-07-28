# Producer and Consumer in Java

## 📖 Overview

The Producer-Consumer problem is a classic example of a multi-threading scenario in Java. It involves two types of threads, the producer which generates data and places it into a shared resource (like a buffer), and the consumer which takes the data from the shared resource for processing. The challenge is to ensure synchronization to avoid conflicts such as reading from an empty buffer or writing to a full one.

## 🎯 Learning Objectives

After reading this documentation, you will be able to:

- Understand the Producer-Consumer problem
- Implement thread synchronization using wait() and notify()
- Use BlockingQueue for thread-safe producer-consumer implementations
- Understand thread communication in multi-threaded applications

## ⚡ Prerequisites

- Basic understanding of Java threads and synchronization
- Familiarity with `synchronized`, `wait()`, and `notify()` methods
- IDE or text editor (e.g., IntelliJ, Eclipse, or Notepad++)

## 🔑 Key Concept

### 1. What is the Producer-Consumer Problem?

The Producer-Consumer problem illustrates the need for synchronization in multi-threading where producers and consumers share a common buffer.

### 2. Solutions in Java

- **Using `synchronized`, `wait()`, and `notify()`**
- **Using `BlockingQueue` from java.util.concurrent**

```java
// Using wait and notify
class SharedBuffer {
    private int data;
    private boolean available = false;

    public synchronized void produce(int value) throws InterruptedException {
        while (available) {
            wait();
        }
        data = value;
        available = true;
        System.out.println("Produced: " + value);
        notify();
    }

    public synchronized void consume() throws InterruptedException {
        while (!available) {
            wait();
        }
        System.out.println("Consumed: " + data);
        available = false;
        notify();
    }
}
```

## 💻 Code Examples

### Basic Example

**Title**: Producer and Consumer using wait() and notify()

**Description**: Demonstrates thread communication via low-level synchronization

```java
public class Main {
    public static void main(String[] args) {
        SharedBuffer buffer = new SharedBuffer();

        Thread producer = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                try {
                    buffer.produce(i);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread consumer = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                try {
                    buffer.consume();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        producer.start();
        consumer.start();
    }
}
```

### Intermediate Example

**Title**: Using BlockingQueue for thread-safe Producer-Consumer

**Description**: Simplifies the implementation using java.util.concurrent.BlockingQueue

```java
import java.util.concurrent.*;

public class BlockingQueueExample {
    public static void main(String[] args) {
        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);

        Runnable producer = () -> {
            for (int i = 1; i <= 5; i++) {
                try {
                    queue.put(i);
                    System.out.println("Produced: " + i);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };

        Runnable consumer = () -> {
            for (int i = 1; i <= 5; i++) {
                try {
                    int val = queue.take();
                    System.out.println("Consumed: " + val);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };

        new Thread(producer).start();
        new Thread(consumer).start();
    }
}
```

## ✅ Best Practices

1. Prefer **BlockingQueue** over low-level synchronization for simplicity and safety.
2. Use proper exception handling in threads.
3. Always **ensure shared resources are synchronized** or use thread-safe classes.
4. Keep producer and consumer logic separate and modular for better readability and maintenance.

## ❌ Common Pitfalls

1. **Deadlock**: When producer and consumer wait on each other indefinitely.
2. **Data inconsistency**: Occurs when synchronization is not properly implemented.
3. **Using wait/notify outside synchronized blocks**: This causes `IllegalMonitorStateException`.

## 🔧 Hands-On Exercise

### Exercise: Create a message queue where one thread produces messages and another consumes them.

**Objective**: Practice using wait() and notify() for inter-thread communication.

**Starter Code**:

```java
class MessageQueue {
    private String message;
    private boolean empty = true;

    public synchronized void put(String msg) throws InterruptedException {
        while (!empty) {
            wait();
        }
        message = msg;
        empty = false;
        System.out.println("Produced: " + msg);
        notify();
    }

    public synchronized void get() throws InterruptedException {
        while (empty) {
            wait();
        }
        System.out.println("Consumed: " + message);
        empty = true;
        notify();
    }
}
```

**Expected Output**:
```
Produced: Hello
Consumed: Hello
```

## 🚀 Real-World Applications

### Use Case 1: Task Scheduling

Producer-consumer is used in scheduling tasks like printing jobs or logging data.

### Use Case 2: Network Data Handling

Receiving packets (producer) and processing packets (consumer) in network applications.

## 🔗 Integration with Other Topics

- **Thread Synchronization**: Core concept behind the producer-consumer problem
- **Concurrency Utilities**: Java’s `java.util.concurrent` simplifies multithreaded designs
- **Design Patterns**: Forms the base of the classic Producer-Consumer design pattern

## 📚 Further Reading

- Java Concurrency in Practice by Brian Goetz
- Oracle Java Documentation – Multithreading
- Baeldung – Java Producer Consumer Example
- GeeksForGeeks – Producer Consumer Problem

## 💡 Tips for Success

- Start with simple examples using BlockingQueue.
- Understand thread life cycle and monitor locking.
- Avoid shared state unless synchronized or thread-safe structures are used.

## 🔍 Troubleshooting

### Error: IllegalMonitorStateException
**Cause**: Calling wait/notify without holding object monitor  
**Solution**: Always call inside a synchronized block

### Error: Deadlock or Livelock
**Cause**: Threads waiting indefinitely for each other  
**Solution**: Use `notifyAll()` instead of `notify()` where appropriate

## 🏷️ Tags

#java #producerconsumer #multithreading #synchronization #concurrency #blockingqueue

---

**Author**: Vaidehi Bhilawe  
**Last Updated**: July 28, 2025  
**Reviewed By**: T.Varnan Sir  
**Difficulty Level**: Intermediate  
**Estimated Reading Time**: 10–12 minutes
