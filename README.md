# AI-Driven Learning Platform

An innovative learning platform powered by artificial intelligence to provide personalized educational experiences.

## Description
This project is a mini MVP that allows users to select learning topics, send prompts to AI for lesson generation, and view their learning history. Built with Node.js/TypeScript backend, React frontend, and PostgreSQL database.

## Technologies Used

### Backend
- **Node.js** with **TypeScript**
- **Express.js** - Web framework
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database
- **OpenAI API** - AI lesson generation

### Frontend
- **React** with **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

## Features
- User registration with name and phone
- Category and sub-category selection for learning topics
- AI-powered lesson generation using OpenAI GPT
- Personal learning history dashboard
- Admin dashboard to view all users and prompts
- Responsive web interface

## Database Schema
- **users**: id, name, phone
- **categories**: id, name
- **sub_categories**: id, name, category_id
- **prompts**: id, user_id, category_id, sub_category_id, prompt, response, created_at

## Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- Docker (optional, for database)
- OpenAI API key

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AI_Driven_Learning_Platform
```

### 2. Database Setup

#### Option A: Using Docker (Recommended)
```bash
docker-compose up -d
```

#### Option B: Local PostgreSQL
Install PostgreSQL and create a database named `ai_learning_platform`

### 3. Backend Setup
```bash
cd backend
npm install

# Copy environment file and update with your settings
cp .env.example .env
# Edit .env file with your database URL and OpenAI API key

# Generate Prisma client and push schema to database
npm run db:generate
npm run db:push

# Start development server
npm run dev
```

### 4. Frontend Setup
```bash
cd frontend
npm install

# Start development server
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ai_learning_platform"
OPENAI_API_KEY="your_openai_api_key_here"
PORT=3001
```

## Running the Application

1. Start the database (if using Docker): `docker-compose up -d`
2. Start the backend: `cd backend && npm run dev`
3. Start the frontend: `cd frontend && npm run dev`
4. Open your browser to `http://localhost:3000`

## API Endpoints

### Users
- `POST /api/users` - Create new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Categories
- `GET /api/categories` - Get all categories with sub-categories
- `GET /api/categories/:id` - Get category by ID

### Prompts
- `POST /api/prompts` - Create new prompt and generate AI response
- `GET /api/prompts` - Get all prompts (admin)
- `GET /api/prompts/user/:userId` - Get prompts by user ID

## Usage Example

1. **Register**: Enter your name and phone number
2. **Select Topic**: Choose a category (e.g., Science) and sub-category (e.g., Space)
3. **Ask Question**: Enter a prompt like "Teach me about black holes"
4. **Get Lesson**: AI generates a comprehensive lesson
5. **View History**: Access your learning history anytime

## Project Structure

```
AI_Driven_Learning_Platform/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── models/          # Database models
│   │   ├── types/           # TypeScript types
│   │   └── server.ts        # Main server file
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   └── package.json
├── docker-compose.yml       # Database container
└── README.md
```

## Assumptions Made

1. **Single Language**: Interface is in English with Hebrew support
2. **Simple Authentication**: No JWT/sessions - using user ID in URL
3. **Basic Validation**: Minimal input validation for MVP
4. **OpenAI Model**: Using GPT-3.5-turbo for cost efficiency
5. **Default Categories**: Pre-populated with common learning topics
6. **Phone Uniqueness**: Phone numbers are unique identifiers

## Future Enhancements

- JWT-based authentication
- User sessions and login system
- Advanced search and filtering
- Lesson bookmarking and favorites
- Progress tracking and analytics
- Multi-language support
- File upload for custom learning materials
- Social features (sharing lessons)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.