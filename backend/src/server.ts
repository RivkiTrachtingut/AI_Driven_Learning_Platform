import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { CategoryService } from './services/categoryService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Learning Platform API is running' });
});

// Initialize default categories
async function initializeApp() {
  try {
    const categoryService = new CategoryService();
    await categoryService.initializeDefaultCategories();
    console.log('Default categories initialized');
  } catch (error) {
    console.error('Error initializing default categories:', error);
  }
}

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await initializeApp();
});

export default app;