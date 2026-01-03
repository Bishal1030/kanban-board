# Setup and Installation

This guide will walk you through setting up and running the application locally.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL/MySQL database

## Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory and add your configuration:
```env
DATABASE_URL=your_database_connection_string
PORT=5000
NODE_ENV=development
# Add other environment variables as needed
```

4. Run database migrations:
```bash
npx sequelize-cli db:migrate
```

5. Start the backend server:
```bash
npm start
```

The backend server should now be running on the specified port (default: 5000).

## Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend application should now be running (typically on http://localhost:5173 or http://localhost:3000).

## Troubleshooting

- Make sure your database is running and accessible
- Verify that all environment variables are correctly set
- Check that the ports are not already in use
- Ensure all dependencies are properly installed

## Additional Commands

### Backend
- `npm run dev` - Run server in development mode with hot reload
- `npx sequelize-cli db:migrate:undo` - Rollback last migration

### Frontend
- `npm run build` - Build for production
- `npm run preview` - Preview production build
