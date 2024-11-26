# API Documentation

## Overview

This API allows users to manage workout plans, workouts, authentication, and public workout plans. Users can register, login, refresh tokens, and logout.

## Table of Contents

1. [Authentication Routes](#authentication-routes)
2. [Workout Routes](#workout-routes)
3. [Workout Plan Routes](#workout-plan-routes)
4. [Public Plan Routes](#public-plan-routes)

---

## Authentication Routes

These routes handle user authentication, including registration, login, token refresh, and logout.

### `POST /users/register`
- **Description**: Register a new user.
- **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- **Response**:
    ```json
    {
        "message": "User registered successfully"
    }
    ```

### `POST /users/login`
- **Description**: Log in a user and receive an access token.
- **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- **Response**:
    ```json
    {
        "message": "Login successful",
        "accessToken": "yourAccessTokenHere"
    }
    ```

### `GET /users/refresh`
- **Description**: Refresh the access token using the refresh token.
- **Response**:
    ```json
    {
        "message": "Access token refreshed",
        "accessToken": "newAccessTokenHere"
    }
    ```

### `POST /users/logout`
- **Description**: Log out the user and clear the refresh token.
- **Response**:
    ```json
    {
        "message": "Logout successful"
    }
    ```

---

## Workout Routes

These routes manage workouts, including adding, retrieving, updating, and deleting workouts associated with workout plans.

### `POST /workouts`
- **Description**: Add a new workout.
- **Request Body**:
    ```json
    {
        "name": "Push Up",
        "nickname": "Push Up",
        "reps": 20,
        "sets": 3,
        "weight": 0,
        "body_part": "Chest",
        "target": "Strength",
        "gif": "https://example.com/pushup.gif",
        "instructions": ["Keep your body straight", "Lower until your chest touches the ground"],
        "days": ["Monday", "Wednesday", "Friday"],
        "dates": ["2024-11-20", "2024-11-21"]
    }
    ```
- **Response**:
    ```json
    {
        "message": "Workout added successfully",
        "id": 1
    }
    ```

### `GET /workouts/:planId/workout`
- **Description**: Get all workouts associated with a specific workout plan.
- **Response**:
    ```json
    [
        {
            "id": 1,
            "name": "Push Up",
            "reps": 20,
            "sets": 3
        }
    ]
    ```

### `PUT /workouts/:id`
- **Description**: Update an existing workout.
- **Request Body**:
    ```json
    {
        "reps": 25,
        "sets": 3,
        "weight": 0
    }
    ```
- **Response**:
    ```json
    {
        "message": "Workout updated successfully",
        "id": 1
    }
    ```

### `DELETE /workouts/:id`
- **Description**: Delete a specific workout by ID.
- **Response**:
    ```json
    {
        "message": "Workout deleted successfully"
    }
    ```

---

## Workout Plan Routes

These routes manage workout plans, including creating, retrieving, updating, and deleting workout plans.

### `POST /plans`
- **Description**: Create a new workout plan.
- **Request Body**:
    ```json
    {
        "name": "Beginner Strength Training",
        "description": "A workout plan for beginners to build strength."
    }
    ```
- **Response**:
    ```json
    {
        "message": "Workout plan created successfully",
        "planId": 1
    }
    ```

### `GET /plans`
- **Description**: Retrieve all workout plans for the authenticated user.
- **Response**:
    ```json
    [
        {
            "id": 1,
            "name": "Beginner Strength Training",
            "description": "A workout plan for beginners."
        }
    ]
    ```

### `GET /plans/:planId/workout`
- **Description**: Retrieve all workouts associated with a specific plan.
- **Response**:
    ```json
    [
        {
            "id": 1,
            "name": "Push Up",
            "reps": 20,
            "sets": 3
        }
    ]
    ```

### `PUT /plans/:planId`
- **Description**: Update an existing workout plan.
- **Request Body**:
    ```json
    {
        "name": "Intermediate Strength Training",
        "description": "An advanced workout plan for intermediate users."
    }
    ```
- **Response**:
    ```json
    {
        "message": "Workout plan updated successfully",
        "id": 1
    }
    ```

### `DELETE /plans/:planId`
- **Description**: Delete a specific workout plan by ID.
- **Response**:
    ```json
    {
        "message": "Workout plan deleted successfully",
        "id": 1
    }
    ```

---

## Public Plan Routes

These routes manage public workout plans, allowing users to add, remove, rate, and copy public plans.

### `POST /public`
- **Description**: Add a workout plan to the public database.
- **Request Body**:
    ```json
    {
        "plan_id": 1
    }
    ```
- **Response**:
    ```json
    {
        "message": "Workout plan added to public database successfully",
        "id": 1
    }
    ```

### `POST /public/copy/:plan_id`
- **Description**: Copy a public workout plan to the current user's account.
- **Response**:
    ```json
    {
        "message": "Public workout plan copied successfully",
        "id": 2
    }
    ```

### `GET /public`
- **Description**: Retrieve all public workout plans.
- **Response**:
    ```json
    [
        {
            "id": 1,
            "name": "Beginner Strength Training",
            "description": "A workout plan for beginners."
        }
    ]
    ```

### `DELETE /public/:id`
- **Description**: Remove a public workout plan by ID.
- **Response**:
    ```json
    {
        "message": "Workout plan removed successfully",
        "id": 1
    }
    ```

### `POST /public/rate`
- **Description**: Rate a public workout plan.
- **Request Body**:
    ```json
    {
        "public_id": 1,
        "rating": 5
    }
    ```
- **Response**:
    ```json
    {
        "message": "Workout plan rated successfully",
        "id": 1
    }
    ```