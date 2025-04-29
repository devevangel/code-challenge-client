# Product Catalog Dashboard (Client Side)

## Introduction

This project is part of a coding challenge that tasked me with building a **Product Catalog Dashboard** using **Angular 17+**. Users can view, search, filter, create, edit, and delete products. It also includes a comparative bar chart feature for visualizing product sales.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [High-Level Design Decisions](#high-level-design-decisions)
- [Potential Improvements](#potential-improvements)
- [How It Was Built](#how-it-was-built)
- [Technology Stack](#technology-stack)

---

## Project Overview

### Functional Requirements Implemented

- **View Products** in a dynamic, responsive table.
- **Search Products by Name** dynamically.
- **Filter Products** by Unit Cost and Total Sales with clear UI feedback.
- **Create New Products** with full validation.
- **Edit Existing Products** with real-time updates.
- **Delete Products** with confirmation modal.
- **Comparative Bar Chart** to visualize a product's sales compared to others.
- **Error Handling** and **Loading Indicators** implemented throughout.

---

## Setup Instructions

### Pre-Requisites

- Install Node.js v18+.
- Ensure the **backend server** (Node.js API) is installed and running locally (`http://localhost:8080`).

### Running the Client

1. Clone the repository:

```bash
git clone https://github.com/devevangel/code-challenge-client.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the Angular development server:

```bash
npm run start
```

4. Open your browser at:

```bash
http://localhost:4200
```

## High-Level Design Decisions

### Component-Based Architecture

The app is broken down into small, reusable components:

- `ProductsTableComponent`
- `ProductRowComponent`
- `EditProductFormComponent`
- `CreateProductFormComponent`
- `DeletePopupModalComponent`
- `GraphModalComponent`
- `SearchFilterComponent`

### Service-Driven Data Access

A dedicated `ProductService` handles all API requests, keeping components clean and focused purely on the UI.

### Error and Loading Management

Users receive immediate feedback through spinners and error messages during loading or when operations fail.

### Minimalistic UI/UX

TailwindCSS was used to build a clean, responsive design while keeping the user interface minimal and uncluttered.

### Testing

Basic unit tests were written for the `SearchFilterComponent` to demonstrate Angular testing skills and the ability to structure tests properly.

---

## Potential Improvements

If given more time, I would:

- Implement **Pagination** and **Column Sorting** for better scalability.
- Write **comprehensive unit and integration tests** for all major components.
- Introduce **Global State Management** using **NgRx** for better state handling.
- Improve **Error Boundary Handling** across all parts of the app.
- Enhance **UI responsiveness and accessibility** (a11y improvements) for wider browser and device support.

---

## How It Was Built

### Breaking Down the Project

Every feature was broken down into focused, standalone components to improve reusability, scalability, and flexibility.

### Best Practices Followed

- Followed Angular 17+ best practices
- Utilized standalone components
- Proper dependency injection
- Modular service-based architecture
- Reactive forms for better validation and control

### Clean and Maintainable Code

Code was written to be organized, modular, and easy to extend. Clear separation of concerns between UI components, services, and models.

### Use of AI Assistance

AI tools were used strategically to:

- Debug complex Angular and TypeScript errors faster
- Draft documentation and improve README structure
- Speed up repetitive coding and formatting tasks

---

## Technology Stack

- **Frontend:** Angular 17, TailwindCSS, ng2-charts (Chart.js wrapper)
- **Backend:** Node.js, Express.js, LowDB (Mock Database)
- **Testing:** Jasmine, Karma
