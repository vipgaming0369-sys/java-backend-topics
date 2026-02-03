// ===========================
// NAVIGATION
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -6px)' 
        : 'none';
});

// Smooth scroll and active link highlighting
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile menu
        navMenu.classList.remove('active');
        
        // Reset hamburger icon
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active section on scroll
const sections = document.querySelectorAll('.section, .hero');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// SCROLL FUNCTIONS
// ===========================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===========================
// MODAL FUNCTIONALITY
// ===========================
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');

// Modal content data
const modalContent = {
    variables: {
        title: 'Variables & Data Types',
        description: 'Variables are containers that store data values in memory. In backend development, they are essential for handling user input, storing database results, and managing API responses.',
        importance: 'Backend Importance',
        points: [
            'Store user credentials and session data',
            'Hold database query results',
            'Manage API request and response data',
            'Control application state'
        ],
        examples: `// Primitive Data Types
int userId = 101;
long timestamp = System.currentTimeMillis();
double price = 99.99;
boolean isActive = true;

// Reference Types
String username = "Yogesh";
String email = "user@example.com";

// In Backend Context
public class UserSession {
    private int userId;
    private String token;
    private boolean isAuthenticated;
    
    // Getters and setters
}`,
        tips: [
            'Choose appropriate data types for efficiency',
            'Use meaningful variable names',
            'Follow naming conventions (camelCase)',
            'Initialize variables before use'
        ]
    },
    control: {
        title: 'Control Statements',
        description: 'Control statements allow you to make decisions and repeat operations in your code. They are fundamental for implementing business logic in backend applications.',
        importance: 'Backend Use Cases',
        points: [
            'Validate user input before processing',
            'Apply business rules and conditions',
            'Process multiple database records',
            'Handle different API request types'
        ],
        examples: `// If-Else for Validation
if (userAge >= 18) {
    System.out.println("Access Granted");
} else {
    System.out.println("Access Denied");
}

// Switch for Request Routing
switch (httpMethod) {
    case "GET":
        handleGetRequest();
        break;
    case "POST":
        handlePostRequest();
        break;
    default:
        handleUnsupportedMethod();
}

// For Loop for Processing
for (int i = 0; i < users.size(); i++) {
    processUser(users.get(i));
}

// While Loop
while (hasMoreData()) {
    processNextBatch();
}`,
        tips: [
            'Use appropriate control structures',
            'Avoid deep nesting',
            'Consider using enhanced for-loops',
            'Handle edge cases'
        ]
    },
    methods: {
        title: 'Methods',
        description: 'Methods are reusable blocks of code that perform specific tasks. Backend applications are built around well-designed methods in services, repositories, and controllers.',
        importance: 'Why Methods Matter',
        points: [
            'Promote code reusability',
            'Improve code organization',
            'Enable easy testing',
            'Support separation of concerns'
        ],
        examples: `// Service Method
public User getUserById(int id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException());
}

// Validation Method
public boolean isValidEmail(String email) {
    String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
    return email.matches(regex);
}

// Processing Method
public List<User> getActiveUsers() {
    return users.stream()
        .filter(User::isActive)
        .collect(Collectors.toList());
}

// Method Overloading
public User saveUser(User user) { }
public User saveUser(String name, String email) { }`,
        tips: [
            'Keep methods focused (Single Responsibility)',
            'Use descriptive method names',
            'Limit parameters (max 3-4)',
            'Return meaningful values'
        ]
    },
    arrays: {
        title: 'Arrays',
        description: 'Arrays are fixed-size data structures that store elements of the same type. While Collections are preferred in modern Java, arrays are still used internally and in certain scenarios.',
        importance: 'Backend Usage',
        points: [
            'Store fixed sets of data',
            'Used in framework internals',
            'Performance-critical operations',
            'Working with varargs'
        ],
        examples: `// Declaring Arrays
int[] userIds = {1, 2, 3, 4, 5};
String[] roles = new String[3];

// Array Operations
roles[0] = "USER";
roles[1] = "ADMIN";
roles[2] = "MODERATOR";

// Iterating Arrays
for (int id : userIds) {
    System.out.println("User ID: " + id);
}

// Multi-dimensional Arrays
String[][] permissions = {
    {"read", "write"},
    {"read"},
    {"read", "write", "delete"}
};`,
        tips: [
            'Prefer Collections for flexibility',
            'Check bounds before accessing',
            'Use Arrays.toString() for debugging',
            'Consider ArrayList for dynamic sizing'
        ]
    },
    strings: {
        title: 'Strings',
        description: 'Strings are sequences of characters and are immutable in Java. They are crucial in backend development for handling text data from APIs, databases, and user input.',
        importance: 'Backend Importance',
        points: [
            'Process API requests and responses',
            'Parse and generate JSON data',
            'Handle URLs and query parameters',
            'Validate and sanitize user input'
        ],
        examples: `// String Operations
String email = "user@example.com";
String domain = email.substring(email.indexOf("@") + 1);
String upperEmail = email.toUpperCase();

// String Concatenation
String fullName = firstName + " " + lastName;
String url = "https://api.example.com/" + endpoint;

// StringBuilder (for multiple operations)
StringBuilder query = new StringBuilder();
query.append("SELECT * FROM users WHERE ");
query.append("status = 'active' AND ");
query.append("age >= 18");

// String Formatting
String message = String.format("User %s logged in at %s", 
    username, timestamp);`,
        tips: [
            'Use StringBuilder for multiple concatenations',
            'Always validate user-provided strings',
            'Be careful with null values',
            'Use proper encoding for URLs'
        ]
    },
    oop: {
        title: 'Object-Oriented Programming',
        description: 'OOP is a programming paradigm based on objects that contain data and methods. It is fundamental to building maintainable and scalable backend applications.',
        importance: 'OOP in Backend',
        points: [
            'Model real-world entities (User, Product, Order)',
            'Organize code into logical units',
            'Enable code reuse through inheritance',
            'Encapsulate business logic'
        ],
        examples: `// Class and Object
public class User {
    private int id;
    private String name;
    private String email;
    
    // Constructor
    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }
    
    // Encapsulation
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        if (isValidEmail(email)) {
            this.email = email;
        }
    }
}

// Inheritance
public class Admin extends User {
    private String adminLevel;
    
    @Override
    public void performAction() {
        // Admin-specific implementation
    }
}

// Polymorphism
List<User> users = new ArrayList<>();
users.add(new User(1, "John"));
users.add(new Admin(2, "Jane"));`,
        tips: [
            'Use private fields with public getters/setters',
            'Favor composition over inheritance',
            'Follow SOLID principles',
            'Design for interfaces, not implementations'
        ]
    },
    interfaces: {
        title: 'Interfaces',
        description: 'Interfaces define contracts that classes must implement. Spring Framework heavily relies on interfaces for dependency injection and loose coupling.',
        importance: 'Why Interfaces Matter',
        points: [
            'Define service contracts',
            'Enable dependency injection',
            'Support multiple implementations',
            'Facilitate testing with mocks'
        ],
        examples: `// Service Interface
public interface UserService {
    User findById(int id);
    User save(User user);
    void delete(int id);
    List<User> findAll();
}

// Implementation
@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public User findById(int id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException());
    }
    
    // Other method implementations...
}

// Usage in Controller
@RestController
public class UserController {
    
    @Autowired
    private UserService userService; // Interface type
    
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable int id) {
        return userService.findById(id);
    }
}`,
        tips: [
            'Design interfaces before implementations',
            'Keep interfaces focused and cohesive',
            'Use interface types for dependencies',
            'Consider functional interfaces for lambdas'
        ]
    },
    abstract: {
        title: 'Abstract Classes',
        description: 'Abstract classes provide partial implementations and can have both abstract and concrete methods. They are useful for sharing common code among related classes.',
        importance: 'When to Use',
        points: [
            'Share common code among subclasses',
            'Define template methods',
            'Provide default implementations',
            'Model "is-a" relationships'
        ],
        examples: `// Abstract Payment Class
public abstract class Payment {
    protected double amount;
    protected String currency;
    
    // Concrete method
    public void validateAmount() {
        if (amount <= 0) {
            throw new IllegalArgumentException();
        }
    }
    
    // Abstract method
    public abstract void processPayment();
    
    // Template method
    public final void makePayment() {
        validateAmount();
        processPayment();
        sendConfirmation();
    }
    
    protected void sendConfirmation() {
        System.out.println("Payment confirmed");
    }
}

// Concrete Implementation
public class CreditCardPayment extends Payment {
    private String cardNumber;
    
    @Override
    public void processPayment() {
        // Credit card specific logic
        System.out.println("Processing credit card payment");
    }
}

public class PayPalPayment extends Payment {
    private String paypalEmail;
    
    @Override
    public void processPayment() {
        // PayPal specific logic
        System.out.println("Processing PayPal payment");
    }
}`,
        tips: [
            'Use when you have common behavior',
            'Cannot instantiate abstract classes',
            'Can have constructors and fields',
            'Choose interfaces for contracts, abstract classes for code reuse'
        ]
    },
    collections: {
        title: 'Collections Framework',
        description: 'The Collections Framework provides data structures for storing and manipulating groups of objects. Essential for backend development when working with lists of data.',
        importance: 'Backend Usage',
        points: [
            'Store and manage database results',
            'Process multiple API responses',
            'Implement caching mechanisms',
            'Handle batch operations'
        ],
        examples: `// List - Ordered collection
List<User> users = new ArrayList<>();
users.add(new User(1, "John"));
users.add(new User(2, "Jane"));

// Set - Unique elements
Set<String> uniqueEmails = new HashSet<>();
uniqueEmails.add("user@example.com");

// Map - Key-value pairs
Map<Integer, User> userMap = new HashMap<>();
userMap.put(1, new User(1, "John"));
User user = userMap.get(1);

// Common Operations
users.forEach(u -> System.out.println(u.getName()));
users.stream()
     .filter(u -> u.isActive())
     .sorted(Comparator.comparing(User::getName))
     .collect(Collectors.toList());

// Queue for background tasks
Queue<Task> taskQueue = new LinkedList<>();
taskQueue.offer(new Task("Send Email"));`,
        tips: [
            'Choose the right collection for your needs',
            'Use generics for type safety',
            'Consider thread-safe collections for concurrency',
            'Leverage Stream API for operations'
        ]
    },
    exceptions: {
        title: 'Exception Handling',
        description: 'Exception handling allows you to gracefully handle errors and unexpected situations. Critical for building robust backend applications that don\'t crash.',
        importance: 'Why It Matters',
        points: [
            'Prevent application crashes',
            'Provide meaningful error messages',
            'Handle database failures',
            'Manage API errors gracefully'
        ],
        examples: `// Try-Catch
try {
    User user = userService.findById(id);
    processUser(user);
} catch (UserNotFoundException e) {
    logger.error("User not found: " + id);
    throw new ResponseStatusException(
        HttpStatus.NOT_FOUND, "User not found"
    );
} catch (Exception e) {
    logger.error("Unexpected error", e);
    throw new InternalServerException();
} finally {
    // Cleanup code
    closeResources();
}

// Custom Exceptions
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(int id) {
        super("User not found with id: " + id);
    }
}

// Global Exception Handler
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(
        UserNotFoundException ex
    ) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}`,
        tips: [
            'Catch specific exceptions first',
            'Don\'t catch Exception unless necessary',
            'Always log exceptions',
            'Use custom exceptions for business logic'
        ]
    },
    java8: {
        title: 'Java 8 Features',
        description: 'Java 8 introduced powerful features like Lambda expressions and Stream API that make code more concise and functional. These are widely used in modern backend development.',
        importance: 'Why Learn Java 8',
        points: [
            'Write cleaner, more readable code',
            'Process collections efficiently',
            'Enable functional programming style',
            'Required by modern frameworks'
        ],
        examples: `// Lambda Expressions
// Before Java 8
List<User> activeUsers = new ArrayList<>();
for (User user : users) {
    if (user.isActive()) {
        activeUsers.add(user);
    }
}

// With Lambda
List<User> activeUsers = users.stream()
    .filter(user -> user.isActive())
    .collect(Collectors.toList());

// Stream Operations
users.stream()
    .filter(u -> u.getAge() >= 18)
    .map(User::getName)
    .sorted()
    .forEach(System.out::println);

// Method References
users.forEach(System.out::println);
List<String> names = users.stream()
    .map(User::getName)
    .collect(Collectors.toList());

// Optional
Optional<User> userOpt = userRepository.findById(id);
User user = userOpt.orElse(defaultUser);
String name = userOpt.map(User::getName).orElse("Unknown");

// Collectors
Map<Boolean, List<User>> partitioned = users.stream()
    .collect(Collectors.partitioningBy(User::isActive));

List<String> names = users.stream()
    .map(User::getName)
    .collect(Collectors.joining(", "));`,
        tips: [
            'Use Stream API for collection operations',
            'Prefer method references when possible',
            'Use Optional to avoid null checks',
            'Learn common collectors'
        ]
    }
};

function openModal(topicId) {
    const content = modalContent[topicId];
    
    if (!content) return;
    
    modalBody.innerHTML = `
        <h2 style="color: var(--primary-color); margin-bottom: 1rem;">${content.title}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.8;">${content.description}</p>
        
        <h3 style="color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center;">
            <span style="margin-right: 0.5rem;">🎯</span> ${content.importance}
        </h3>
        <ul style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 2;">
            ${content.points.map(point => `<li style="color: var(--text-secondary);">${point}</li>`).join('')}
        </ul>
        
        <h3 style="color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center;">
            <span style="margin-right: 0.5rem;">💻</span> Code Examples
        </h3>
        <div style="background: #1e293b; color: #e2e8f0; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; overflow-x: auto;">
            <pre style="margin: 0; font-family: 'Fira Code', monospace; line-height: 1.8; font-size: 0.9rem;"><code>${content.examples}</code></pre>
        </div>
        
        <h3 style="color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center;">
            <span style="margin-right: 0.5rem;">💡</span> Best Practices
        </h3>
        <ul style="padding-left: 1.5rem; line-height: 2;">
            ${content.tips.map(tip => `<li style="color: var(--text-secondary);">${tip}</li>`).join('')}
        </ul>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===========================
// INTERSECTION OBSERVER (Scroll Animations)
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.topic-card, .concept-card, .feature-card, .db-card, .security-card, .tool-card, .project-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ===========================
// PROGRESS BAR (Optional Enhancement)
// ===========================
window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    // You can add a progress bar element if desired
    // progressBar.style.width = progress + '%';
});

// ===========================
// THEME TOGGLE (Optional Enhancement)
// ===========================
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// ===========================
// SEARCH FUNCTIONALITY (Optional Enhancement)
// ===========================
function searchContent(query) {
    const allCards = document.querySelectorAll('.topic-card, .concept-card, .feature-card, .project-card');
    const searchQuery = query.toLowerCase();
    
    allCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===========================
// PRINT/EXPORT FUNCTIONALITY
// ===========================
function exportRoadmap() {
    window.print();
}

// ===========================
// COPY CODE FUNCTIONALITY
// ===========================
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('code-preview')) {
        const code = e.target.textContent;
        navigator.clipboard.writeText(code).then(() => {
            // Show tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Copied!';
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--accent-color);
                color: white;
                padding: 1rem 2rem;
                border-radius: 0.5rem;
                font-weight: 600;
                z-index: 9999;
                animation: fadeInUp 0.3s ease;
            `;
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    }
});

console.log('🚀 Java Backend Roadmap Website Loaded Successfully!');
console.log('📚 Ready to start your learning journey!');
