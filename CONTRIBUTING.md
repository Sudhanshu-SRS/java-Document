# Contributing Guidelines

## 📋 Getting Your Assignment

### Step 1: Check Your Assignment

1. Look at the main [README.md](README.md) assignment table
2. Find your name and assigned topic
3. Note the due date and any special requirements

### Step 2: Create Your Work Branch

```bash
git checkout -b docs/your-topic-name
# Example: git checkout -b docs/spring-boot-fundamentals
```

### Step 3: Set Up Your Topic Folder

```bash
mkdir -p docs/[category]/[your-topic]
cd docs/[category]/[your-topic]
```

## 📝 Documentation Template

Use this template for each topic:

````markdown
# [Topic Name]

## 📖 Overview

Brief description of the topic (2-3 sentences)

## 🎯 Learning Objectives

After reading this documentation, you will be able to:

- Objective 1
- Objective 2
- Objective 3

## ⚡ Prerequisites

- What concepts should readers understand first
- Required software/tools
- Assumed knowledge level

## 🔑 Key Concepts

### Concept 1

Explanation with examples

### Concept 2

Explanation with examples

## 💻 Code Examples

### Basic Example

```java
// Well-commented code example
public class Example {
    // Explanation of what this does
    public void demonstrateFeature() {
        // Step-by-step implementation
    }
}
```
````

### Advanced Example

```java
// More complex example with real-world application
```

## ✅ Best Practices

1. Do this...
2. Always remember to...
3. Consider this approach...

## ❌ Common Pitfalls

1. Don't do this because...
2. Avoid this pattern...
3. Watch out for...

## 🔧 Hands-On Exercise

Step-by-step exercise for readers to practice

## 📚 Further Reading

- [Link 1](url) - Description
- [Link 2](url) - Description
- [Official Documentation](url)

## 🏷️ Tags

#java #[your-topic] #[category]

---

**Author**: [Your Name]  
**Last Updated**: [Date]  
**Reviewed By**: [Reviewer Names]



## 🎨 Formatting Standards

### Code Blocks
- Always specify the language for syntax highlighting
- Include comments explaining complex parts
- Use realistic examples, not just "foo" and "bar"

### Headings
- Use descriptive headings
- Follow the hierarchy (H1 → H2 → H3)
- Don't skip heading levels

### Links
- Use descriptive link text
- Verify all links work
- Prefer official documentation when available

## 🔄 Review Process

### Before Submitting PR:
- [ ] Spell check your content
- [ ] Test all code examples
- [ ] Verify all links work
- [ ] Follow the template structure
- [ ] Add proper tags and metadata

### PR Requirements:
1. **Title Format**: `Add documentation: [Topic Name]`
2. **Description**: Explain what you've documented
3. **Reviewers**: Add at least 2 team members
4. **Labels**: Add appropriate labels (documentation, your-topic)

### Review Checklist:
- [ ] Content is accurate and up-to-date
- [ ] Examples are working and well-explained
- [ ] Writing is clear and easy to understand
- [ ] Follows the style guide
- [ ] Includes practical exercises

## 📊 Progress Updates

### Weekly Stand-up Format:
- What documentation did you complete this week?
- What are you working on now?
- Any blockers or help needed?
- Timeline update for your topic

### Status Updates:
Update your status in the main README assignment table:
- ⏳ **Pending** → 🔄 **In Progress** (when you start)
- 🔄 **In Progress** → 👀 **Review** (when PR is created)
- 👀 **Review** → ✅ **Complete** (when merged)

## 🤝 Collaboration Tips

### Getting Help:
1. Create an issue with your question
2. Tag relevant team members
3. Use descriptive titles: "Question: How to document Spring Security authentication?"

### Helping Others:
1. Review open PRs regularly
2. Provide constructive feedback
3. Share useful resources in team discussions

### Knowledge Sharing:
- Share interesting articles or tutorials
- Discuss challenges in team meetings
- Help teammates with their topics when possible

## 🎯 Quality Standards

### Content Quality:
- **Accurate**: Information must be correct and current
- **Complete**: Cover all important aspects of the topic
- **Clear**: Write for someone learning the topic
- **Practical**: Include real-world examples and use cases

### Code Quality:
- **Working**: All code examples must compile and run
- **Commented**: Explain what the code does
- **Realistic**: Use meaningful variable names and scenarios
- **Progressive**: Start simple, build complexity gradually

## 📅 Timeline Management

### Milestones:
- **Week 1**: Topic assignment and initial research
- **Week 2**: First draft and basic examples
- **Week 3**: Review and refinement
- **Week 4**: Final submission and peer review

### Extensions:
If you need more time:
1. Communicate early with the team lead
2. Explain the challenges you're facing
3. Ask for help or resources
4. Update the assignment table with new timeline

## 🎉 Recognition

### Completion Rewards:
- Name credited in the documentation
- Recognition in team meetings
- Contribution to team knowledge base
- Learning experience for career growth

Remember: We're building this together! Every contribution makes our team stronger and more knowledgeable. 🚀
```
