import prisma from '../models/database';
import { CreateUserRequest } from '../types';

export class UserService {
  async createUser(userData: CreateUserRequest) {
    return await prisma.user.create({
      data: userData,
    });
  }

  async findUserByPhone(phone: string) {
    return await prisma.user.findUnique({
      where: { phone },
    });
  }

  async loginOrRegister(userData: CreateUserRequest) {
    // Try to find existing user by phone
    const existingUser = await this.findUserByPhone(userData.phone);
    
    if (existingUser) {
      // Check if name matches
      if (existingUser.name === userData.name) {
        // User exists with same name and phone - login
        return { user: existingUser, isNewUser: false };
      } else {
        // Phone exists but different name - error
        throw new Error('Phone number already registered with different name');
      }
    } else {
      // User doesn't exist - register new user
      const newUser = await this.createUser(userData);
      return { user: newUser, isNewUser: true };
    }
  }

  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        prompts: {
          include: {
            category: true,
            subCategory: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      include: {
        prompts: {
          include: {
            category: true,
            subCategory: true,
          },
        },
      },
    });
  }
}