import prisma from '../models/database';

export class CategoryService {
  async getAllCategories() {
    return await prisma.category.findMany({
      include: {
        subCategories: true,
      },
    });
  }

  async getCategoryById(id: number) {
    return await prisma.category.findUnique({
      where: { id },
      include: {
        subCategories: true,
      },
    });
  }

  async initializeDefaultCategories() {
    const categories = [
      {
        name: 'Science',
        subCategories: ['Physics', 'Chemistry', 'Biology', 'Space', 'Mathematics']
      },
      {
        name: 'Technology',
        subCategories: ['Programming', 'AI/ML', 'Web Development', 'Mobile Development', 'Data Science']
      },
      {
        name: 'Languages',
        subCategories: ['English', 'Hebrew', 'Spanish', 'French', 'German']
      },
      {
        name: 'History',
        subCategories: ['Ancient History', 'Modern History', 'World Wars', 'Israeli History', 'American History']
      }
    ];

    for (const category of categories) {
      const existingCategory = await prisma.category.findUnique({
        where: { name: category.name }
      });

      if (!existingCategory) {
        await prisma.category.create({
          data: {
            name: category.name,
            subCategories: {
              create: category.subCategories.map(subCat => ({ name: subCat }))
            }
          }
        });
      }
    }
  }
}