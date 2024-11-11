# Fitness Tracker - Backend

This repository contains the backend code for the **Fitness Tracker** application, which includes the API for user management, fitness goals, workouts, and nutrition tracking.

## Project Overview

The backend provides RESTful APIs for:
- User authentication (registration and login) using JWT and bcrypt.
- Fitness goal management.
- Workout and nutrition tracking.
- Insights into fitness progress.

## Tech Stack

- **Backend Framework**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token), bcrypt for password hashing
- **Deployment**: Render

## Installation and Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/project-name-backend.git
    cd project-name-backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**:
    Create a `.env` file in the root directory with the following variables:
    ```plaintext
    MONGODB_URI=mongodb://localhost:27017/fitness_tracker
    PORT=5000
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**:
    ```bash
    npm start
    ```

    The backend server will start on `http://localhost:5000` (or another port if specified).

## Deployment on Render

1. **Push to GitHub**:
    Ensure all changes are pushed to your backend GitHub repository.

2. **Render Deployment**:
    - Go to [Render](https://www.render.com/) and log in.
    - Select "New Web Service" and connect your GitHub repository.
    - Set up your Render deployment:
        - **Environment**: Node
        - **Build Command**: `npm install`
        - **Start Command**: `npm start`
        - **Environment Variables**: Add `MONGODB_URI`, `PORT`, and `JWT_SECRET` in Render settings.
    
3. **Deploy**:
    Once the configuration is saved, Render will automatically deploy your server and provide a live API endpoint URL.

---

## License

This project is licensed under the MIT License.
