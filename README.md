# Employee Management Full-Stack Application

This is a complete MERN-stack application designed for managing employee records. It features a RESTful API backend built with Node.js, Express, and MongoDB, and a responsive, modern frontend built with React and Vite.

## Features

- **Full CRUD Functionality**: Create, Read, Update, and Delete employee records.
- **Image Uploads**: Supports uploading employee photos, which are hosted on Cloudinary.
- **Modern Frontend**: A clean, responsive, and user-friendly interface built with React and Vite.
- **Robust State Management**: Uses React's Context API to manage application state globally.
- **Form Validation**: Client-side validation to ensure data integrity.
- **User-Friendly Notifications**: Interactive toast notifications for all major actions.
- **Confirmation Modals**: A modern modal for confirming destructive actions like deletions.
- **Scalable Backend**: A well-structured backend with a service-oriented architecture.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (with Mongoose), Cloudinary
- **Frontend**: React, Vite, SCSS, Axios, Lucide React Icons
- **Environment**: `dotenv`, `cors`

---

## Backend (Node.js & Express)

The backend provides a RESTful API for managing employee data.

### Getting Started

#### **1. Prerequisites**

- Node.js (v18.x or higher)
- npm
- MongoDB (local instance or a cloud service like MongoDB Atlas)
- A Cloudinary account for image hosting

#### **2. Installation**

1.  Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2.  Install the required npm packages:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the `backend` directory and add the following environment variables. Replace the placeholder values with your actual credentials.

    ```env
    # Server Configuration
    PORT=8000
    CORS_ORIGIN=http://localhost:5173

    # MongoDB Connection
    MONGODB_URI=your_mongodb_connection_string

    # Cloudinary Configuration
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

#### **3. Running the Server**

To start the development server, run the following command from the `backend` directory:

```bash
npm start
```

The API server will be running at `http://localhost:8000`.

### API Endpoints

All endpoints are prefixed with `/api/v1/employees`.

| Method   | Endpoint | Description                              |
| :------- | :------- | :--------------------------------------- |
| `POST`   | `/`      | Creates a new employee record.           |
| `GET`    | `/`      | Retrieves a list of all employees.       |
| `GET`    | `/:id`   | Retrieves a single employee by their ID. |
| `PATCH`  | `/:id`   | Updates an existing employee's details.  |
| `DELETE` | `/:id`   | Deletes an employee record by their ID.  |

---

## Frontend (React & Vite)

### Getting Started

#### **1. Prerequisites**

- Node.js (v18.x or higher)
- npm

#### **2. Installation**

1.  Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2.  Install the required npm packages:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the `frontend` directory and add the following variable to point to your backend API:

    ```env
    VITE_API_BASE_URL=http://localhost:8000/api/v1
    ```

#### **3. Running the Client**

To start the React development server, run the following command from the `frontend` directory:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.
