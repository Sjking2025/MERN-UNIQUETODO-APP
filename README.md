# 🚀 MERN Todo App with Mood Tracker 🚀

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>


This is a full-stack MERN application that combines a classic todo list with a mood tracker. It allows users to manage their tasks, track their moods over time, and visualize their mood history.

## ✨ Features

*   🔐 **User Authentication:** Secure user registration and login using JWT.
*   📝 **Task Management:** Create, read, update, and delete tasks.
*   👋 **Drag-and-Drop:** Organize tasks with a beautiful drag-and-drop interface.
*   😊 **Mood Tracking:** Track your mood daily.
*   📊 **Mood Visualization:** View your mood history with an interactive chart.
*   📱 **Responsive Design:** A clean and modern UI that works on all devices.

## 🛠️ Technologies Used

### 💻 Frontend

*   [React](https://reactjs.org/)
*   [Vite](https://vitejs.dev/)
*   [React Router](https://reactrouter.com/)
*   [Axios](https://axios-http.com/)
*   [Chart.js](https://www.chartjs.org/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [Bootstrap](https://getbootstrap.com/)
*   [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)

### ⚙️ Backend

*   [Node.js](https://nodejs.org/)
*   [Express](https://expressjs.com/)
*   [MongoDB](https://www.mongodb.com/)
*   [Mongoose](https://mongoosejs.com/)
*   [JWT](https://jwt.io/)
*   [bcryptjs](https://www.npmjs.com/package/bcryptjs)

## 🚀 Getting Started

### ✅ Prerequisites

*   Node.js (v14 or later)
*   MongoDB

### 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Sjking2025/MERN-UNIQUETODO-APP.git
    cd your-repo-name
    ```

2.  **Backend Setup:**

    ```bash
    cd todo-backend
    npm install
    ```

    Create a `.env` file in the `todo-backend` directory and add the following:

    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

3.  **Frontend Setup:**

    ```bash
    cd ../todo-frontend
    npm install
    ```

### ▶️ Running the Application

1.  **Start the backend server:**

    ```bash
    cd todo-backend
    npm start
    ```

2.  **Start the frontend development server:**

    ```bash
    cd ../todo-frontend
    npm run dev
    ```

    Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## API Endpoints

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| `POST` | `/api/auth/register` | Register a new user        |
| `POST` | `/api/auth/login`    | Log in a user              |
| `GET`  | `/api/tasks`         | Get all tasks for the user |
| `POST` | `/api/tasks`         | Add a new task             |
| `PUT`  | `/api/tasks/:id`     | Update a task              |
| `DELETE`| `/api/tasks/:id`     | Delete a task              |
| `GET`  | `/api/moods`         | Get the user's mood history |
| `POST` | `/api/moods`         | Track the current mood     |

## 📸 Screenshots

*You can add screenshots of your application here.*

*   **Login Page**
*   **Dashboard with Tasks and Mood Tracker**
*   **Mood History Chart**

## 🙌 Contributing

Contributions are welcome! Please feel free to submit a pull request.

