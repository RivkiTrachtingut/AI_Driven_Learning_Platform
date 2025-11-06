# AI-Driven Learning Platform

An innovative learning platform powered by artificial intelligence to provide personalized educational experiences with full bilingual support (Hebrew/English).

## Description
This project is a mini MVP that allows users to select learning topics, send prompts to AI for lesson generation, and view their learning history. Built with Node.js/TypeScript backend, React frontend, and SQLite database with comprehensive Hebrew and English language support.

## 🌟 Key Features
- **Bilingual Support**: Full Hebrew and English interface with RTL support
- **User Management**: Registration with name and phone number
- **Learning Categories**: Pre-populated categories (Science, Technology, Languages, History)
- **AI-Powered Lessons**: Generate comprehensive lessons using OpenAI GPT or Mock responses
- **Personal Dashboard**: View learning history and progress
- **Admin Panel**: Comprehensive admin dashboard for user and prompt management
- **Responsive Design**: Mobile-friendly interface
- **Language Toggle**: Easy switching between Hebrew and English

## 🛠 Technologies Used

### Backend
- **Node.js** with **TypeScript** - Runtime and type safety
- **Express.js** - Web framework
- **Prisma ORM** - Database ORM with type safety
- **SQLite** - Lightweight database (no setup required)
- **OpenAI API** - AI lesson generation
- **Joi** - Input validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** with **TypeScript** - UI framework with type safety
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Context** - State management for language switching

### Development Tools
- **Nodemon** - Auto-restart development server
- **Prisma Studio** - Database management interface
- **TypeScript** - Static type checking
- **ESLint** - Code linting

## 📋 Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **OpenAI API Key** (optional - works with mock responses)
- **Docker** (optional, for PostgreSQL setup)

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/RivkiTrachtingut/AI_Driven_Learning_Platform.git
cd AI_Driven_Learning_Platform
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your OpenAI API key (see Environment Variables section below)

# Generate Prisma client
npm run db:generate

# Initialize database with schema
npm run db:push

# Start backend development server
npm run dev
```

The backend will start on `http://localhost:3001`

### 3. Frontend Setup
```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

The frontend will start on `http://localhost:3000`

### 4. Database Setup (Optional)

#### Option A: SQLite (Default - No Setup Required)
The project uses SQLite by default, which requires no additional setup. The database file will be created automatically.

#### Option B: PostgreSQL with Docker
```bash
# From project root directory
docker-compose up -d

# Update backend/.env file:
# DATABASE_URL="postgresql://username:password@localhost:5432/ai_learning_platform"
```

## 🔧 Environment Variables

### Required Setup
Create a `.env` file in the `backend/` directory with the following variables:

```env
# Database Configuration (SQLite is used by default)
# DATABASE_URL="postgresql://username:password@localhost:5432/ai_learning_platform"

# OpenAI API Configuration
OPENAI_API_KEY="your_openai_api_key_here"

# Mock AI Configuration (set to true to use mock responses)
USE_MOCK_AI=false

# Server Configuration
PORT=3001
```

### OpenAI API Key Setup
1. **Get API Key**: Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Create Account**: Sign up or log in to your OpenAI account
3. **Generate Key**: Create a new API key
4. **Add to .env**: Replace `your_openai_api_key_here` with your actual API key
5. **Set Mock Mode**: If you don't have an API key, set `USE_MOCK_AI=true` to use mock responses

### Mock AI Mode
If you don't have an OpenAI API key or it's blocked by your network:
- Set `USE_MOCK_AI=true` in your `.env` file
- The system will generate realistic mock responses in Hebrew and English
- All functionality will work normally without external API calls

## 🏃‍♂️ Running the Application

### Development Mode
1. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```
   Backend runs on: `http://localhost:3001`

2. **Start Frontend** (in new terminal):
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on: `http://localhost:3000`

3. **Access Application**: Open `http://localhost:3000` in your browser

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd ../backend
npm run build

# Start production server
npm start
```

## 🌐 Language Support

### Switching Languages
- Click the language toggle button in the top navigation
- 🇮🇱 עברית / 🇺🇸 English
- The interface automatically switches direction (RTL/LTR)
- AI responses are generated in the selected language

### Supported Languages
- **Hebrew**: Full RTL support with Hebrew fonts
- **English**: Standard LTR interface
- Easy to extend for additional languages

## 📡 API Endpoints

### Users
- `POST /api/users` - Create new user
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID with prompts

### Categories
- `GET /api/categories` - Get all categories with sub-categories
- `GET /api/categories/:id` - Get specific category

### Prompts
- `POST /api/prompts` - Create new prompt and generate AI response
- `GET /api/prompts` - Get all prompts (admin)
- `GET /api/prompts/user/:userId` - Get user's prompt history

### Health Check
- `GET /health` - Server health status

## 💡 Usage Example

1. **Register**: Enter your name and phone number
2. **Select Language**: Choose Hebrew or English using the language toggle
3. **Choose Topic**: Select a category (Science, Technology, Languages, History)
4. **Pick Sub-topic**: Choose a specific sub-category
5. **Ask Question**: Enter your learning prompt (e.g., "Teach me about black holes")
6. **Get Lesson**: AI generates a comprehensive lesson in your selected language
7. **View History**: Access your personal learning dashboard
8. **Admin Access**: Visit `/admin` to see all users and prompts

## 📁 Project Structure

```
AI_Driven_Learning_Platform/
├── backend/                 # Node.js/TypeScript backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic & OpenAI integration
│   │   ├── routes/          # API route definitions
│   │   ├── models/          # Database connection
│   │   ├── types/           # TypeScript type definitions
│   │   └── server.ts        # Main server file
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── dev.db          # SQLite database file
│   ├── .env.example        # Environment variables template
│   ├── .gitignore          # Git ignore rules
│   ├── package.json        # Dependencies and scripts
│   └── tsconfig.json       # TypeScript configuration
├── frontend/               # React/TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   ├── contexts/       # React Context (language)
│   │   ├── locales/        # Translation files (he/en)
│   │   ├── types/          # TypeScript interfaces
│   │   └── App.tsx         # Main application component
│   ├── public/             # Static assets
│   ├── index.html          # HTML template
│   ├── package.json        # Dependencies and scripts
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── vite.config.ts      # Vite build configuration
│   └── tsconfig.json       # TypeScript configuration
├── docker-compose.yml      # PostgreSQL container setup
├── .gitignore             # Global git ignore rules
└── README.md              # This file
```

## 🔒 Security & Best Practices

### Input Validation
- All API endpoints include input validation using Joi
- Phone number uniqueness validation
- Required field validation
- Type safety with TypeScript

### Error Handling
- Comprehensive try-catch blocks
- Structured error responses
- Graceful fallback to mock AI responses
- User-friendly error messages

### Environment Management
- Secure API key storage in environment variables
- `.env` files excluded from version control
- Separate configuration for development/production

## 📝 Assumptions Made

1. **Authentication**: Simple user identification by ID (no JWT/sessions for MVP)
2. **Database**: SQLite for simplicity (easily switchable to PostgreSQL)
3. **AI Model**: GPT-3.5-turbo for cost efficiency
4. **Validation**: Basic input validation suitable for MVP
5. **Categories**: Pre-populated with common learning topics
6. **Phone Numbers**: Used as unique identifiers
7. **Language**: Default to Hebrew with English support
8. **Network**: Mock AI responses for environments where OpenAI is blocked

## 🚧 Known Limitations

- No user authentication system (uses simple ID-based identification)
- Limited input validation (basic MVP-level validation)
- No file upload capabilities
- No real-time features
- No advanced search functionality

## 🔮 Future Enhancements

- **Authentication**: JWT-based user authentication and sessions
- **Advanced Features**: Search, filtering, bookmarking, favorites
- **Analytics**: Learning progress tracking and analytics
- **Social Features**: Lesson sharing and community features
- **Content**: File upload for custom learning materials
- **Languages**: Additional language support beyond Hebrew/English
- **Mobile**: Native mobile applications
- **AI**: Advanced AI features and multiple model support

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```bash
   # Kill process on port 3001 (backend)
   npx kill-port 3001
   
   # Kill process on port 3000 (frontend)
   npx kill-port 3000
   ```

2. **Database Issues**:
   ```bash
   # Reset database
   cd backend
   rm prisma/dev.db
   npm run db:push
   ```

3. **OpenAI API Issues**:
   - Check your API key in `.env` file
   - Verify your OpenAI account has credits
   - Set `USE_MOCK_AI=true` to use mock responses

4. **Dependencies Issues**:
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Developer** - Initial work and implementation
- **OpenAI** - AI model integration

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- React and Node.js communities
- Tailwind CSS for the styling framework
- Prisma for the excellent ORM
- All open-source contributors

---

**Repository**: [https://github.com/RivkiTrachtingut/AI_Driven_Learning_Platform](https://github.com/RivkiTrachtingut/AI_Driven_Learning_Platform)

**Live Demo**: Visit the repository for setup instructions

**Support**: For questions or issues, please open a GitHub issue