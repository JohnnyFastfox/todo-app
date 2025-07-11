# Todo App Backend API

A RESTful Express.js API backend for the Angular Todo application.

## Features

- ✅ CRUD operations for todos
- 🔒 Security middleware (Helmet, CORS)
- 📊 Request logging
- 🛡️ Error handling
- 🧪 In-memory data store
- 🔄 Toggle todo completion

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Running the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Todos

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Fetch all todos |
| GET | `/api/todos/:id` | Fetch single todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| PATCH | `/api/todos/:id/toggle` | Toggle todo completion |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | API health status |

## Request/Response Examples

### Create Todo
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "Learn Express.js",
  "description": "Master Node.js backend development",
  "priority": 1,
  "completed": false
}
```

### Update Todo
```bash
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Learn Express.js",
  "description": "Master Node.js backend development",
  "priority": 2,
  "completed": true
}
```

### Response Format
```json
{
  "id": "uuid-string",
  "title": "Learn Express.js",
  "description": "Master Node.js backend development",
  "priority": 1,
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad request",
  "message": "Title is required"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Todo not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Error details"
}
```

## Configuration

### Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

### CORS Configuration

The API is configured to accept requests from:
- `http://localhost:4200` (Angular dev server)
- `http://localhost:3000` (Alternative frontend port)

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── todoController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Todo.js
│   │   └── TodoStore.js
│   ├── routes/
│   │   └── todoRoutes.js
│   └── server.js
├── package.json
└── README.md
```

## Testing

```bash
npm test
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input validation**: Request body validation
- **Error handling**: Comprehensive error responses

## Development

The backend uses an in-memory data store for simplicity. For production, consider integrating with:

- **MongoDB** with Mongoose
- **PostgreSQL** with Sequelize
- **Redis** for caching
- **JWT** for authentication 