# OrangeHRM Automation Testing (Cypress + TypeScript)

End-to-End (E2E) automation project for the **OrangeHRM** web application using **Cypress** and **TypeScript**, built with the **Page Object Model (POM)** design pattern to keep tests clean, maintainable, and scalable.

---

## ✨ What’s Inside

- ✅ **Cypress + TypeScript** E2E tests
- 🧱 **Page Object Model (POM)** to separate *test logic* from *page locators & actions*
- 🔁 Reusable utilities & custom commands
- 🔐 Environment-based configuration (no hardcoded secrets)
- 🤖 CI-friendly headless execution

---

## 🧠 Page Object Model (POM)

This project follows the **POM design pattern**, where each application page (or major component) is represented by a class/module containing:
- **Selectors / Locators**
- **Page actions** (e.g., `login()`, `searchEmployee()`, `addUser()`)

### Why POM?
- **Less duplication** across tests
- **Easier maintenance** when UI changes
- **More readable tests** that focus on behavior, not selectors

---

## 🛠 Tech Stack

- **Cypress** – E2E testing framework  
- **TypeScript** – Strong typing & better developer experience  
- **Node.js / npm** – Runtime & dependency management  
