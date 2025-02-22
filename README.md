 
# TaskFlow: A Task Management Application

TaskFlow allows users to manage their tasks efficiently with features like task creation, editing, deletion, and reordering using a drag-and-drop interface. Tasks are categorized into **To-Do**, **In Progress**, and **Done** sections. The app is fully responsive and uses Firebase Authentication for secure login and MongoDB for task persistence with real-time updates.

🚀 Live Demo: [TaskFlow](https://magenta-kringle-ff0f94.netlify.app/)

---

## 📖 Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Live Demo](#live-demo)
---

## ✨ Features

- 📝 **Task Management**: Create, edit, and delete tasks seamlessly.
- 🔄 **Drag-and-Drop**: Tasks can be moved between categories and reordered with a smooth drag-and-drop feature.
- 📢 **Real-time Updates**: Keep tasks in sync across devices.
- 🎨 **Modern UI/UX**: Beautifully designed with Tailwind CSS .
- 🔔 **Notifications**: Get real-time updates with SweetAlert2 and react-toastify.
- 🔒 **Authentication**: Firebase Authentication (Google sign-in) for secure user access.
- 📊 **Task Categories**: Manage tasks across three categories:
  - ✅ **To-Do**
  - ⏳ **In Progress**
  - ✅ **Done**
- 📱 **Responsive Design**: The application is fully optimized for both desktop and mobile devices.

---

## 🛠️ Technologies Stack

- 🖥️ **Frontend:**
  - ⚛️ **React**: JavaScript library for building user interfaces.
  - 📦 **Vite.js**: A modern build tool that provides fast development and production builds.
  - 🧩 **React Router**: For handling navigation and routing within the app.
  - 🌀 **React Query**: For managing and caching API requests.
  - 🎨 **Tailwind CSS**: Utility-first CSS framework for building custom designs quickly.
  - 🔄 **hello-pangea-dnd**: A drag-and-drop library for React for smooth task reordering.

- 🔧 **Backend:**
  - 🖥️ **Node.js**: JavaScript runtime for building the backend API.
  - 🚀 **Express.js**: Web application framework for Node.js to handle routing and server-side logic.
  - 🗃️ **MongoDB**: NoSQL database for storing tasks and user data.
 

- 🔐 **Authentication & Security:**
  - 🔑 **Firebase Authentication**: For secure user authentication using Google Sign-In.
  
  
- 🔔 **Notifications:**
  - 📨 **SweetAlert2**: For beautiful, customizable alerts.
  - 📲 **React Toastify**: For displaying non-intrusive toast notifications.

- 🛠️ **Development Tools:**
  - 🧑‍💻 **VS Code**: Integrated development environment (IDE) used for writing code.
  - 🌐 **Git**: Version control system for managing source code.
  - 💻 **ESLint**: Linter for identifying and fixing problems in JavaScript/React code.
  - 🧹 **Prettier**: Code formatter for maintaining consistent code style.

- 🌐 **Deployment:**
  - 📦 **Netlify & Firebase**: For deploying the frontend React app.
  - 🌍 **Vercel**: For hosting the backend Express.js API and MongoDB database.

---


## 🛠 Installation

### Prerequisites
Before installing and running the project, ensure you have the following installed:
- **Node.js** (v16 or later) – [Download](https://nodejs.org/)
- **NPM** or **Yarn** – Comes with Node.js installation
- **MongoDB Database** 
- **Firebase Account** – For authentication and storage

### Steps
1. **Clone the repository**

```sh
# Clone the repository
git clone https://github.com/Soraiya11-7/Task-Management-Client

# Navigate to the project directory
cd Task-Management-Client
```
2. **Install dependencies**

```sh
npm install
```
3. **Set up environment variables** (see `.env.local.example` below)

4. **Run the development server**

```sh
npm run dev
```


---

## ⚙️ Configuration (.env.local, .env)

📌 **Create a `.env.local` file** (Frontend) in the root of the project and add the following:

```env
# Firebase Configuration
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id

```

📌 **Create a `.env` file** (Backend) in the root of the project and add the following:

```env
# MongoDB Configuration
DB_USER=your_mongo_db_user
DB_PASS=your_mongo_db_password

```
🔹 Replace `your_value_here` with your actual credentials.

🚨 Important: Never expose your .env.local file in public repositories. Use .gitignore to keep it secure.

---

## 📦 Dependencies
### 📌 Main Dependencies
- `react`: JavaScript library for building user interfaces.
- `react-router-dom`: Declarative routing for React.
- `@hello-pangea/dnd`: Drag-and-drop functionality.
- `axios`: Promise-based HTTP client for the browser and Node.js.
- `firebase`: Firebase SDK for user authentication.
- `sweetalert2`: – Beautiful alerts
- `react-toastify`: Notification system for React.
- `tailwindcss`: Utility-first CSS framework for rapid UI development.

### 📌 Development Dependencies  
- `eslint`: Linter for identifying and reporting on patterns in JavaScript.
- `vite`: Next-generation, fast build tool for modern web projects.
- `@vitejs/plugin-react`: Official React plugin for Vite.
- `eslint-plugin-react`: Linting rules for React.

---


## 🌍 Live Demo & Repository

### 🚀 Live URL

  - Netlify: [TaskFlow](https://magenta-kringle-ff0f94.netlify.app/)

  - Firebase: [Live Link 1](https://task-management-6ad1c.web.app/) OR 
          [Live Link 2](https://task-management-6ad1c.firebaseapp.com/)

🔗 GitHub Repository: [Client Link](https://github.com/Soraiya11-7/Task-Management-Client) and [Server Link](https://github.com/Soraiya11-7/Task-management-sever)

---

🚀 **TaskFlow** – Streamline your productivity with TaskFlow! 📝Organize your tasks, collaborate with ease, and stay on top of your goals with a seamless task management experience. 
