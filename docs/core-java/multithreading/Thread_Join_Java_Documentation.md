
# Thread and Thread Join in Java

## 📖 Overview  
Java provides multithreading to execute multiple tasks concurrently, improving performance and responsiveness. The `Thread` class is the foundation of this mechanism. The `join()` method is crucial for coordinating thread execution—ensuring one thread waits for another to finish. Understanding these concepts is vital for writing efficient and thread-safe applications.

---

## 🎯 Learning Objectives  
After reading this documentation, you will be able to:  
- Understand how to create and start threads in Java  
- Use the `join()` method to coordinate thread execution  
- Handle thread lifecycle and synchronization effectively  
- Identify and avoid common multithreading mistakes  

---

## ⚡ Prerequisites  
- Basic knowledge of Java syntax and object-oriented concepts  
- JDK installed (Java 8 or higher recommended)  
- IDE like IntelliJ, Eclipse, or a simple text editor + terminal  

---

## 🔑 Key Concepts  

### Thread Class  
The `Thread` class allows you to define concurrent behavior in Java applications.

```java
public class ThreadExample extends Thread {
    public void run() {
        System.out.println("Thread is running...");
    }

    public static void main(String[] args) {
        ThreadExample t1 = new ThreadExample();
        t1.start(); // starts a new thread
    }
}
```

### Runnable Interface  
Used when you want your class to extend another class, as Java does not support multiple inheritance.

```java
public class RunnableExample implements Runnable {
    public void run() {
        System.out.println("Runnable thread running...");
    }

    public static void main(String[] args) {
        Thread t1 = new Thread(new RunnableExample());
        t1.start();
    }
}
```

### `join()` Method  
`join()` is used to wait for a thread to complete before moving forward.

```java
public class JoinExample extends Thread {
    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println(i);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        JoinExample t1 = new JoinExample();
        JoinExample t2 = new JoinExample();

        t1.start();
        t1.join();  // Main thread waits for t1 to finish
        t2.start();
    }
}
```

---

## 💻 Code Examples  

### Basic Example  
**Title:** Simple Thread Creation  
**Description:** Creating and starting a thread using the `Thread` class  

```java
public class BasicExample extends Thread {
    public void run() {
        System.out.println("Thread Started!");
    }

    public static void main(String[] args) {
        BasicExample t = new BasicExample();
        t.start(); // Start the thread
        System.out.println("Main Thread Running");
    }
}
```

**Expected Output:**
```
Main Thread Running
Thread Started!
```

---

### Intermediate Example  
**Title:** Thread with Join()  
**Description:** Wait for one thread to complete before starting another  

```java
public class IntermediateExample extends Thread {
    private String name;

    IntermediateExample(String name) {
        this.name = name;
    }

    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println(name + " - Count " + i);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        IntermediateExample t1 = new IntermediateExample("Thread A");
        IntermediateExample t2 = new IntermediateExample("Thread B");

        t1.start();
        t1.join(); // wait for t1 to finish
        t2.start();
    }
}
```

---

### Advanced Example  
**Title:** Coordinating Multiple Threads with Join  
**Description:** Demonstrates sequencing and coordination of multiple threads  

```java
public class AdvancedExample extends Thread {
    private String name;

    public AdvancedExample(String name) {
        this.name = name;
    }

    public void run() {
        for (int i = 0; i < 2; i++) {
            System.out.println(name + " executing: " + i);
            try {
                Thread.sleep(500); // Simulate work
            } catch (InterruptedException e) {
                System.out.println(name + " interrupted");
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        AdvancedExample t1 = new AdvancedExample("Worker-1");
        AdvancedExample t2 = new AdvancedExample("Worker-2");
        AdvancedExample t3 = new AdvancedExample("Worker-3");

        t1.start();
        t1.join();

        t2.start();
        t2.join();

        t3.start();
    }
}
```

---

## ✅ Best Practices  

### Use `join()` only when necessary  
Avoid overusing `join()` in parallel systems to keep concurrency benefits intact.

### Always handle `InterruptedException`  
Since `join()` throws `InterruptedException`, handle it properly to avoid crashing the application.

### Prefer `Runnable` or Executors for large-scale systems  
Using `Runnable` and thread pools is more scalable and manageable.

---

## ❌ Common Pitfalls  

### Not calling `start()`

```java
Thread t = new Thread();
t.run();  // ❌ Wrong - runs in main thread, not a new one

t.start(); // ✅ Correct
```

**Why this matters:** `.run()` just calls the method like a normal function; it doesn’t start a new thread.

---

### Forgetting `join()` leads to race conditions  
Without `join()`, the main thread may complete before child threads finish.

---

## 🔧 Hands-On Exercise  

**Exercise:** Coordinated Threads  
**Objective:** Launch three threads in sequence using `join()`.

### Requirements:  
- Create three threads  
- Use `join()` to start them one after another  
- Print thread name and a message

### Starter Code:

```java
public class ExerciseClass extends Thread {
    private String name;

    public ExerciseClass(String name) {
        this.name = name;
    }

    public void run() {
        System.out.println(name + " running");
    }

    public static void main(String[] args) throws InterruptedException {
        // TODO: Complete the code
    }
}
```

### Solution Hints:  
- Create three objects of `ExerciseClass`  
- Start and join each one in sequence  

### Expected Output:
```
Thread-1 running  
Thread-2 running  
Thread-3 running  
```

---

## 🚀 Real-World Applications  

### Use Case 1: File Processing  
Use threads to process files concurrently, but wait for them to finish before summarizing the results.

### Use Case 2: Gaming Engines  
Coordinate logic, rendering, and input threads using `join()` or similar mechanisms.

---

## 🔗 Integration with Other Topics  
**Related to:** Multithreading, Synchronization, Runnable Interface  
**Prerequisites for:** Thread Pooling, Concurrency Utilities (`ExecutorService`)  
**Combines with:** `synchronized`, `wait()`, `notify()`

---

## 📚 Further Reading  
- [Oracle Java Threads Documentation](https://docs.oracle.com/javase/tutorial/essential/concurrency/)  
- [Baeldung - Guide to Java Threads](https://www.baeldung.com/java-thread)  
- [Java Concurrency in Practice](https://www.oreilly.com/library/view/java-concurrency-in/0321349601/) - Advanced reading  
- [GeeksforGeeks Threads](https://www.geeksforgeeks.org/multithreading-in-java/)  

---

## 💡 Tips for Success  
- Always understand thread lifecycle before using `join()`  
- Keep thread tasks short to avoid blocking  
- Log thread execution for debugging and visibility  

---

## 🔍 Troubleshooting  

### Common Error: `IllegalThreadStateException`  
**Cause:** Calling `start()` on a thread more than once.  
**Solution:** Ensure each thread is started only once.

---

### Common Error: `InterruptedException not handled`  
**Cause:** `join()` requires handling the checked exception.  
**Solution:** Use `try-catch` or declare with `throws`.

---

## 🏷️ Tags  
#java #threads #multithreading #join #concurrency #threading #javabasics  

---

**Author:** *Rupali Korkanti *  
**Last Updated:** 26 July 2025  
**Reviewed By:** T.Varnan sir
**Difficulty Level:** Beginner
**Estimated Reading Time:** 10–15 minutes  
