# WeCare

WeCare is an online Life Coaching application designed to connect users with professional Life Coaches. The platform allows users to sign up, log in, and search for Life Coaches based on their specialty. Appointments can be booked, viewed, rescheduled, or canceled within a seven-day window. Life Coaches can also register, manage their profiles, and keep track of their upcoming schedules.

> **Note:** This project is intended for learning purposes and was developed as part of the React Course on Infosys Springboard.

## Features

- User registration and authentication
- Search for Life Coaches by specialty
- Book, view, reschedule, and cancel appointments
- View upcoming appointments
- Leave comments and ratings for coaches
- Life Coach registration, profile management, and appointment tracking

## Tech Stack

- **Frontend:** React (with Vite)
- **Backend:** Java (Spring Boot)
- **Other Tools:** Node.js, Visual Studio IDE

## Project Structure

```
WeCare/
├── WeCareFrontend/   # React frontend application
├── WeCareBackend/    # Spring Boot backend application
```

## Getting Started

### Prerequisites

- Node.js (for frontend)
- Java and Maven (for backend)
- Visual Studio Code or any suitable IDE

### Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/dhruv-9173/WeCare.git
cd WeCare
```

#### 2. Frontend Setup

```bash
cd WeCareFrontend
npm install
npm run dev
```

- The frontend will be available at: `http://localhost:5173`

#### 3. Backend Setup

```bash
cd ../WeCareBackend/WeCare
# Ensure your Java environment is set up
mvn spring-boot:run
```

- The backend will run on the default Spring Boot port.

### Configuration

- CORS is configured for `http://localhost:5173` in the backend.
- Update database and application settings as required in `application.properties`.

## Usage

- Register as a user or coach.
- Search for a coach and book appointments.
- Coaches can log in to view and manage appointments.
- Users can leave comments and ratings for coaches.

## License

This project is for educational use and does not currently include a specific license.

---

Made with 💡 by Dhruv Kumar
