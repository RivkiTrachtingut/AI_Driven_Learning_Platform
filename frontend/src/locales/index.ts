import { en } from './en';
import { he } from './he';

export const translations = {
  en,
  he
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof en;