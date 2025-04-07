# Front-end Project - FCT Job Application

This is the front-end project for the job application at FCT.

Backend: https://github.com/rafiuskdev/fct-test-backend

## 🚀 Technologies

- **Frontend Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Container:** Docker & Docker Compose
- **Server:** Nginx (Production)
- **Package Manager:** npm
- **Code Quality:** ESLint & Prettier

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- Docker & Docker Compose 

## 🏃‍♂️ Running the Application

### Using Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Start the application using Docker Compose:
```bash
docker-compose up --build
```

3. Access the application at [http://localhost:3000](http://localhost:3000)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Access the application at [http://localhost:3000](http://localhost:3000)


## 📁 Project Structure

```
src/
├── api/            # API services and configurations
├── components/     # React components
│   ├── layout/    # Layout components
│   ├── ui/        # Reusable UI components
│   └── video/     # Video-related components
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── router/        # Routing configuration
├── styles/        # Global styles
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## 🌟 Features

- Responsive design that works on desktop and mobile
- Video search functionality
- Filter videos by locale and resolution
- Grid and list view options
- Video detail pages
- Loading states and error handling
- Docker support for easy deployment

