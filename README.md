# Expo-books-app

A React Native application built with Expo for managing and reading books, with a Node.js backend server.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Backend Server](#backend-server)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Expo-books-app is a mobile application developed using React Native and Expo. It allows users to manage their book collection, track reading progress, and discover new books. The app is powered by a Node.js backend server.

## Features

- User authentication (sign up, log in, log out)
- Add, edit, and delete books from the collection
- Track reading progress
- View book details and descriptions
- Search for books
- Responsive design for various screen sizes

## Installation

### Frontend

Follow these steps to set up the project on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/expo-books-app.git
   cd expo-books-app
   ```

2. **Install dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed.

   ```bash
   yarn install
   ```

3. **Set up Expo CLI:**

   If you don't have Expo CLI installed, install it globally:

   ```bash
   npm install -g expo-cli
   ```

4. **Start the development server:**

   ```bash
   expo start
   ```

### Backend

Navigate to the `expo-books-server` directory and follow these steps:

1. **Install dependencies:**

   ```bash
   cd expo-books-server
   yarn install
   ```

2. **Configure environment variables:**

   Create a `.env` file in the `expo-books-server` directory and add your database configuration and other environment variables.

   ```env
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   ```

3. **Run database migrations:**

   Ensure your database is set up with the provided SQL file `expo_books_2024-05-31.sql`.

   ```bash
   # Assuming you are using a MySQL database
   mysql -u your_database_user -p your_database_name < expo_books_2024-05-31.sql
   ```

4. **Start the backend server:**

   ```bash
   yarn start
   ```

## Usage

Once the development server is running, you can use the Expo Go app on your mobile device to scan the QR code displayed in the terminal or browser. This will load the app on your device.

Alternatively, you can use an Android or iOS emulator to run the app.

## Project Structure

### Frontend (`expo-books-app`)

```
expo-books-app/
├── assets/                 # Static assets (images, fonts, etc.)
├── pages/                  # React components for different pages/screens
├── redux/                  # Redux configuration and slices
│   ├── actions/            # Redux action creators
│   ├── reducers/           # Redux reducers
│   └── store.js            # Redux store configuration
├── routes/                 # Navigation configuration
├── utils/                  # Utility functions
├── App.js                  # Entry point of the application
├── app.json                # Expo configuration
├── babel.config.js         # Babel configuration
├── package.json            # Project metadata and dependencies
└── yarn.lock               # Yarn lockfile
```

### Backend (`expo-books-server`)

```
expo-books-server/
├── config/                 # Configuration files
│   └── db.js               # Database connection configuration
├── controllers/            # Route handlers
├── middlewares/            # Custom middleware
├── models/                 # Database models
├── routes/                 # Express routes
├── services/               # Business logic and services
├── app.js                  # Express app setup
├── server.js               # Entry point for the backend server
├── package.json            # Project metadata and dependencies
└── yarn.lock               # Yarn lockfile
```

## Backend Server

The backend server is built with Node.js and Express, and it connects to a MySQL database. It handles user authentication, book management, and other business logic.

### Key Files and Directories

- **`config/db.js`**: Contains the database connection configuration.
- **`controllers/`**: Includes route handlers for different endpoints.
- **`middlewares/`**: Custom middleware functions, such as authentication checks.
- **`models/`**: Defines the database models using an ORM (e.g., Sequelize).
- **`routes/`**: Defines the API routes and connects them to controllers.
- **`services/`**: Contains the business logic and services that interact with the models and controllers.
- **`app.js`**: Sets up the Express app, middleware, and routes.
- **`server.js`**: Starts the backend server.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with a clear message.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

Please ensure your code follows the project's coding standards and passes all tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
