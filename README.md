Start the application:
npm run dev


# Lead Management App

## Overview

The **Lead Management App** is a web-based application designed to collect and manage leads for individuals seeking information on immigration services. Users can fill out a form, providing their personal information, visa preferences, and other relevant details, which the system then stores for further processing. The app leverages client-side storage and a context-based approach for managing authentication and state.

## Architecture

The application is built using the following technologies:

- **Frontend Framework**: React.js
- **Component Library**: Material UI (MUI)
- **State Management**: React Context API
- **Form Handling**: react-hook-form
- **Storage**: Browser's localStorage
- **Deployment**: (Specify if deployed, e.g., AWS S3, Vercel, etc.)

### Directory Structure

The project is organized as follows:

lead-management-app/
│
├── app/
│   ├── components/          # Reusable UI components (e.g., AppHeader.js)
│   ├── context/             # Contexts for app-wide state (e.g., AuthContext.js, LeadsContext.js)
│   ├── internal/            # Internal pages and business logic (e.g., leads, login)
│   │   ├── leads/
│   │   └── login/
│   ├── public-form/         # Public-facing components and form
│   └── thank-you/           # Thank you page after form submission
│
├── fonts/                   # Custom fonts if used
├── public/                  # Public assets like images, favicon, etc.
├── styles/                  # Global styles if any
├── .gitignore
├── README.md                # Documentation file
├── package.json             # Project dependencies and scripts
└── yarn.lock or package-lock.json # Dependency lock file



## User Flows

### 1. Authentication Flow

- **Purpose**: Manage user login and logout.
- **Components**: `AuthContext`, `AuthProvider`, `useAuth`
- **State Persistence**: Auth state is saved using `localStorage`.
- **Flow**:
  - On login, `AuthProvider` saves the authentication state to `localStorage` and updates the context.
  - On logout, `AuthProvider` clears the state from `localStorage`.
  - Authentication status is globally available across the app through `useAuth`.

### 2. Lead Form Submission Flow

- **Purpose**: Collect user data for lead generation.
- **Components**: `PublicLeadForm`, `useLeads`, `react-hook-form`
- **Data Collected**:
  - First Name
  - Last Name
  - Email
  - Country of Citizenship
  - LinkedIn / Personal Website URL
  - Visa Preferences
  - Resume Upload
  - Open Text Area for additional information
- **Form Handling**:
  - `react-hook-form` manages form state and validation.
  - Data is submitted, validated, and passed to the lead management context (`useLeads`).
  - The `PublicLeadForm` component provides functionality to add random test data for quicker submission during testing.

### 3. Context and State Management

#### `AuthContext` (`app/context/AuthContext.js`)

- **Purpose**: Manage authentication state across the application.
- **State Variables**:
  - `isAuthenticatedAlma`: Boolean to check if the user is logged in.
  - Methods: `login()`, `logout()`
- **Persistent Storage**: State saved in `localStorage`.

#### `LeadsContext` (`app/context/LeadsContext.js`)

- **Purpose**: Store lead information and manage CRUD operations.
- **State Variables**:
  - `leads`: Array to store leads information.
  - Methods: `addLead()`, `removeLead()`, `updateLead()`
- **Data Source**: Leads are managed on the client side (useful for testing purposes).

### 4. Form Field Validation

- **Library**: `react-hook-form`
- **Validation**:
  - Required fields: `firstName`, `lastName`, `email`, `country`, `openText`
  - Custom rules can be added to enhance the user input quality.

## Component Overview

### 1. App Header (`components/AppHeader.js`)

- **Purpose**: Provide a consistent header across different views in the application.
- **Details**: Contains navigation, branding, and possible user actions (like logout).

### 2. Public Lead Form (`public-form/page.js`)

- **Purpose**: The main form users interact with to submit their information.
- **Details**:
  - Form fields are built using MUI's `TextField`, `Select`, `Checkbox`, etc.
  - Handles form submission and redirects users to a 'Thank You' page after successful submission.

### 3. Lead Submission Review (`internal/leads/page.js`)

- **Purpose**: Interface for administrators to review and manage incoming leads.
- **Details**: Allows administrators to update, delete, or approve leads from within the app.

## Environment Setup

### Prerequisites

- **Node.js** >= 14.x
- **npm** or **yarn**

### Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lead-management-app
install dependencies:

bash

npm install
# or
yarn install

Start the application:

bash

npm run dev
# or
yarn dev

Deployment

    Build: Use npm run build or yarn build to create an optimized production build.
    Deploy: The project can be deployed on various platforms such as AWS, Vercel, Netlify, etc.

Design Considerations
User Interface

    Material UI: For consistent design and easy-to-use components.
    Responsive Layout: Design ensures smooth performance across desktop, tablet, and mobile devices.
    Accessibility: Use of aria attributes for better accessibility.

Security

    Data Storage: Limited use of localStorage for authentication state.
    User Data Protection: Data is managed locally, and no sensitive information is stored without user consent.

Performance

    Lazy Loading: Components and data are loaded only when necessary.
    Efficient State Management: React's Context API efficiently manages state without introducing unnecessary complexity.

Future Enhancements

    Backend Integration: Extend the current client-only system to integrate with a backend service for lead storage.
    User Authentication: More robust user authentication system (e.g., OAuth, JWT-based).
    Role Management: Different roles (admin, user) to enhance application capabilities.
    Enhanced Input Validation: Server-side validation to ensure consistency.
