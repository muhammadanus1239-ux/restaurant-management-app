# Restaurant App MVP

## Software Requirements Specification (SRS)

**Version:** 1.0  
**Platform:** React Native  
**Semester:** Fall 2026  
**Scope:** Frontend Only

---

# 1. Introduction

## 1.1 Purpose

This Software Requirements Specification defines the requirements of the Restaurant App MVP. The application is designed for restaurant customers and restaurant managers. Customers can browse the menu, search for food, add items to a cart, reserve tables, place orders, and track order progress. Restaurant managers can manage incoming orders, reservations, and menu information.

The application is developed as a frontend-only React Native prototype using local mock data, React state management, React Hooks, and AsyncStorage. No backend server or external API is required.

## 1.2 Scope

### In Scope

The Restaurant App MVP will provide the following functionality:

1. Customer and Manager login and signup.
2. Mock authentication using local user data.
3. Restaurant menu browsing.
4. Menu categories including Starters, Mains, Desserts, and Drinks.
5. Daily Special menu items.
6. Search for menu items.
7. Menu sorting by price and name.
8. Display of unavailable menu items.
9. Add items to cart.
10. Increase and decrease cart quantities.
11. Add special instructions to cart items.
12. Apply and remove mock promo codes.
13. Calculate order subtotal, service charge, tax, discount, and grand total.
14. Table reservation.
15. Checking table availability.
16. Reservation cancellation.
17. Dine-in and Takeaway order options.
18. Order tracking with simulated status changes.
19. Customer profile.
20. Light and dark theme.
21. Manager dashboard.
22. Manager order status management.
23. Manager reservation management.
24. Manager menu management.
25. Local persistence using AsyncStorage.

### Out of Scope

The following features are not included in the frontend-only MVP:

1. Real online payment processing.
2. Real bank/card transactions.
3. Real backend server.
4. Real database.
5. Real user authentication service.
6. External food delivery APIs.
7. Real push notifications.
8. Real-time server communication.
9. GPS-based delivery tracking.
10. Restaurant POS integration.

## 1.3 Definitions and Acronyms

| Term         | Definition                                                                   |
| ------------ | ---------------------------------------------------------------------------- |
| SRS          | Software Requirements Specification                                          |
| MVP          | Minimum Viable Product                                                       |
| UML          | Unified Modeling Language                                                    |
| Hook         | React function used to work with state and other React features              |
| Context      | React feature used to share data between components                          |
| Reducer      | Pure function used to manage state transitions                               |
| Mock Data    | Local sample data used instead of a real backend                             |
| FlatList     | React Native component used to efficiently display lists                     |
| AsyncStorage | Local storage used to persist data on the device                             |
| React.memo   | React optimization technique used to reduce unnecessary component re-renders |

---

# 2. Overall Description

## 2.1 User Roles

| Role               | Key Permissions and Goals                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Customer           | Browse menu, search food, add items to cart, apply promo codes, reserve tables, place orders, track orders, view profile, and change theme |
| Restaurant Manager | View and update orders, manage reservations, add/edit menu items, change prices, and toggle item availability                              |

## 2.2 User Stories

### Customer User Stories

1. As a customer, I want to browse the restaurant menu, so that I can decide what I want to eat.
2. As a customer, I want to view daily specials, so that I can quickly find featured food items.
3. As a customer, I want to search for food by name, so that I can find an item quickly.
4. As a customer, I want to filter food by category, so that I can browse the menu easily.
5. As a customer, I want to see whether an item is available, so that I do not order unavailable food.
6. As a customer, I want to add food to my cart, so that I can prepare my order.
7. As a customer, I want to change item quantities, so that I can control how much food I order.
8. As a customer, I want to add special instructions, so that I can communicate preferences such as "no onions".
9. As a customer, I want to apply a promo code, so that I can receive a discount.
10. As a customer, I want to reserve a table, so that I can avoid waiting at the restaurant.
11. As a customer, I want to choose a suitable time slot, so that I can arrive at a convenient time.
12. As a customer, I want to track my order, so that I know its current status.

### Restaurant Manager User Stories

13. As a restaurant manager, I want to view incoming orders, so that I can manage food preparation.
14. As a restaurant manager, I want to change an order status, so that customers can see progress.
15. As a restaurant manager, I want to accept or decline reservations, so that I can manage restaurant tables.
16. As a restaurant manager, I want to add menu items, so that new dishes can be displayed.
17. As a restaurant manager, I want to edit menu prices, so that the displayed prices remain current.
18. As a restaurant manager, I want to toggle menu item availability, so that customers cannot order unavailable items.

---

# 3. Functional Requirements

## Authentication

**FR-01:** The system shall provide Login and Signup modes.

**FR-02:** The system shall validate the email address before authentication.

**FR-03:** The system shall require a password of at least eight characters containing at least one digit.

**FR-04:** The system shall authenticate users against the local mock users array.

**FR-05:** The system shall display an error message when authentication fails.

## Menu

**FR-06:** The system shall load at least fifteen menu items from local mock data.

**FR-07:** The system shall display menu categories including Starters, Mains, Desserts, and Drinks.

**FR-08:** The system shall display the name, description, price, image, availability, and special status of each menu item.

**FR-09:** The system shall display a Daily Special badge for special items.

**FR-10:** The system shall disable the Add to Cart button for unavailable items.

## Search

**FR-11:** The system shall provide a search input for finding menu items.

**FR-12:** The system shall apply search filtering after 400 milliseconds of typing inactivity.

**FR-13:** The system shall store the last five search terms.

**FR-14:** The system shall provide sorting by price low-to-high, price high-to-low, and name A-to-Z.

**FR-15:** The system shall display an empty-state message when no item matches the search.

## Cart

**FR-16:** The system shall allow available menu items to be added to the cart.

**FR-17:** The system shall allow customers to increase and decrease item quantities.

**FR-18:** The system shall remove an item when its quantity reaches zero.

**FR-19:** The system shall allow customers to add special instructions to each cart item.

**FR-20:** The system shall support local promo codes and display an error for invalid codes.

## Reservation

**FR-21:** The system shall provide hourly reservation slots from 12:00 to 22:00.

**FR-22:** The system shall disable a time slot when no suitable table is available.

**FR-23:** The system shall validate party size between 1 and 12 people.

**FR-24:** The system shall validate Pakistani mobile numbers using the format 03XX-XXXXXXX.

**FR-25:** The system shall show a confirmation before saving a reservation.

## Orders

**FR-26:** The system shall calculate subtotal, 5% service charge, 15% sales tax, promo discount, and grand total.

**FR-27:** The system shall allow the customer to select Dine-in or Takeaway.

**FR-28:** The system shall create an order containing an ID, items, total, type, status, and timestamp.

**FR-29:** The system shall simulate order status changes from Pending to Preparing, Ready, and Served.

**FR-30:** The system shall display order progress and elapsed time.

## Manager Dashboard

**FR-31:** The system shall display the Manager Dashboard only to users with the manager role.

**FR-32:** The system shall provide Incoming Orders, Reservations, and Menu Management sections.

**FR-33:** The system shall allow managers to manually update order status.

**FR-34:** The system shall allow managers to accept or decline reservations.

**FR-35:** The system shall allow managers to add menu items.

**FR-36:** The system shall allow managers to edit menu prices and item availability.

**FR-37:** The system shall save orders, reservations, and menu changes using local storage.

---

# 4. Non-Functional Requirements

## 4.1 Usability

The system shall provide clear buttons, readable text, understandable error messages, and simple navigation. Important customer actions shall be easy to locate.

## 4.2 Performance

The menu shall use FlatList for efficient scrolling. Search shall use debouncing to avoid unnecessary filtering operations. Loading indicators shall be displayed while simulated data is being loaded.

## 4.3 Responsiveness

The interface shall work correctly on different common mobile screen sizes without important content being clipped or overlapping.

## 4.4 Maintainability

The application shall use separate folders for components, screens, context, reducers, hooks, data, and navigation. Reusable UI components shall be separated from screen-level code.

## 4.5 Data Handling

The application shall not use a backend or external API. Mock data shall be stored in local JavaScript files. Runtime state shall be managed using React Hooks and Context, while required persistent data shall use AsyncStorage.

## 4.6 Reliability

Timers and asynchronous effects shall include cleanup functions to prevent updates after a screen has been unmounted.

---

# 5. Client-Side Data Model

| Data Set     | Fields                                                                | Description                        |
| ------------ | --------------------------------------------------------------------- | ---------------------------------- |
| Users        | id, fullName, email, password, role                                   | Mock customer and manager accounts |
| Categories   | id, name                                                              | Restaurant menu categories         |
| MenuItems    | id, name, description, price, category, image, isSpecial, isAvailable | Food and drink records             |
| Tables       | id, tableNumber, seats, isAvailable                                   | Restaurant tables                  |
| Reservations | id, userId, date, time, partySize, tableId, phone, status             | Customer reservations              |
| Orders       | id, userId, items, total, type, status, timestamp                     | Customer orders                    |
| Cart         | items, promoCode, discountPercent                                     | Current customer's cart            |

---

# 6. UML Diagrams

The following UML diagrams will be added after Question 2:

1. Use Case Diagram
2. Class Diagram
3. Sequence Diagram
4. State Machine Diagram
5. Component Diagram

Each diagram will be stored in the `A1/UML` folder.

---

# 7. MVP Frontend Development

## 7.1 Login and Signup Screen

**Purpose:** Authenticate customers and managers.

**UI Elements:** Email input, password input, full name input, confirm password, role selector, validation messages, password visibility button, login/signup button, and loading indicator.

**Local Data:** Users mock data.

**Hooks:** useState.

## 7.2 Menu Browsing Screen

**Purpose:** Display restaurant menu items.

**UI Elements:** Search bar, category chips, menu cards, Daily Special badge, Add to Cart button, loading indicator, error message, Retry button, and pull-to-refresh.

**Local Data:** Categories and MenuItems.

**Hooks:** useState and useEffect.

## 7.3 Search and Scroll Controls

**Purpose:** Allow fast menu searching and list navigation.

**UI Elements:** Search input, clear button, recent search suggestions, and Back to Top button.

**Hooks:** useRef and useState.

## 7.4 Profile and Theme Screen

**Purpose:** Display user information and change application theme.

**UI Elements:** Name, email, role, theme switch, and logout button.

**Hooks:** useContext.

## 7.5 Cart Screen

**Purpose:** Review and modify selected food items.

**UI Elements:** Cart items, quantity controls, remove button, special instructions, promo code field, and item count.

**Hooks:** useReducer and useContext.

## 7.6 Order Summary Screen

**Purpose:** Display final order charges before placing the order.

**UI Elements:** Items, subtotal, service charge, tax, discount, and grand total.

**Hooks:** useMemo and useCallback.

## 7.7 Table Reservation Screen

**Purpose:** Allow customers to reserve and cancel tables.

**UI Elements:** Date selection, time slots, party size, contact details, available tables, confirmation modal, and reservation list.

**Hooks:** useReservation, useForm, and useDebounce.

## 7.8 Order Tracking and Manager Dashboard

**Purpose:** Track customer orders and provide manager controls.

**Customer UI:** Order status, progress indicator, elapsed time, and order information.

**Manager UI:** Incoming Orders, Reservations, and Menu Management tabs.

**Hooks:** useEffect, useReducer, useContext, useMemo, and custom hooks.

---

# 8. Frontend Constraints

This MVP is a frontend-only prototype. It does not provide real payment processing, real authentication, a remote database, or server-side validation. All restaurant operations are simulated using local mock data, React state management, and AsyncStorage.
